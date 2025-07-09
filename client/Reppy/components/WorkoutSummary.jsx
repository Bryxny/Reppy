import {
  View,
  Text,
  ActivityIndicator,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useGeneratePlan from "../hooks/useGeneratePlan.jsx";
import DaySummary from "./DaySummary.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const bgColors = [
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
];

export default function WorkoutSummary({ days, equipment }) {
  const {
    plan: GeneratedPlan,
    loading,
    error,
  } = useGeneratePlan(days, equipment);
  const { plan, setPlan } = usePlan();
  const { setWorkoutPlan } = useUser();
  const [openDay, setOpenDay] = useState(null);

  useEffect(() => {
    if (GeneratedPlan) {
      setPlan(GeneratedPlan);
    }
  }, [GeneratedPlan]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!plan) return null;

  return (
    <View className="flex-1 flex-col justify-between bg-black align-center ">
      <View className="gap-2">
        {plan &&
          plan.map((day, i) => {
            return (
              <DaySummary
                key={day.day}
                day={day}
                openDay={openDay}
                setOpenDay={setOpenDay}
                bgColor={bgColors[i]}
              />
            );
          })}
      </View>

      <View className="items-center p-6">
        <TouchableOpacity
          onPress={() => {
            setWorkoutPlan(plan);
            router.replace("/home");
          }}
        >
          <AntDesign name="rightcircle" size={40} color="#a5aacc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
