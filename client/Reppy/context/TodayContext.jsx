import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_TODAY = "@today_plan_data";

const TodayContext = createContext();

export function TodayProvider({ children }) {
  const { workoutPlan } = useUser();
  const [todaysPlan, setTodaysPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const todaysKey = dayKeys[new Date().getDay()];
  useEffect(() => {
    async function loadData() {
      if (!workoutPlan || workoutPlan.length === 0) return;
      setIsLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_TODAY);
        if (jsonValue) {
          const savedData = JSON.parse(jsonValue);
          console.log(savedData);
          if (savedData.date === new Date().toDateString()) {
            setTodaysPlan(savedData.plan);
            setIsLoading(false);
            return;
          }
        }
        const plan = workoutPlan.find((day) => day.day === todaysKey) || null;
        setTodaysPlan(plan);
        setIsLoading(false);
      } catch (e) {
        console.log("Failed to load today's plan", e);
        setIsLoading(false);
      }
    }

    loadData();
  }, [workoutPlan, todaysKey]);

  useEffect(() => {
    async function saveData() {
      try {
        const dataToSave = {
          date: new Date().toDateString(),
          plan: todaysPlan,
        };
        await AsyncStorage.setItem(
          STORAGE_KEY_TODAY,
          JSON.stringify(dataToSave)
        );
      } catch (e) {
        console.log("Failed to save today's plan", e);
      }
    }

    if (!isLoading && todaysPlan !== null) {
      saveData();
    }
  }, [todaysPlan, isLoading]);

  return (
    <TodayContext.Provider
      value={{ todaysPlan, isLoading, todaysKey, setTodaysPlan }}
    >
      {children}
    </TodayContext.Provider>
  );
}

export const useToday = () => useContext(TodayContext);
