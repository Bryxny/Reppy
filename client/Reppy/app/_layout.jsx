import { Stack } from "expo-router";
import { UserProvider } from "./context/UserContext";
import { useUser } from "./context/UserContext";

function UserLayout() {
  const { name } = useUser();
  return (
    <Stack>
      {name ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="index" />}
      <Stack.Screen name="generator" />
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <UserProvider>
      <UserLayout />
    </UserProvider>
  );
}
