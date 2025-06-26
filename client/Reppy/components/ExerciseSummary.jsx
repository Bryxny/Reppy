import { Text, View } from "react-native";

export default function ExerciseSummary({ exercise }) {
  return (
    <View>
      <Text> {exercise.name}</Text>
    </View>
  );
}
