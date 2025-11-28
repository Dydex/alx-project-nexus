import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeRootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4B2AFA",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chart/[id]"
        options={{
          title: "Chart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="new"
        options={{
          title: "New",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={50} color={color} />
          ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
