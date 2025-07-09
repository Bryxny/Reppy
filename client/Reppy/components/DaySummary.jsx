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
import { Entypo, Feather } from "@expo/vector-icons";

export default function DaySummary({ day, openDay, setOpenDay, bgColor }) {
  const isOpen = openDay === day.day;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { plan, setPlan } = usePlan();
  const router = useRouter();
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
    <View style={{ backgroundColor: bgColor }} className={`p-2 rounded-xl`}>
      <TouchableOpacity
        onPress={() => {
          setOpenDay(isOpen ? null : day.day);
        }}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-black text-center ml-1 capitalize p-1">
            {day.day} - {day.type}
          </Text>
          <Entypo
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#29272f"
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View className="p-3 mt-2 gap-5">
          {day.exercises.map((exercise) => {
            return (
              <View key={exercise.name} className="flex-row justify-between">
                <ExerciseSummary exercise={exercise} />
                <View className="flex-row gap-2 items-center justify-center">
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: "/swap-exercise",
                        params: {
                          oldEx: JSON.stringify(exercise),
                        },
                      });
                    }}
                  >
                    <Feather name="repeat" size={20} color="#29272f" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={loading}
                    onPress={() => {
                      confirmDelete(exercise);
                    }}
                  >
                    <Feather name="x" size={20} color="#29272f" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
