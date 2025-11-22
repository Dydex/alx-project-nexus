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
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addPoll } from "@/store/pollSlice";

export default function NewPage() {
  const dispatch = useDispatch();

  const [question, setQuestion] = useState("");

  const [categories, setCategories] = useState("");

  // TImeframe menu
  const [timeFrame, setTimeFrame] = useState("");

  // Adding Extra TextInput
  const [options, setOptions] = useState<string[]>(["", ""]);

  const isQuestionValid = question.trim().length > 0;
  const isCategoryValid = categories.trim().length > 0;
  const isTimeFrameValid = timeFrame.trim().length > 0;
  const areOptionsValid =
    options.length >= 2 && !options.some((opt) => opt.trim() === "");

  const isFormValid =
    isQuestionValid && isCategoryValid && isTimeFrameValid && areOptionsValid;

  const addInput = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const removeInput = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleChangeText = (text: string, index: number) => {
    const newoptions = [...options];
    newoptions[index] = text;
    setOptions(newoptions);
  };

  const [activeButton, setActiveButton] = useState(false);

  // Dark and Light Mode
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(theme);

  // Pill Categories

  const Categories = [
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

  const handlePostPoll = async () => {
    if (!categories || !options || !question || options.length < 2) {
      alert("Please fill all fields");
      return;
    }

    const newPoll = {
      question,
      category: categories,
      timeFrame,
      options: options.filter((opt) => opt.trim() !== ""),
      createdAt: new Date().toISOString(),
    };

    dispatch(addPoll(newPoll));
    router.push("/(home)");
  };
  // Post Object

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createPollDiv}>
        <Text style={styles.createPollText}> Create a Poll</Text>
      </View>
      <View>
        <Text style={styles.categoryText}> Category</Text>
      </View>
      <View style={styles.pillDiv}>
        {Categories.map((filter, i) => (
          <Pill
            key={i}
            icon={filter.icon}
            title={filter.title}
            color="black"
            selected={categories === filter.title}
            onPress={() => setCategories(filter.title)}
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
        onChangeText={(question) => setQuestion(question)}
      />
      {!isQuestionValid && (
        <Text style={styles.errorText}> Question is required </Text>
      )}

      <View>
        <Text style={styles.addOptionText}>Add Options</Text>

        {options.map((value, index) => (
          <View key={index}>
            <TextInput
              style={styles.optionInput}
              value={value}
              placeholder={`Option ${index + 1}`}
              onChangeText={(text) => handleChangeText(text, index)}
            />
          </View>
        ))}
        {options.some((opt) => opt.trim() === "") && (
          <Text style={styles.errorOptionText}>Option cannot be empty</Text>
        )}

        <View style={styles.addAnotherOptionDiv}>
          <TouchableOpacity onPress={addInput}>
            <Text style={styles.addAnotherOptionText}>
              + Add Another option
            </Text>
          </TouchableOpacity>

          {options.length > 2 && (
            <TouchableOpacity
              style={styles.removeOtionDiv}
              onPress={() => removeInput(options.length - 1)}
            >
              <Text style={styles.removeOptionText}>- Remove Option</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.postPollDiv}>
        <View style={styles.pollDiv}>
          <View style={styles.pollTextDiv}>
            <Ionicons name="timer-outline" size={24} color={theme.text} />
            <Text style={styles.pollText}>Poll ends in</Text>
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
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: activeButton ? "#fff" : "blue" },
            ]}
            onPress={() => setActiveButton(!activeButton)}
          >
            <Text>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={!isFormValid}
            onPress={handlePostPoll}
          >
            <Text>Post Poll</Text>
          </TouchableOpacity>
        </View>
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
    removeOtionDiv: {
      marginTop: 14,
    },

    removeOptionText: {
      color: theme.text,
    },
    addAnotherOptionDiv: {
      alignItems: "flex-end",
      marginTop: 10,
      marginBottom: 10,
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
    pollText: {
      color: theme.text,
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
      marginTop: 30,
    },
    postPollDiv: {
      flexDirection: "column",
      justifyContent: "flex-end",
      flex: 1,
      marginBottom: 30,
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginBottom: 10,
    },
    errorOptionText: {
      color: "red",
      fontSize: 12,
    },
  });
