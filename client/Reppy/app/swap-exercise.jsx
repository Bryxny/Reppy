import { Text, View, Button, TouchableOpacity } from "react-native";
import { alternativeExercises } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { useEquipment } from "../context/EquipmentContext";
import ExerciseSummary from "../components/ExerciseSummary";
import { usePlan } from "../context/PlanContext";
import { router } from "expo-router";
import { replaceExercise } from "../utils/api";
import { useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

const bgColors = [
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
];

export default function SwapExercise() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const { selectedEquipment } = useEquipment();
  const { plan, setPlan } = usePlan();
  const { oldEx } = useLocalSearchParams();
  const parsedOldEx = JSON.parse(oldEx);
  const currentExercises = plan.flatMap((day) => day.exercises);

  useEffect(() => {
    async function fetchAlternatives() {
      setLoading(true);
      setError(null);
      try {
        const alternates = await alternativeExercises(
          parsedOldEx,
          selectedEquipment,
          currentExercises
        );
        setAlternatives(alternates);
      } catch (err) {
        setError(err.message || "Error fetching alternative exercises");
      } finally {
        setLoading(false);
      }
    }
    if (parsedOldEx) {
      fetchAlternatives();
    }
  }, []);

  const handleReplace = async (newEx) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPlan = await replaceExercise(plan, parsedOldEx, newEx);
      setPlan(updatedPlan);
      router.back();
    } catch (err) {
      setError(err.message || "Error replacing exercise");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading Exercises....</Text>;

  if (error) return <Text>{error}</Text>;

  return (
    <View className="flex-1 flex-col items-center justify-center bg-black gap-2 p-16">
      <Text className="text-2xl font-bold mb-10 text-grey text-center tracking-widest ">
        Pick an exercise that works for you
      </Text>
      {alternatives &&
        alternatives.map((exercise, index) => {
          return (
            <View
              key={`${exercise.name}${index}`}
              style={{ backgroundColor: bgColors[index] }}
              className="flex-row p-4 rounded-xl justify-between items-center"
            >
              <View style={{ flex: 1 }}>
                <ExerciseSummary exercise={exercise} />
              </View>

              <TouchableOpacity
                disabled={loading}
                onPress={() => {
                  handleReplace(exercise);
                }}
                className="px-3"
              >
                <Feather name="repeat" size={20} color="#29272f" />
              </TouchableOpacity>
            </View>
          );
        })}
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <AntDesign
          name="leftcircle"
          size={40}
          color="#f9eaa1"
          className="mt-10"
        />
      </TouchableOpacity>
    </View>
  );
}
