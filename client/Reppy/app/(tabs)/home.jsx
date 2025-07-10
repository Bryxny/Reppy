import { Text, View, Button, TouchableOpacity } from "react-native";
import Calender from "../../components/Calender";
import quotes from "../../assets/quotes";
import { useEffect, useState } from "react";
import { useToday } from "../../context/TodayContext";
import { useUser } from "../../context/UserContext";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const { todaysPlan } = useToday();
  const { name, stats, workoutPlan } = useUser();
  const [todaysQuote, setTodaysQuote] = useState("null");
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
    <View className="flex-1 bg-grey">
      <View className="mt-20 flex-start flex-col  gap-10 p-12 justify-center">
        <Text className="text-3xl font-bold mb-3 text-black text-left ml-2">
          {todaysPlan
            ? `Good to see you, ${name}! What’s the plan today?`
            : ` Welcome back, ${name}!`}
        </Text>
        <View
          style={{
            borderRadius: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 6,
            backgroundColor: "transparent",
          }}
        >
          <LinearGradient
            colors={["#f9eaa1", "#a5aacc"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 16,
              justifyContent: "center",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            <Text className="text-black text-xl font-extrabold text-center font-medium px-5">
              {todaysQuote}
            </Text>
          </LinearGradient>
        </View>

        <Calender />
        <View
          className="flex-col justify-center gap-2 bg-white p-4 rounded-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 6,
          }}
        >
          <Text className="text-xl font-bold mb-2 text-black text-center p-2">
            {todaysPlan
              ? `Time for your ${todaysPlan.type} session!`
              : "No workout on the calendar — maybe a stretch or rest today?"}
          </Text>
          {todaysPlan && (
            <TouchableOpacity
              onPress={() => {
                router.push("/workout");
              }}
              className="bg-black px-6 py-3 rounded-full self-center"
            >
              <Text className="text-grey font-semibold text-lg">
                Get Started
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          className="flex-col justify-center gap-2 bg-white p-6 rounded-3xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 6,
          }}
        >
          <Text className="text-center text-xl text-black font-bold">
            💧 Stay hydrated! Aim for 8 glasses today.
          </Text>
        </View>
      </View>
    </View>
  );
}
