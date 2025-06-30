import { Text, View } from "react-native";
import { useCurrentExercise } from "../context/CurrentExerciseContext";
import { alternativeExercises } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { useEquipment } from "../context/EquipmentContext";
import ExerciseSummary from "../components/ExerciseSummary";

export default function SwapExercise() {
  const { selectedExercise } = useCurrentExercise();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const { selectedEquipment } = useEquipment();

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

  if (loading) return <Text>Loading Exercises....</Text>;

  if (error) return <Text>{error}</Text>;
  return (
    <View>
      <Text>Alternative Exercises</Text>
      {alternatives.map((exercise) => {
        return <ExerciseSummary key={exercise.name} exercise={exercise} />;
      })}
    </View>
  );
}
