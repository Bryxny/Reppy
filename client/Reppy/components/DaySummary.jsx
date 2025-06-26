import { Text, TouchableOpacity, View } from "react-native";
import ExerciseSummary from "./ExerciseSummary";
import { useState } from "react";

export default function DaySummary({ day }) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
        }}
      >
        <Text>{day.day}</Text>
      </TouchableOpacity>

      {open &&
        day.exercises.map((exercise) => {
          return <ExerciseSummary key={exercise.name} exercise={exercise} />;
        })}
    </View>
  );
}
