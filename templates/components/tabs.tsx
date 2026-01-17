import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography, mergeStyles } from "./theme";

export function Tabs({ value, onValueChange, children, style }) {
  return (
    <View style={mergeStyles(styles.root, style)}>{
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          isActive: child.props.value === value,
          onPress: () => onValueChange?.(child.props.value)
        });
      })
    }</View>
  );
}

export function TabsTrigger({
  value,
  label,
  isActive,
  onPress,
  style,
  textStyle
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      style={({ pressed }) =>
        mergeStyles(
          styles.trigger,
          isActive && styles.triggerActive,
          pressed && styles.pressed,
          style
        )
      }
    >
      <Text
        style={mergeStyles(
          typography.label,
          isActive ? styles.textActive : styles.text,
          textStyle
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: spacing.xs,
    backgroundColor: colors.muted,
    borderRadius: radius.pill
  },
  trigger: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderRadius: radius.pill
  },
  triggerActive: {
    backgroundColor: colors.background
  },
  text: {
    color: colors.foreground
  },
  textActive: {
    color: colors.primary
  },
  pressed: {
    opacity: 0.85
  }
});
