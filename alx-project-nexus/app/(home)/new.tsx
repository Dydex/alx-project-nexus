import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LightTheme, DarkTheme } from "@/theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import Pill from "@/components/common/Pill";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NewPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Dropdown menu
  const [timeFrame, setTimeFrame] = useState("");

  // Dark and Light Mode
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  // Pill categories
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createPollDiv}>
        <Text style={styles.createPollText}> Create a Poll</Text>
      </View>
      <View>
        <Text style={styles.categoryText}> Category</Text>
      </View>
      <View style={styles.pillDiv}>
        {filters.map((filter, i) => (
          <Pill
            key={i}
            icon={filter.icon}
            title={filter.title}
            color="black"
            selected={activeFilter === filter.title}
            onPress={() => setActiveFilter(filter.title)}
            borderColor="#ccc"
            borderRadius={10}
          />
        ))}
      </View>
      <Text style={styles.questionText}>Question</Text>
      <TextInput
        style={styles.questionInput}
        multiline={true}
        placeholder="Who is the best actor of all time?"
      />
      <View>
        <Text style={styles.addOptionText}>Add Options</Text>
        <TextInput style={styles.optionInput} placeholder="Option 1" />
        <TextInput style={styles.optionInput} placeholder="Option 2" />

        <View style={styles.addAnotherOptionDiv}>
          <TouchableOpacity>
            <Text style={styles.addAnotherOptionText}>
              + Add Another option
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pollDiv}>
        <View style={styles.pollTextDiv}>
          <Ionicons name="timer-outline" size={24} />
          <Text>Poll ends in</Text>
        </View>

        <View style={styles.pickerDiv}>
          <Picker
            selectedValue={timeFrame}
            onValueChange={(itemValue) => setTimeFrame(itemValue)}
          >
            <Picker.Item label="Never Ends" value="never" />
            <Picker.Item label="30 mins" value="30m" />
            <Picker.Item label="1 hour" value="1h" />
            <Picker.Item label="6 hours" value="6h" />
            <Picker.Item label="12 hours" value="12h" />
            <Picker.Item label="24 hours" value="24h" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Post Poll</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: theme.background,
    },
    pillDiv: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
    questionInput: {
      height: 100,
      borderWidth: 1,
      backgroundColor: "#ccc",
      borderColor: "#ccc",
      borderRadius: 10,
      alignItems: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginTop: 15,
      marginBottom: 20,
      textAlignVertical: "top",
    },
    createPollText: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 600,
    },
    createPollDiv: {
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    categoryText: {
      color: theme.text,
      fontWeight: 600,

      marginTop: 20,
    },
    questionText: {
      color: theme.text,
      marginTop: 20,
      fontWeight: 600,
    },
    addOptionText: {
      color: theme.text,
      fontWeight: 600,
      marginBottom: 15,
    },
    optionInput: {
      height: 50,
      marginBottom: 10,
      backgroundColor: "#ccc",
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    addAnotherOptionText: {
      color: theme.text,
    },
    addAnotherOptionDiv: {
      alignItems: "flex-end",
      marginTop: 20,
      marginBottom: 170,
    },
    pickerDiv: {
      justifyContent: "center",
    },
    pollDiv: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
    },
    pollTextDiv: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    button: {
      borderRadius: 8,
      alignItems: "center",
      padding: 12,
      flex: 1,
      backgroundColor: "#FFF",
      borderWidth: 2,
      borderColor: "#4B2AFA",
    },
    buttons: {
      flexDirection: "row",
      gap: 8,
      marginTop: 40,
    },
  });
