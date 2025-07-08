import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useUser } from "../../context/UserContext";
import DaySummary from "../../components/DaySummary";
import { usePlan } from "../../context/PlanContext";
import { useEffect } from "react";

export default function Profile() {
  const { setName, setWorkoutPlan, setStats, name, stats, workoutPlan } =
    useUser();
  const { plan, setPlan } = usePlan();

  useEffect(() => {
    setPlan(workoutPlan);
  }, [workoutPlan]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared!");
      setName("");
      setWorkoutPlan([]);
      setStats({
        totalWorkouts: 0,
        totalTime: 0,
        totalSets: 0,
        totalVolume: 0,
        totalUpper: 0,
        totalLower: 0,
      });
      router.replace("/");
    } catch (e) {
      console.log("Failed to clear AsyncStorage", e);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello {name}!</Text>
      <Text>Let's take a look at your activity</Text>
      <Text>
        You've spent a total of{" "}
        {stats.totalTime >= 180 ? (stats.totalTime / 3600).toFixed(1) : "0"}{" "}
        hours exercising
      </Text>
      <Text>
        {stats.totalWorkouts}{" "}
        {stats.totalWorkouts !== 1 ? "workouts!" : "workout!"}
      </Text>
      <Text>
        {stats.totalSets} {stats.totalSets !== 1 ? "sets" : "set"}{" "}
      </Text>

      <Text>{stats.totalVolume} kg volume</Text>
      <Button title="delete user data" onPress={clearStorage} />
      <Text>Edit your current plan?</Text>
      {plan &&
        plan.map((day) => {
          return <DaySummary key={day.day} day={day} />;
        })}
      <Button
        title="save plan"
        onPress={() => {
          setWorkoutPlan(plan);
        }}
      />
      <Button
        title="generate new plan"
        onPress={() => {
          router.push("/generator");
        }}
      />
    </View>
  );
}
