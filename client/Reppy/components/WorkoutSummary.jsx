import { View, Text, ActivityIndicator } from "react-native";
import useGeneratePlan from "../hooks/useGeneratePlan.jsx";
import DaySummary from "./DaySummary.jsx";

export default function WorkoutSummary({ days, equipment }) {
  const { plan, loading, error } = useGeneratePlan(days, equipment);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!plan) return null;

  return (
    <View>
      <Text>Your Workout Plan:</Text>
      {plan.map((day) => {
        return <DaySummary key={day.day} day={day} />;
      })}
    </View>
  );
}
