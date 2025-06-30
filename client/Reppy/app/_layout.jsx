import { Stack } from "expo-router";
import { CurrentExerciseProvider } from "../context/CurrentExerciseContext";
import { UserProvider } from "../context/UserContext";
import { useUser } from "../context/UserContext";

export default function RootLayout() {
  return (
    <CurrentExerciseProvider>
      <UserProvider>
        <Stack>
          <UserStack />
        </Stack>
      </UserProvider>
    </CurrentExerciseProvider>
  );
}

function UserStack() {
  const { name } = useUser();
  return (
    <>
      {name ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="index" />}
      <Stack.Screen name="generator" />
      <Stack.Screen
        name="exercise-detail"
        options={{
          presentation: "modal",
        }}
      />
    </>
  );
}
