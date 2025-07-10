import {
  Text,
  View,
  ScrollView,
  Alert,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useToday } from "../../context/TodayContext";
import { useUser } from "../../context/UserContext";
import ExerciseProgress from "../../components/ExerciseProgress";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import Timer from "../../components/Timer";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import graphic from "../../assets/images/reppyChill-removebg-preview.png";

const bgColors = [
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
];

export default function WorkoutMode() {
  const { todaysPlan, setTodaysPlan, isLoading } = useToday();
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(0);
  const [setsPerExercise, setSetsPerExercise] = useState({});
  const elapsedRef = useRef(0);
  const { setStats } = useUser();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (paused) setPaused(false);
    }, [paused])
  );

  const handleSetCompleteChange = (exerciseName, completedSets) => {
    setSetsPerExercise((prev) => ({
      ...prev,
      [exerciseName]: completedSets,
    }));
  };

  const handleComplete = () => {
    const completedSets = Object.values(setsPerExercise).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const newWorkout = {
      totalWorkouts: 1,
      totalTime: elapsedRef.current,
      totalSets: completedSets,
      totalVolume: volume,
      totalUpper: 0,
      totalLower: 0,
    };
    if (
      todaysPlan.type === "Push" ||
      todaysPlan.type === "Upper" ||
      todaysPlan.type === "Full Body" ||
      todaysPlan.type === "Pull"
    ) {
      newWorkout.totalUpper = 1;
    } else if (
      todaysPlan.type === "Legs" ||
      todaysPlan.type === "Lower" ||
      todaysPlan.type === "Glutes" ||
      todaysPlan.type === "Quads" ||
      todaysPlan.type === "Full Body"
    ) {
      newWorkout.totalLower = 1;
    }

    setStats((prev) => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + newWorkout.totalWorkouts,
      totalTime: prev.totalTime + newWorkout.totalTime,
      totalSets: prev.totalSets + newWorkout.totalSets,
      totalVolume: prev.totalVolume + newWorkout.totalVolume,
      totalUpper: prev.totalUpper + newWorkout.totalUpper,
      totalLower: prev.totalLower + newWorkout.totalLower,
    }));
    setTodaysPlan(null);
    router.replace("/home");
  };

  if (isLoading)
    return (
      <View className="mt-10 flex-start flex-col  gap-10 p-8 justify-center">
        <Text>Loading Workout</Text>
      </View>
    );

  if (!todaysPlan)
    return (
      <View className="flex-1 flex-col bg-black gap-5 p-16 justify-center align-center items-center">
        <Image source={graphic} className="w-60 h-96" />
        <Text className="color-white text-xl font-bold text-center">
          No workout planned, perfect chance to recharge.
        </Text>
        <TouchableOpacity
          className="bg-blue rounded-3xl p-4 mt-6"
          onPress={() => {
            router.replace("home");
          }}
        >
          <Text className="color-white text-xl font-bold text-center ">
            Return Home
          </Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <ScrollView className=" bg-grey">
      <View className="mt-10 flex-start  flex-col gap-10 p-8 justify-center">
        <View className="flex-row justify-between items-center ">
          <TouchableOpacity
            className="bg-black rounded-2xl p-2"
            onPress={() => {
              Alert.alert(
                "Leaving Workout",
                "Would you like to pause or quit?",
                [
                  {
                    text: "Pause",
                    onPress: () => {
                      setPaused(true);
                      router.push("/home");
                    },
                  },
                  {
                    text: "Quit",
                    style: "destructive",
                    onPress: () => {
                      setPaused(false);
                      elapsedRef.current = 0;
                      router.replace("/home");
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
          >
            <Feather name="arrow-left-circle" size={24} color="white" />
          </TouchableOpacity>
          <Timer paused={paused} elapsedRef={elapsedRef} />
          <View className="bg-black rounded-2xl p-2 px-3">
            <Text className="color-yellow text-xl font-bold">{volume}kg</Text>
          </View>
          <TouchableOpacity
            onPress={handleComplete}
            className="bg-black rounded-2xl p-2"
          >
            <FontAwesome5 name="check-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {todaysPlan.exercises.map((exercise, i) => (
          <ExerciseProgress
            key={exercise.name}
            exercise={exercise}
            setVolume={setVolume}
            handleSetCompleteChange={handleSetCompleteChange}
            bgcolor={bgColors[i]}
          />
        ))}
      </View>
    </ScrollView>
  );
}
