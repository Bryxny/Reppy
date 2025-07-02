import { Text, TouchableOpacity, View, Button } from "react-native";
import ExerciseSummary from "./ExerciseSummary";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useCurrentExercise } from "../context/CurrentExerciseContext";

export default function DaySummary({ day }) {
  const [open, setOpen] = useState(false);
  const { setSelectedExercise } = useCurrentExercise();
  const router = useRouter();
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
          return (
            <View key={exercise.name}>
              <ExerciseSummary exercise={exercise} />
              <Button
                title="swap"
                onPress={() => {
                  setSelectedExercise(exercise);
                  router.push({
                    pathname: "/swap-exercise",
                    params: {
                      oldEx: JSON.stringify(exercise),
                    },
                  });
                }}
              />
            </View>
          );
        })}
    </View>
  );
}
