import { Stack } from "expo-router";

export default function Onboardinglayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="page1" />
      <Stack.Screen name="page2" />
      <Stack.Screen name="page3" />
    </Stack>
  );
}
