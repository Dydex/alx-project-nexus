import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function CreateAccountPage() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image source={require("@/assets/images/Next Button.png")} />
      </TouchableOpacity>

      <View style={styles.containerTwo}>
        <View style={styles.containerThree}>
          <Text style={styles.mainText}> Create account </Text>
          <TextInput style={styles.input} placeholder="First name" />
          <TextInput style={styles.input} placeholder="last name" />
          <TextInput style={styles.input} placeholder="Email address" />
          <TextInput style={styles.input} placeholder="Phone Number" />
          <TextInput style={styles.input} placeholder="Password" />
          <TextInput style={styles.input} placeholder="Repeat Password" />
        </View>
        <View style={styles.buttonDiv}>
          <Button title="Enter" bg="#4B2AFA" color="white" />
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
  containerTwo: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },

  containerThree: {
    padding: 10,
  },
  input: {
    height: 55,
    paddingHorizontal: 10,
    color: "#838282ff",
    backgroundColor: "#e9e6e6ff",
    marginBottom: 20,
  },
  mainText: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 30,
  },
  buttonDiv: {
    marginTop: 70,
  },
  imageGroup: {},
});
