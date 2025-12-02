import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfilePage() {
  const [lastName, setLastName] = useState<string | undefined>(undefined);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;
  const styles = createStyles(theme);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLastName(user?.user_metadata?.lastName || "User");
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(onboarding)/page3");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color="#888" />
        </View>

        <Text style={styles.userName}>{lastName || "User"}</Text>
        <Text style={styles.userRole}>Voter</Text>
      </View>

      {/* Menu Items */}
      <View>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>About Us</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem]} onPress={handleLogout}>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          <Ionicons name="log-out-outline" size={24} color="#f34b43ff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 20,
      paddingTop: 10,
    },
    profileSection: {
      alignItems: "center",
      paddingVertical: 30,
      borderBottomWidth: 1,
      borderBottomColor: theme.border || "#eee",
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.card || "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      borderWidth: 3,
      borderColor: "#ddd",
    },
    userName: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.text,
    },
    userRole: {
      fontSize: 16,
      color: theme.text,
      marginTop: 4,
    },

    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: theme.border || "#eee",
    },
    menuText: {
      fontSize: 18,
      color: theme.text,
    },

    logoutText: {
      color: "#FF3B30",
      fontWeight: "600",
    },
  });
