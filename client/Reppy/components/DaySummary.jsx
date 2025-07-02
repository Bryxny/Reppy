import {
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  Platform,
} from "react-native";
import ExerciseSummary from "./ExerciseSummary";
import { useState } from "react";
import { useRouter } from "expo-router";
import { deleteExercise } from "../utils/api";
import { usePlan } from "../context/PlanContext";

export default function DaySummary({ day }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { plan, setPlan } = usePlan();
  const confirmDelete = (exercise) => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this exercise?")) {
        handleDelete(exercise);
      }
    } else {
      Alert.alert(
        "Remove exercise",
        "Are you sure you want to delete this exercise?",
        [
          { text: "Go Back", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => handleDelete(exercise),
          },
        ]
      );
    }
  };
  const handleDelete = async (exercise) => {
    setLoading(true);
    setError(null);
    try {
      const newPlan = await deleteExercise(plan, exercise);
      setPlan(newPlan);
    } catch (err) {
      setError(err.message || "Error deleting exercise");
    } finally {
      setLoading(false);
    }
  };

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
                  router.push({
                    pathname: "/swap-exercise",
                    params: {
                      oldEx: JSON.stringify(exercise),
                    },
                  });
                }}
              />
              <Button
                title="delete"
                disabled={loading}
                onPress={() => {
                  confirmDelete(exercise);
                }}
              />
            </View>
          );
        })}
      {error && <Text>{error}</Text>}
    </View>
  );
}
