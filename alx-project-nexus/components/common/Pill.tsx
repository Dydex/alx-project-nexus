import { PillProps } from "@/interfaces";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Pill({
  title,
  onPress,
  borderColor,
  borderRadius,
  color,
  icon,
  selected,
}: PillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        { backgroundColor: selected ? "#4B2AFA" : "#FFF" },
        borderColor && { borderColor: borderColor, borderWidth: 1 },
        { borderRadius: borderRadius },
      ]}
      onPress={onPress}
    >
      <View style={styles.iconDiv}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: "center",
    padding: 12,
  },
  text: {
    fontSize: 14,
  },
  icon: { marginRight: 4 },
  iconDiv: {
    flexDirection: "row",
    alignItems: "center",
  },
});
