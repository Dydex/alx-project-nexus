import { View, Text, Image, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { router } from "expo-router";
import { LightTheme, DarkTheme } from "@/theme/theme";
import Indicator from "@/components/common/Indicator";
import Button from "@/components/common/Button";

export default function OnboardingPageOne() {
  const swipeRight = Gesture.Pan().onEnd((event) => {
    if (event.translationX < 80) {
      router.push("/(onboarding)/page2");
    }
  });

  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={swipeRight}>
        <View style={styles.containerTwo}>
          <View style={styles.imageGroup}>
            <Image source={require("@/assets/images/Login 1.png")} />
          </View>

          <Indicator activeIndex={0} />

          <View style={styles.mainTextDiv}>
            <Text style={styles.mainText}>Share your opinions </Text>
            <Text style={styles.mainText}>through your votes, safely</Text>
          </View>

          <View style={styles.subTextDiv}>
            <Text style={styles.subText}> Your votes are 100% encrypted</Text>
          </View>

          <Button
            title="Next"
            bg="#4B2AFA"
            color="#FFF"
            onPress={() => router.push("/(onboarding)/page2")}
          />
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    containerTwo: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    mainTextDiv: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 20,
    },
    subTextDiv: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    imageGroup: {
      marginBottom: 60,
      alignItems: "center",
    },
    mainText: {
      color: theme.text,
      fontWeight: 600,
      fontSize: 25,
    },
    subText: {
      color: theme.text,
      fontSize: 18,
      marginBottom: 60,
    },
  });
