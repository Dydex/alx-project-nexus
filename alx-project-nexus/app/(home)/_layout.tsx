import { Tabs } from "expo-router";

export default function HomeRootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="results"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
