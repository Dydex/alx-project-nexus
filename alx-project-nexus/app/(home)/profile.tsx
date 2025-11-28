import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { StyleSheet } from "react-native";

export default function ProfilePage() {
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backDiv}>
          <Image source={require("@/assets/images/Next Button.png")} />
        </View>

        <View style={styles.profileDiv}>
          <Image source={require("@/assets/images/Ellipse 67.png")} />
          <Text>Name</Text>
        </View>
      </View>
      <View>
        <View style={styles.Div}>
          <Text>Help & Support</Text>
        </View>
        <View style={styles.Div}>
          <Text>About Us</Text>
        </View>
        <View style={styles.Div}>
          <Text>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingLeft: 20,
      paddingTop: 40,
      paddingBottom: 40,
      paddingRight: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "red",
    },
    backDiv: {
      flex: 1,
    },
    profileDiv: {
      flex: 1,
      flexDirection: "column",
      gap: 20,
    },
    Div: {
      padding: 20,
      borderWidth: 1,
      borderColor: "#ccc",
    },
  });
