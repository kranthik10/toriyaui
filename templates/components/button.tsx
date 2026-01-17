import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography, mergeStyles } from "./theme";

const buttonVariants = {
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.muted,
    borderColor: colors.border
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  destructive: {
    backgroundColor: colors.destructive,
    borderColor: colors.destructive
  }
};

const textVariants = {
  primary: { color: colors.primaryForeground },
  secondary: { color: colors.foreground },
  ghost: { color: colors.primary },
  destructive: { color: colors.destructiveForeground }
};

const sizeVariants = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg }
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  style,
  textStyle
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) =>
        mergeStyles(
          styles.base,
          buttonVariants[variant],
          sizeVariants[size],
          disabled && styles.disabled,
          pressed && styles.pressed,
          style
        )
      }
    >
      <Text
        style={mergeStyles(typography.label, textVariants[variant], textStyle)}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    opacity: 0.85
  },
  disabled: {
    opacity: 0.5
  }
});
