import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pill from "@/components/common/Pill";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Poll } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import PollCard from "@/components/common/PollCard";

export default function Home() {
  const { refresh } = useLocalSearchParams();

  const [lastName, setLastName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLastName(user?.user_metadata?.lastName);
    };
    fetchUser();
  }, []);

  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPolls = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("polls")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching polls:", error);
    } else {
      setPolls(data);
      setRefreshing(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPolls();
  }, [refresh]);

  // Dark/light mode
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
      title: "Media",
      icon: <MaterialIcons name="live-tv" size={20} color="black" />,
    },
    {
      title: "Sports",
      icon: <MaterialIcons name="sports-football" size={20} color="black" />,
    },
  ];

  const filteredPolls =
    activeFilter === "All"
      ? polls
      : polls.filter((poll) => poll.category === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top profile section – avatar + name */}
      <View style={styles.profileDiv}>
        {/* Default Empty Profile Avatar */}
        <View style={styles.avatar}>
          <Ionicons name="person" size={30} color="#888" />
        </View>
        <View>
          <Text style={styles.profileText}>{lastName} </Text>
          <Text style={styles.profileText}>voter</Text>
        </View>
      </View>

      {/* Filter pills (All / Election / Entertainment / Sports) */}
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

      {/* Scrollable list of polls */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredPolls.map((poll, index) => (
          <PollCard key={poll.id} {...poll} />
        ))}
      </ScrollView>
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

    containerTwo: {
      marginTop: 20,
      flex: 1,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 60,
      backgroundColor: theme.card || "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      borderWidth: 3,
      borderColor: "#ddd",
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
      paddingBottom: 10,
    },

    pollContainer: {
      backgroundColor: "#eae1e1ff",
      marginBottom: 10,
      padding: 10,
      borderRadius: 10,
    },
    pollQuestion: {
      color: "black",
      fontSize: 20,
      fontWeight: "600",
    },
    pollOptions: {
      color: "black",
      padding: 14,
      borderWidth: 1,
      borderColor: "#c4bebeff",
      marginTop: 10,
      borderRadius: 8,
    },
    voteButton: {
      marginTop: 10,
    },
    timerDiv: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
