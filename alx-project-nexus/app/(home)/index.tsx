import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pill from "@/components/common/Pill";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const filters = [
    { title: "All", icon: null },
    {
      title: "Election",
      icon: <MaterialIcons name="account-balance" size={20} color="black" />,
    },
    {
      title: "Entertainment",
      icon: <MaterialIcons name="live-tv" size={20} color="black" />,
    },
    {
      title: "Sports",
      icon: <MaterialIcons name="sports-football" size={20} color="black" />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileDiv}>
        <Image source={require("@/assets/images/Ellipse 67.png")} />
        <View>
          <Text>Dolapo</Text>
          <Text>voter</Text>
        </View>
      </View>

      <View style={styles.pillDiv}>
        {filters.map((filter, i) => (
          <Pill
            key={i}
            title={filter.title}
            icon={filter.icon}
            bg="#FFF"
            color="black"
            borderColor="#ccc"
            borderRadius={20}
            // onPress={}
          />
        ))}
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
  pillDiv: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
});
