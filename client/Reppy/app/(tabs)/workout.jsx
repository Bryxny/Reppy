import { Text, View, ScrollView, Alert, Button } from "react-native";
import { useToday } from "../../context/TodayContext";
import { useUser } from "../../context/UserContext";
import ExerciseProgress from "../../components/ExerciseProgress";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import Timer from "../../components/Timer";

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
    console.log(todaysPlan.type);
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

  if (isLoading) return <Text>Loading Workout</Text>;

  if (!todaysPlan)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No Workout Planned</Text>
        <Button
          title="return to home"
          onPress={() => {
            router.replace("home");
          }}
        />
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Button
            title="leave"
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
          />
          <Timer paused={paused} elapsedRef={elapsedRef} />
          <Button title="end workout" onPress={handleComplete} />
        </View>
        <Text>{volume}kg</Text>
        {todaysPlan.exercises.map((exercise) => (
          <ExerciseProgress
            key={exercise.name}
            exercise={exercise}
            setVolume={setVolume}
            handleSetCompleteChange={handleSetCompleteChange}
          />
        ))}
      </View>
    </ScrollView>
  );
}
