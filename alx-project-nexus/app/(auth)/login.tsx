import {
  View,
  Text,
  Image,
  TextInput,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LightTheme, DarkTheme } from "@/theme/theme";
import Button from "@/components/common/Button";
import { useState } from "react";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [error, setError] = useState("");

  // Validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const isFormValid = email && password && !emailError && !passwordError;

  const handleLogin = async () => {
    if (!isFormValid) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }
    router.push("/(home)");
  };

  // Dark || Light mode
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTwo}>
        <View style={styles.imageGroup}>
          <Image source={require("@/assets/images/VoteLoge 1.png")} />
        </View>
        <View style={styles.mainTextDiv}>
          <Text style={styles.mainText}>Welcome to Virtual Voter</Text>
        </View>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        <Text style={styles.errorText}>{error}</Text>

        <View style={styles.passwordTextDiv}>
          <Text style={styles.passwordText}>Forgot a password?</Text>
        </View>
        <View style={styles.buttonDiv}>
          <Button
            title="Enter"
            bg="#4B2AFA"
            color="#FFF"
            onPress={handleLogin}
          />
        </View>

        <Button
          title="Create account"
          bg="#FFF"
          color="black"
          borderColor="#4B2AFA"
          onPress={() => router.push("/(auth)/createAccount")}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    containerTwo: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    mainTextDiv: {
      marginTop: 40,
      marginBottom: 40,
      alignItems: "center",
    },
    mainText: {
      fontSize: 30,
      fontWeight: 600,
    },
    passwordInput: {
      height: 55,
      paddingHorizontal: 10,
      marginTop: 30,
      marginBottom: 10,
      color: "#838282ff",
      backgroundColor: "#e9e6e6ff",
    },
    input: {
      height: 55,
      paddingHorizontal: 10,
      color: "#838282ff",
      backgroundColor: "#e9e6e6ff",
    },
    passwordText: {
      color: "#4B2AFA",
    },
    passwordTextDiv: {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      marginBottom: 40,
    },
    imageGroup: {
      alignItems: "center",
    },
    buttonDiv: {
      marginBottom: 30,
    },
    error: {
      color: "red",
      fontSize: 12,
      marginTop: 4,
    },
    errorText: {
      color: "red",
    },
  });
