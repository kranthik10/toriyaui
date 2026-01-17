import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography, mergeStyles } from "./theme";

const badgeVariants = {
  default: {
    backgroundColor: colors.muted,
    borderColor: colors.border
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  destructive: {
    backgroundColor: colors.destructive,
    borderColor: colors.destructive
  }
};

const textVariants = {
  default: { color: colors.foreground },
  primary: { color: colors.primaryForeground },
  destructive: { color: colors.destructiveForeground }
};

export function Badge({ label, variant = "default", style, textStyle }) {
  return (
    <View style={mergeStyles(styles.base, badgeVariants[variant], style)}>
      <Text style={mergeStyles(typography.label, textVariants[variant], textStyle)}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start"
  }
});
