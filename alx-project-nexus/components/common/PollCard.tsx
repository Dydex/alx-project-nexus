import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Poll } from "@/interfaces";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Share } from "react-native";
import * as Linking from "expo-linking";

export default function PollCard({ id, question, options, createdAt }: Poll) {
  const [isVoted, setIsVoted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState(options);
  const [totalVotes, setTotalVotes] = useState(0);

  // Deep link URL (change "myapp" to your actual scheme in app.json)
  const pollDeepLink = Linking.createURL(`/poll/${id}`);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkVote = async () => {
      const { data } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", id)
        .eq("user_id", userId)
        .maybeSingle();

      if (data) {
        setIsVoted(true);
        setSelectedIndex(data.option_index);
      }
    };

    checkVote();
  }, [userId]);

  const handleVote = async () => {
    if (selectedIndex === null || !userId) return;

    setIsVoted(true);
    setTotalVotes((prev) => prev + 1);

    setPollOptions((prev) =>
      prev.map((opt, idx) =>
        idx === selectedIndex ? { ...opt, votes: (opt.votes || 0) + 1 } : opt
      )
    );

    const { error } = await supabase.from("votes").insert({
      poll_id: id,
      user_id: userId,
      option_index: selectedIndex,
    });

    if (error) {
      console.log("Vote error:", error);

      setIsVoted(false);
      setTotalVotes((prev) => prev - 1);
    }
  };

  // Total votes count
  useEffect(() => {
    const fetchTotalVotes = async () => {
      const { count } = await supabase
        .from("votes")
        .select("*", { count: "exact", head: true })
        .eq("poll_id", id);
      setTotalVotes(count ?? 0);
    };
    fetchTotalVotes();
  }, [id]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this poll: ${question} \n\n${pollDeepLink}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <View style={styles.containerTwo}>
      <View style={styles.pollContainer}>
        <Text style={styles.pollQuestion}>{question}</Text>

        {options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            disabled={isVoted}
            onPress={() => setSelectedIndex(i)}
            style={[
              styles.pollOption,
              {
                backgroundColor: selectedIndex === i ? "#3B82F6" : "white",
              },
            ]}
          >
            <Text style={styles.pollOptionText}>{opt.text}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.voteShareButton}>
          <View style={styles.voteCount}>
            <Text style={{ fontWeight: "600" }}>
              {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
            </Text>
          </View>
          <View>
            {/* Share Button */}
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={22} color="#007AFF" />
              <Text style={{ color: "#007AFF", marginLeft: 6 }}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.actionButtons}>
            {/* Vote Button */}
            <TouchableOpacity
              disabled={isVoted}
              onPress={handleVote}
              style={[styles.voteButton, isVoted && styles.voteButtonDisabled]}
            >
              <Text style={{ color: isVoted ? "#666" : "white" }}>
                {isVoted ? "Voted" : "Vote"}
              </Text>
            </TouchableOpacity>

            {/* Results Button */}
            <TouchableOpacity
              style={styles.resultButton}
              onPress={() =>
                router.push({
                  pathname: "/results",
                  params: { pollId: id, pollQuestion: question },
                })
              }
            >
              <Text style={{ color: "white" }}>Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTwo: {
    marginVertical: 10,
    paddingHorizontal: 4,
  },

  pollContainer: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  pollQuestion: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    lineHeight: 26,
  },

  pollOption: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginVertical: 5,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  pollOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  voteCount: {},

  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  voteButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  voteButtonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
  },

  resultButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  voteShareButton: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
