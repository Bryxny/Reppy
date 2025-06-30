import { Stack } from "expo-router";
import { CurrentExerciseProvider } from "../context/CurrentExerciseContext";
import { UserProvider } from "../context/UserContext";
import { useUser } from "../context/UserContext";
import { EquipmentProvider } from "../context/EquipmentContext";

export default function RootLayout() {
  return (
    <EquipmentProvider>
      <CurrentExerciseProvider>
        <UserProvider>
          <Stack>
            <UserStack />
          </Stack>
        </UserProvider>
      </CurrentExerciseProvider>
    </EquipmentProvider>
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
