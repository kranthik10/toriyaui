import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography, mergeStyles } from "./theme";

const sizeVariants = {
  sm: { size: 32, fontSize: 12 },
  md: { size: 44, fontSize: 16 },
  lg: { size: 64, fontSize: 22 }
};

export function Avatar({
  uri,
  name,
  size = "md",
  style,
  imageStyle,
  textStyle
}) {
  const { size: dimension, fontSize } = sizeVariants[size];
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <View
      style={mergeStyles(
        styles.base,
        { width: dimension, height: dimension, borderRadius: dimension / 2 },
        style
      )}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={mergeStyles(
            styles.image,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
            imageStyle
          )}
        />
      ) : (
        <Text style={mergeStyles(typography.label, { fontSize }, textStyle)}>
          {initials || "?"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: colors.border
  },
  image: {
    resizeMode: "cover"
  }
});
