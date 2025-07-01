import { View, Text, ActivityIndicator, Button } from "react-native";
import useGeneratePlan from "../hooks/useGeneratePlan.jsx";
import DaySummary from "./DaySummary.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";

export default function WorkoutSummary({ days, equipment }) {
  const {
    plan: GeneratedPlan,
    loading,
    error,
  } = useGeneratePlan(days, equipment);
  const { plan, setPlan } = usePlan();
  const { setWorkoutPlan } = useUser();

  useEffect(() => {
    if (GeneratedPlan) {
      setPlan(GeneratedPlan);
    }
  }, [GeneratedPlan]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!plan) return null;

  return (
    <View>
      <Text>Your Workout Plan:</Text>
      {plan &&
        plan.map((day) => {
          return <DaySummary key={day.day} day={day} />;
        })}
      <Button
        title="save and continue"
        onPress={() => {
          setWorkoutPlan(plan);
          router.push("/home");
        }}
      />
    </View>
  );
}
