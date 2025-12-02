import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/theme/theme";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FECA57",
  "#FF9FF3",
  "#54A0FF",
  "#A55EEA",
  "#FF6348",
  "#2ED573",
  "#FFA502",
  "#FF4757",
];

export default function PollResults() {
  // Dark and Light Mode
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  const { pollId: rawPollId, pollQuestion } = useLocalSearchParams();

  // Safely extract pollId (useLocalSearchParams can return string[])
  const pollId = Array.isArray(rawPollId) ? rawPollId[0] : rawPollId;

  const [options, setOptions] = useState<{ text: string; votes: number }[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pollId) {
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      // 1. Fetch votes
      const { data: votes, error: votesError } = await supabase
        .from("votes")
        .select("option_index")
        .eq("poll_id", pollId);

      if (votesError) {
        console.error("Error fetching votes:", votesError);
        setLoading(false);
        return;
      }

      // Count votes per option
      const counts: Record<number, number> = {};
      votes.forEach((v) => {
        counts[v.option_index] = (counts[v.option_index] || 0) + 1;
      });

      // 2. Fetch poll options
      const { data: poll, error: pollError } = await supabase
        .from("polls")
        .select("options")
        .eq("id", pollId)
        .single();

      if (pollError || !poll) {
        console.error("Poll not found:", pollError);
        setLoading(false);
        return;
      }

      // Combine
      const optionsWithVotes = poll.options.map((opt: any, i: number) => ({
        text: opt.text || `Option ${i + 1}`,
        votes: counts[i] || 0,
      }));

      setOptions(optionsWithVotes);
      setTotalVotes(votes.length);
      setLoading(false);
    };

    fetchResults();
  }, [pollId]);

  // Build chart data – guaranteed to have valid objects with .color
  const chartData = options
    .filter((opt): opt is { text: string; votes: number } => !!opt?.text)
    .map((opt, i) => ({
      name: opt.text.length > 20 ? opt.text.substring(0, 20) + "..." : opt.text,
      votes: opt.votes,
      color: COLORS[i % COLORS.length],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));

  if (!pollId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please Choose A Poll</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultTextDiv}>
        <Text style={styles.resultText}>Poll Results</Text>
      </View>
      <Text style={styles.pollQuestion}>{pollQuestion || "Poll Results"}</Text>
      <Text style={styles.pollVoteText}>Total Votes: {totalVotes}</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading results...</Text>
      ) : chartData.length === 0 ? (
        <Text style={styles.loadingText}>No votes yet</Text>
      ) : (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width - -30}
          height={300}
          chartConfig={{
            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="votes"
          backgroundColor="transparent"
          paddingLeft="20"
          absolute // shows vote count on slices
        />
      )}

      {/* Optional: List of options with vote counts */}
      {!loading && options.length > 0 && (
        <View style={styles.optionContainer}>
          {options.map((opt, i) => (
            <View key={i} style={styles.optionPercent}>
              <Text style={styles.optText}>{opt.text}</Text>
              <Text style={styles.optVotes}>
                {opt.votes} vote{opt.votes !== 2 ? "" : "s"}{" "}
                {totalVotes > 0 &&
                  `(${((opt.votes / totalVotes) * 100).toFixed(1)}%)`}
              </Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    resultTextDiv: {
      paddingBottom: 10,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
    },
    resultText: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    pollQuestion: {
      fontSize: 22,
      fontWeight: 600,
      marginBottom: 10,
      marginTop: 20,
      color: theme.text,
    },

    pollVoteText: {
      color: theme.text,
    },
    loadingText: {
      textAlign: "center",
      marginTop: 50,
      color: theme.text,
    },
    optionPercent: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
    },
    optionContainer: {
      marginTop: 10,
    },
    optText: {
      color: theme.text,
    },
    optVotes: {
      color: theme.text,
    },
  });
