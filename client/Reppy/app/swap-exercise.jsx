import { Text, View, Button } from "react-native";
import { useCurrentExercise } from "../context/CurrentExerciseContext";
import { alternativeExercises } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { useEquipment } from "../context/EquipmentContext";
import ExerciseSummary from "../components/ExerciseSummary";
import { usePlan } from "../context/PlanContext";
import { router } from "expo-router";
import { replaceExercise } from "../utils/api";

export default function SwapExercise() {
  const { selectedExercise } = useCurrentExercise();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const { selectedEquipment } = useEquipment();
  const { plan, setPlan } = usePlan();

  useEffect(() => {
    async function fetchAlternatives() {
      setLoading(true);
      setError(null);
      try {
        const alternates = await alternativeExercises(
          selectedExercise,
          selectedEquipment
        );
        setAlternatives(alternates);
      } catch (err) {
        setError(err.message || "Error fetching alternative exercises");
      } finally {
        setLoading(false);
      }
    }
    if (selectedExercise) {
      fetchAlternatives();
    }
  }, [selectedExercise]);

  const handleReplace = async (newEx) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPlan = await replaceExercise(plan, selectedExercise, newEx);
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
      {alternatives.map((exercise) => {
        return (
          <View>
            <ExerciseSummary key={exercise.name} exercise={exercise} />
            <Button
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
