import { Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useUser } from "../../context/UserContext";
import DaySummary from "../../components/DaySummary";
import { usePlan } from "../../context/PlanContext";
import { useEffect, useState } from "react";
import { useEquipment } from "../../context/EquipmentContext";
import PreferenceModal from "../../components/Preferences";
import { Feather } from "@expo/vector-icons/";

const bgColors = [
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
];

export default function Profile() {
  const { setName, setWorkoutPlan, setStats, name, stats, workoutPlan } =
    useUser();
  const { plan, setPlan } = usePlan();
  const { setSelectedEquipment } = useEquipment();
  const [prefsVisible, setPrefsVisible] = useState(false);

  useEffect(() => {
    setPlan(workoutPlan);
  }, [workoutPlan]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
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
      setSelectedEquipment([]);
      setTimeout(() => {
        router.replace("/");
      }, 50);
    } catch (e) {}
  };
  const [openDay, setOpenDay] = useState(null);

  return (
    <View className="flex-1 bg-grey">
      <ScrollView>
        <View className="mt-14 flex-start flex-col gap-5 p-8 justify-center pb-32 ">
          <PreferenceModal
            visible={prefsVisible}
            onClose={() => setPrefsVisible(false)}
            onDeleteData={() => {
              clearStorage();
              setPrefsVisible(false);
            }}
          />
          <View className="flex-row justify-between">
            <Text className="color-black text-xl font-bold text-left leading-10 ">
              Hello {name}! {"\n"}Let's take a look at your activity
            </Text>
            <TouchableOpacity
              onPress={() => setPrefsVisible(true)}
              className="mt-1"
            >
              <Feather name="settings" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-6 mt-4">
            <View className="w-[100px] h-[120px] bg-white rounded-xl p-4 justify-start">
              <Text className="font-bold text-left">workouts total</Text>
              <Text className="color-blue text-3xl text-center mt-5 font-bold">
                {stats.totalWorkouts}
              </Text>
            </View>
            <View className="w-[100px] h-[120px] bg-white rounded-xl p-4 justify-start">
              <Text className="font-bold text-left">upper body</Text>
              <Text className="color-green text-3xl text-center mt-5 font-bold">
                {stats.totalWorkouts > 0
                  ? Math.round((stats.totalUpper / stats.totalWorkouts) * 100)
                  : 0}
                %
              </Text>
            </View>
            <View className="w-[100px] h-[120px] bg-white rounded-xl p-4 justify-start">
              <Text className="font-bold text-left">lower body</Text>
              <Text className="color-blue text-3xl text-center mt-5 font-bold">
                {stats.totalWorkouts > 0
                  ? Math.round((stats.totalLower / stats.totalWorkouts) * 100)
                  : 0}
                %
              </Text>
            </View>
          </View>
          <View className="flex-col gap-6 mt-2">
            <View className="w-[342px] h-[65px] bg-white rounded-xl p-4 justify-between flex-row">
              <Text className="font-bold text-left">{`total \nvolume`}</Text>
              <Text className="font-bold text-4xl color-blue">
                {stats.totalVolume}kg
              </Text>
            </View>
            <View className="w-[342px] h-[65px] bg-white rounded-xl p-4 justify-between flex-row">
              <Text className="font-bold text-4xl color-green">
                {stats.totalTime >= 180
                  ? (stats.totalTime / 3600).toFixed(1)
                  : "0"}
              </Text>
              <Text className="font-bold text-left">{`hours \nspent`}</Text>
            </View>
          </View>
          <Text className="color-black text-xl font-bold text-left leading-10 ">
            Your Plan
          </Text>
          {plan &&
            plan.map((day, i) => {
              return (
                <DaySummary
                  key={day.day}
                  day={day}
                  openDay={openDay}
                  setOpenDay={setOpenDay}
                  bgColor={bgColors[i]}
                />
              );
            })}
          <TouchableOpacity
            onPress={() => {
              setWorkoutPlan(plan);
            }}
            className="bg-black w-[150px] p-3 rounded-2xl self-center mt-2"
          >
            <Text className="color-grey font-bold text-center">Save Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
