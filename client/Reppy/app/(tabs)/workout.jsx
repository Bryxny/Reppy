import { Text, View, ScrollView, Alert, Button } from "react-native";
import { useToday } from "../../context/TodayContext";
import ExerciseProgress from "../../components/ExerciseProgress";
import { useState, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";

export default function WorkoutMode() {
  const { todaysPlan } = useToday();
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (!paused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Alert.alert("Leaving Workout", "Would you like to pause or quit?", [
        {
          text: "Pause",
          onPress: () => {
            setPaused(true);
            unsubscribe();
            router.push("/home");
          },
        },
        {
          text: "Quit",
          style: "destructive",
          onPress: () => {
            unsubscribe();
            router.replace("/home");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {},
        },
      ]);
    });

    return unsubscribe;
  }, [navigation, router]);

  return (
    <ScrollView>
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
              router.push("home");
            }}
          />
        </View>
        <Text>Elapsed: {seconds} s</Text>
        {todaysPlan ? (
          todaysPlan.exercises.map((exercise) => (
            <ExerciseProgress key={exercise.name} exercise={exercise} />
          ))
        ) : (
          <Text>rest day</Text>
        )}
      </View>
    </ScrollView>
  );
}
