import { Text, View, Button } from "react-native";
import { alternativeExercises } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { useEquipment } from "../context/EquipmentContext";
import ExerciseSummary from "../components/ExerciseSummary";
import { usePlan } from "../context/PlanContext";
import { router } from "expo-router";
import { replaceExercise } from "../utils/api";
import { useLocalSearchParams } from "expo-router";
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
    <View>
      <Text>Alternative Exercises</Text>
      {alternatives.map((exercise, index) => {
        return (
          <View key={`${exercise.name}${index}`}>
            <ExerciseSummary exercise={exercise} />
            <Button
              disabled={loading}
              title="choose this execise"
              onPress={() => {
                handleReplace(exercise);
              }}
            />
          </View>
        );
      })}
    </View>
  );
}
