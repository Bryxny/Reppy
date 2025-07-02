import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { useUser } from "../context/UserContext";
import { EquipmentProvider } from "../context/EquipmentContext";
import { PlanProvider } from "../context/PlanContext";

export default function RootLayout() {
  return (
    <PlanProvider>
      <EquipmentProvider>
        <UserProvider>
          <Stack>
            <UserStack />
          </Stack>
        </UserProvider>
      </EquipmentProvider>
    </PlanProvider>
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
