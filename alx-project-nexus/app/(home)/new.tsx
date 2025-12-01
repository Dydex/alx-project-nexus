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
import { useState } from "react";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function NewPage() {
  const [question, setQuestion] = useState("");
  const [categories, setCategories] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [activeButton, setActiveButton] = useState(false);

  // validation
  const isQuestionValid = question.trim().length > 0;
  const isCategoryValid = categories.trim().length > 0;
  const areOptionsValid =
    options.length >= 2 && !options.some((opt) => opt.trim() === "");
  const isFormValid = isQuestionValid && isCategoryValid && areOptionsValid;

  const addInput = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const removeInput = (index: number) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  const handleChangeText = (text: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  // theme
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;
  const styles = createStyles(theme);

  const Categories = [
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

  const handlePostPoll = async () => {
    if (!isFormValid) return;

    const newPoll = {
      question,
      category: categories,
      options: options
        .filter((opt) => opt.trim() !== "")
        .map((opt) => ({ text: opt, votes: 0 })),
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("polls").insert([newPoll]);

    if (error) {
      alert("Something went wrong");
      return;
    }

    router.push({ pathname: "/(home)", params: { refresh: Date.now() } });

    // reset form
    setQuestion("");
    setCategories("");
    setOptions(["", ""]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createPollDiv}>
        <Text style={styles.createPollText}>Create a Poll</Text>
      </View>

      <Text style={styles.categoryText}>Category</Text>
      <View style={styles.pillDiv}>
        {Categories.map((cat, i) => (
          <Pill
            key={i}
            title={cat.title}
            icon={cat.icon}
            color="black"
            selected={categories === cat.title}
            onPress={() => setCategories(cat.title)}
            borderColor="#ccc"
            borderRadius={10}
          />
        ))}
      </View>

      <Text style={styles.questionText}>Question</Text>
      <TextInput
        style={styles.questionInput}
        multiline
        placeholder="Who is the best actor of all time?"
        value={question}
        onChangeText={setQuestion}
      />

      <Text style={styles.addOptionText}>Add Options</Text>
      {options.map((_, index) => (
        <TextInput
          key={index}
          style={styles.optionInput}
          placeholder={`Option ${index + 1}`}
          value={options[index]}
          onChangeText={(t) => handleChangeText(t, index)}
        />
      ))}

      <View style={styles.addAnotherOptionDiv}>
        {options.length < 4 && (
          <TouchableOpacity onPress={addInput}>
            <Text style={styles.addAnotherOptionText}>
              + Add Another option
            </Text>
          </TouchableOpacity>
        )}
        {options.length > 2 && (
          <TouchableOpacity onPress={() => removeInput(options.length - 1)}>
            <Text style={styles.removeOptionText}>- Remove Option</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.postPollDiv}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: activeButton ? "#fff" : "#3B82F6" },
            ]}
            onPress={() => setActiveButton(!activeButton)}
          >
            <Text style={{ color: activeButton ? "#3B82F6" : "#fff" }}>
              Preview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
            disabled={!isFormValid}
            onPress={handlePostPoll}
          >
            <Text style={{ color: "#3B82F6" }}>Post Poll</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: theme.background },
    createPollDiv: {
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    createPollText: { fontSize: 20, fontWeight: "600", color: theme.text },
    categoryText: { marginTop: 20, fontWeight: "600", color: theme.text },
    questionText: { marginTop: 20, fontWeight: "600", color: theme.text },
    addOptionText: { fontWeight: "600", color: theme.text, marginBottom: 15 },
    pillDiv: { flexDirection: "row", gap: 10, marginTop: 10 },
    questionInput: {
      height: 100,
      backgroundColor: "#ccc",
      borderRadius: 10,
      padding: 10,
      marginTop: 15,
      marginBottom: 20,
      textAlignVertical: "top",
    },
    optionInput: {
      height: 50,
      backgroundColor: "#ccc",
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    addAnotherOptionDiv: { alignItems: "flex-end", marginVertical: 10 },
    addAnotherOptionText: { color: theme.text },
    removeOptionText: { color: theme.text, marginTop: 10 },
    postPollDiv: { flex: 1, justifyContent: "flex-end", marginBottom: 30 },
    buttons: { flexDirection: "row", gap: 8, marginTop: 30 },
    button: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: "#FFF",
      borderWidth: 2,
      borderColor: "#4B2AFA",
    },
  });
