import { Text, View } from "react-native";
import { useCurrentExercise } from "../context/CurrentExerciseContext";

export default function ExerciseDetail() {
  const { selectedExercise: exercise } = useCurrentExercise();
  if (!exercise || !exercise.name) {
    return <Text>No exercise data</Text>;
  }
  console.log("Exercise detail:", exercise);
  return (
    <View>
      <Text>{exercise.name}</Text>

      <Text>Equipment:</Text>
      {exercise.equipment.map((eq) => (
        <Text key={eq}>{eq}</Text>
      ))}

      <Text>Movement:</Text>
      <Text>{exercise.movement}</Text>

      <Text>Recommended Sets & Reps:</Text>
      <Text>
        {exercise.sets} sets of {exercise.reps} reps
      </Text>

      <Text>Muscle Focus:</Text>
      {exercise.muscleFocus.map((focus) => (
        <Text key={focus}>{focus}</Text>
      ))}
    </View>
  );
}
