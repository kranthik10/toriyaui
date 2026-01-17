import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, radius, spacing, typography, mergeStyles } from "./theme";

export function Input({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  ...props
}) {
  return (
    <View style={mergeStyles(styles.container, style)}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.border}
        style={mergeStyles(typography.body, styles.input, inputStyle)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background
  },
  input: {
    padding: 0
  }
});
