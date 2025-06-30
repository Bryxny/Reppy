import { Text, TouchableOpacity, View } from "react-native";
import { useCurrentExercise } from "../context/CurrentExerciseContext";
import { Link } from "expo-router";

export default function ExerciseSummary({ exercise }) {
  const { setSelectedExercise } = useCurrentExercise();

  return (
    <Link href="/exercise-detail" asChild>
      <TouchableOpacity
        onPress={() => {
          setSelectedExercise(exercise);
        }}
      >
        <Text>{exercise.name}</Text>
      </TouchableOpacity>
    </Link>
  );
}
