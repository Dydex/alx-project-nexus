import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function OTP() {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    if (!canResend) return;

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError("Could not resend code");
      return;
    }

    // Restart countdown
    setTimer(60);
    setCanResend(false);

    // restart timer again
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const [error, setError] = useState("");

  const { email } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs[index + 1].current?.focus();
    }

    // if (newOtp.every((digit) => digit !== "")) {
    //   console.log("OTP Entered:", newOtp.join(""));
    // }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp.join(""),
      type: "email",
    });

    if (error) {
      setError("Invalid OTP");
      return;
    } else {
      console.log("success:", data);
    }

    router.push("/(home)");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image source={require("@/assets/images/Next Button.png")} />
      </TouchableOpacity>
      <View style={styles.containerTwo}>
        <Text style={styles.mainText}>Almost there</Text>
        <Text style={styles.subText}>
          Please enter the 6-digit code sent to your{" "}
          <Text style={styles.mailText}>{email} </Text> for verification
        </Text>
        <View style={styles.otpDiv}>
          {otp.map((value, index) => (
            <TextInput
              style={styles.otp}
              key={index}
              ref={inputs[index]}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={(t) => handleChange(t, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <View style={styles.errorDiv}>
          {error && <Text style={styles.errorText}> {error} </Text>}
        </View>

        <View style={styles.containerThree}>
          <Button
            title="Verify"
            bg="#4B2AFA"
            color="white"
            onPress={handleVerify}
          />
        </View>
        <View style={styles.containerFour}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resend}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.request}>Request a new code in {timer}s</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerTwo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  containerThree: {
    padding: 20,
  },
  containerFour: {
    alignItems: "center",
  },
  mainText: {
    fontSize: 30,
    fontWeight: 600,
  },
  subText: {
    marginTop: 20,
    marginBottom: 20,
  },
  otp: {
    width: 50,
    height: 55,
    backgroundColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
  },
  otpDiv: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  resend: {
    color: "#4B2AFA",
  },
  request: {
    color: "black",
  },
  mailText: {
    color: "#4B2AFA",
  },
  errorDiv: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
