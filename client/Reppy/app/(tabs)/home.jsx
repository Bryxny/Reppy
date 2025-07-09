import { Text, View, Button } from "react-native";
import Calender from "../../components/Calender";
import quotes from "../../assets/quotes";
import { useEffect, useState } from "react";
import { useToday } from "../../context/TodayContext";
import { useUser } from "../../context/UserContext";
import { router } from "expo-router";

export default function Home() {
  const { todaysPlan } = useToday();
  const { name, stats, workoutPlan } = useUser();
  const [todaysQuote, setTodaysQuote] = useState("null");
  console.log(stats);
  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setTodaysQuote(quotes[index]);
  }, []);

  useEffect(() => {
    if (!workoutPlan.length) {
      router.replace("/generator");
    }
  }, [workoutPlan]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {todaysPlan ? (
        <View>
          <Text>Hey {name}, ready to move today?</Text>
        </View>
      ) : (
        <Text>Welcome back, {name}!</Text>
      )}
      <Calender />
      {todaysPlan ? (
        <View>
          <Text>Todays Plan - {todaysPlan.type}, ready to go?</Text>
          <Button title="Start Workout" />
        </View>
      ) : (
        <Text> No workout planned for today</Text>
      )}

      <Text>{todaysQuote}</Text>
    </View>
  );
}
