import { StyleSheet, Text, View, Image, useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  // Page Timer
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(onboarding)/page1");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Dark || Light mode
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/VoteLoge 1.png")} />
      <Text style={styles.mainText}>Virtual Voter </Text>
      <Text style={styles.subText}>Make ur choice</Text>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    mainText: {
      fontWeight: 700,
      fontSize: 40,
      color: theme.text,
    },
    subText: {
      fontSize: 20,
      color: theme.text,
    },
  });
