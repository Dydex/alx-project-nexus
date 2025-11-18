import { ButtonProps } from "@/interfaces";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
  bg,
  color,
  borderColor,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bg },
        borderColor && { borderColor: borderColor, borderWidth: 1 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    padding: 18,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
  },
});
