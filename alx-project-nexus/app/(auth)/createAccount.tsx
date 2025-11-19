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
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateAccountPage() {
  // Global state for mail
  const { setEmail: setGlobalEmail } = useAuth();

  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordReg.test(value)) {
      setPasswordError(
        "Password must include a number, lowercase, uppercase and be 8+ characters"
      );
    } else {
      setPasswordError("");
    }
  };

  const ConfirmValidatePassword = (value: string) => {
    if (password !== value) {
      setConfirmPasswordError("Password do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid =
    firstName &&
    lastName &&
    email &&
    password &&
    confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError;

  const handleCreateAccount = () => {
    if (!isFormValid) return;
    setGlobalEmail(email);
    console.log("hi");
    router.push("/(auth)/otp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image source={require("@/assets/images/Next Button.png")} />
      </TouchableOpacity>

      <View style={styles.containerTwo}>
        <View style={styles.containerThree}>
          <Text style={styles.mainText}> Create account </Text>
          <TextInput
            keyboardType={"email-address"}
            style={styles.input}
            placeholder={"First name"}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="last name"
            onChangeText={(text) => {
              setLastName(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
          />
          {emailError ? (
            <Text style={styles.errorMessage}>{emailError}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
          />
          {passwordError ? (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            onChangeText={(text) => {
              setConfirmPassword(text);
              ConfirmValidatePassword(text);
            }}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
          ) : null}
        </View>
        <View style={styles.buttonDiv}>
          <Button
            title="Enter"
            bg="#4B2AFA"
            color="white"
            onPress={handleCreateAccount}
          />
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
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
