import { View, StyleSheet } from "react-native";

export default function Indicator({ activeIndex }: { activeIndex: number }) {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dash,
            { backgroundColor: activeIndex === index ? "#007bff" : "#ccc" },
            activeIndex === index && styles.activeDash,
          ]}
        ></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 60,
  },
  dash: {
    width: 35,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  activeDash: {
    width: 16,
    borderRadius: 5,
  },
});
