import { Text, View, Button } from "react-native";
import Calender from "../../components/Calender";
import quotes from "../../assets/quotes";
import { useEffect, useState } from "react";
import { useToday } from "../../context/TodayContext";
import { useUser } from "../../context/UserContext";

export default function Home() {
  const { todaysPlan } = useToday();
  const { name } = useUser();
  const [todaysQuote, setTodaysQuote] = useState("null");

  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setTodaysQuote(quotes[index]);
  }, []);

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
        </View>
      ) : (
        <Text> Rest Day</Text>
      )}
      <Button title="Start Workout" />
      <Text>{todaysQuote}</Text>
    </View>
  );
}
