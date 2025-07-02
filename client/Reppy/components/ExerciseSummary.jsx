import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
export default function ExerciseSummary({ exercise }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/exercise-detail",
          params: {
            exercise: JSON.stringify(exercise),
          },
        });
      }}
    >
      <Text>{exercise.name}</Text>
    </TouchableOpacity>
  );
}
