import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { useUser } from "../context/UserContext";
import { EquipmentProvider } from "../context/EquipmentContext";
import { PlanProvider } from "../context/PlanContext";
import { TodayProvider } from "../context/TodayContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <TodayProvider>
        <PlanProvider>
          <EquipmentProvider>
            <UserStack />
          </EquipmentProvider>
        </PlanProvider>
      </TodayProvider>
    </UserProvider>
  );
}

function UserStack() {
  const { name } = useUser();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {name ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="index" />}
      <Stack.Screen name="generator" />
      <Stack.Screen
        name="exercise-detail"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
