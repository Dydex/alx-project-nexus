import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pill from "@/components/common/Pill";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Home() {
  const polls = useSelector((state: RootState) => state.poll.polls);

  // Dark and Light Mode
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  const [activeFilter, setActiveFilter] = useState("All");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filters = [
    { title: "All", icon: null },
    {
      title: "Election",
      icon: <MaterialIcons name="account-balance" size={20} color="black" />,
    },
    {
      title: "Entertainment",
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
      <View style={styles.profileDiv}>
        <Image source={require("@/assets/images/Ellipse 67.png")} />
        <View>
          <Text style={styles.profileText}>Dolapo</Text>
          <Text style={styles.profileText}>voter</Text>
        </View>
      </View>

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerTwo}>
          {filteredPolls.map((poll, index) => (
            <View style={styles.pollContainer} key={index}>
              <Text style={styles.pollQuestion}> {poll.question} </Text>
              {poll.options.map((opt, i) => (
                <TouchableOpacity onPress={() => setSelectedIndex(i)}>
                  <Text
                    style={[
                      styles.pollOptions,
                      {
                        backgroundColor: selectedIndex === i ? "blue" : "white",
                      },
                    ]}
                    key={i}
                  >
                    {" "}
                    {opt}{" "}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.voteButton}>
                <Text>Vote</Text>
              </TouchableOpacity>
              {/* 
            <Text> Timeframe: {poll.timeFrame} </Text> */}
            </View>
          ))}
        </View>
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
      fontWeight: 600,
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
  });
