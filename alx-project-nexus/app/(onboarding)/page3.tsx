import { View, Text, Image, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { router } from "expo-router";
import { LightTheme, DarkTheme } from "@/theme/theme";
import Indicator from "@/components/common/Indicator";
import Button from "@/components/common/Button";

export default function OnboardingPageThree() {
  const onGestureEvent = Gesture.Pan()
    .runOnJS(true)
    .onEnd((event) => {
      if (event.translationX < -80) {
        router.push("/(auth)/login");
      }

      if (event.translationX > 80) {
        router.back();
      }
    });

  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={onGestureEvent}>
        <View style={styles.containerTwo}>
          <View style={styles.imageGroup}>
            <Image source={require("@/assets/images/Vote 1.png")} />
          </View>

          <Indicator activeIndex={2} />

          <View style={styles.mainTextDiv}>
            <Text style={styles.mainText}>Make your choice</Text>
          </View>

          <View style={styles.subTextDiv}>
            <Text style={styles.subText}>
              {" "}
              Vote for your favorite candidate,
            </Text>
            <Text style={styles.subText}>
              {" "}
              and view the results in real time
            </Text>
          </View>

          <Button
            title="Get Started"
            bg="#4B2AFA"
            color="#FFF"
            onPress={() => router.push("/(auth)/login")}
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
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 60,
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
    },
  });
