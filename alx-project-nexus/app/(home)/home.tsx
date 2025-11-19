import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileDiv}>
        <Image source={require("@/assets/images/Ellipse 67.png")} />
        <View>
          <Text>Dolapo</Text>
          <Text>voter</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  profileDiv: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
