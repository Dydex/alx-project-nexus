import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pill from "@/components/common/Pill";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { LightTheme, DarkTheme } from "@/theme/theme";

export default function Home() {
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  const [activeFilter, setActiveFilter] = useState("All");

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
          <Text style={styles.profileText}>Dolapo</Text>
          <Text style={styles.profileText}>voter</Text>
        </View>
      </View>

      <View style={styles.pillDiv}>
        {filters.map((filter, i) => (
          <Pill
            key={i}
            title={filter.title}
            icon={filter.icon}
            color="black"
            borderColor="#ccc"
            borderRadius={20}
            selected={activeFilter === filter.title}
            onPress={() => setActiveFilter(filter.title)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
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
    profileText: {
      color: theme.text,
    },
    pillDiv: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
  });
