#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

// TODO: UPDATE THIS URL TO YOUR REPO
const BASE_URL = "https://raw.githubusercontent.com/kranthik10/toriyaui/main";

function log(message) {
  console.log(message);
}

function error(message) {
  console.error("Error:", message);
  process.exit(1);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed. Status Code: ${res.statusCode} (${url})`));
        return;
      }

      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", (e) => {
      reject(e);
    });
  });
}

async function loadRegistry() {
  try {
    const url = `${BASE_URL}/registry.json`;
    log(`Fetching registry from ${url}...`);
    const data = await fetchUrl(url);
    return JSON.parse(data);
  } catch (e) {
    error(`Failed to fetch registry.json: ${e.message}`);
  }
}

function getComponentFromRegistry(registry, name) {
  const component = registry.find((c) => c.name === name);
  if (!component) {
    error(`Component '${name}' not found in registry.`);
  }
  return component;
}

function installDependencies(dependencies) {
  if (!dependencies || dependencies.length === 0) return;

  log(`Installing dependencies: ${dependencies.join(", ")}...`);
  try {
    const userAgent = process.env.npm_config_user_agent;
    let command = "npm install";
    if (userAgent) {
      if (userAgent.startsWith("yarn")) {
        command = "yarn add";
      } else if (userAgent.startsWith("pnpm")) {
        command = "pnpm add";
      } else if (userAgent.startsWith("bun")) {
        command = "bun add";
      }
    }

    execSync(`${command} ${dependencies.join(" ")}`, { stdio: "inherit" });
  } catch (e) {
    error(`Failed to install dependencies: ${e.message}`);
  }
}

async function init(cwd) {
  log("Initializing configuration...");

  // 1. Create lib/utils.ts
  const libDir = path.join(cwd, "lib");
  ensureDir(libDir);

  const utilsPath = path.join(libDir, "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    const utilsContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    // Check if we want to write utils. For now, let's skip unless specific requirement.
    // Keeping it simple.
  }

  // 2. Create components/ui dir and theme
  const uiDir = path.join(cwd, "components", "ui");
  ensureDir(uiDir);

  const themeTarget = path.join(uiDir, "theme.ts");
  if (!fs.existsSync(themeTarget)) {
    try {
      const themeContent = await fetchUrl(`${BASE_URL}/templates/base/theme.ts`);
      fs.writeFileSync(themeTarget, themeContent);
      log("Created components/ui/theme.ts");
    } catch (e) {
      error(`Failed to fetch default theme: ${e.message}`);
    }
  }

  const indexTarget = path.join(uiDir, "index.ts");
  if (!fs.existsSync(indexTarget)) {
    fs.writeFileSync(indexTarget, "export * from \"./theme\";\n");
    log("Created components/ui/index.ts");
  }

  log("Initialization complete.");
}

async function add(cwd, componentName) {
  const registry = await loadRegistry();
  const component = getComponentFromRegistry(registry, componentName);

  // 1. Install dependencies
  installDependencies(component.dependencies);

  // 2. Install details (sub-components)
  if (component.registryDependencies) {
    for (const dep of component.registryDependencies) {
      log(`Installing dependency component: ${dep}`);
      await add(cwd, dep);
    }
  }

  // 3. Create component files
  const uiDir = path.join(cwd, "components", "ui");
  ensureDir(uiDir);

  for (const file of component.files) {
    try {
      const content = await fetchUrl(`${BASE_URL}/${file.path}`);
      const targetPath = path.join(cwd, file.target);
      ensureDir(path.dirname(targetPath));

      if (!fs.existsSync(targetPath)) {
        fs.writeFileSync(targetPath, content);
        log(`Created ${file.target}`);
      } else {
        log(`Skipped ${file.target} (already exists)`);
      }
    } catch (e) {
      error(`Failed to write file ${file.target}: ${e.message}`);
    }
  }

  // 4. Update index.ts export
  const indexTarget = path.join(uiDir, "index.ts");
  if (fs.existsSync(indexTarget)) {
    const exportLine = `export * from "./${componentName}";`;
    const indexContent = fs.readFileSync(indexTarget, "utf8");
    if (!indexContent.includes(exportLine)) {
      fs.appendFileSync(indexTarget, exportLine + "\n");
      log(`Updated index.ts`);
    }
  }
}

async function list() {
  const registry = await loadRegistry();
  log("Available components:");
  registry.forEach(c => log(`- ${c.name}`));
}

// --- Main ---

async function main() {
  const [command, arg] = process.argv.slice(2);
  const cwd = process.cwd();

  try {
    switch (command) {
      case "init":
        await init(cwd);
        break;
      case "add":
        if (!arg) {
          error("Please specify a component name");
        }
        const components = process.argv.slice(3);
        if (components.length === 0 && arg) {
          await add(cwd, arg);
        } else {
          // Serial execution to avoid race conditions on dependencies
          await add(cwd, arg);
          for (const c of components) {
            await add(cwd, c);
          }
        }
        break;
      case "list":
        await list();
        break;
      default:
        log("Usage:");
        log("  npx toriya init");
        log("  npx toriya add <component>");
        log("  npx toriya list");
        break;
    }
  } catch (e) {
    error(e.message);
  }
}

main();
