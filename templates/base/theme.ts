import { StyleSheet } from "react-native";

export const colors = {
  background: "#FFFFFF",
  foreground: "#101828",
  primary: "#0E5AE5",
  primaryForeground: "#FFFFFF",
  muted: "#F2F4F7",
  border: "#D0D5DD",
  destructive: "#D92D20",
  destructiveForeground: "#FFFFFF"
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999
};

export const typography = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.foreground
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.foreground
  },
  heading: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: colors.foreground
  }
});

export function mergeStyles(...styles) {
  return styles.flat();
}
