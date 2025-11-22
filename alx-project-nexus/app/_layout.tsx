import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </Provider>
  );
}
