import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing, mergeStyles } from "./theme";

export function Card({ children, style }) {
  return <View style={mergeStyles(styles.base, style)}>{children}</View>;
}

export function CardContent({ children, style }) {
  return <View style={mergeStyles(styles.content, style)}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg
  }
});
