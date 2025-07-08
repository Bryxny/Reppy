// context/TodayContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

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
    setIsLoading(true);
    const plan = workoutPlan.find((day) => day.day === todaysKey) || null;
    setTodaysPlan(plan);
    setIsLoading(false);
  }, [workoutPlan, todaysKey]);

  return (
    <TodayContext.Provider
      value={{ todaysPlan, isLoading, todaysKey, setTodaysPlan }}
    >
      {children}
    </TodayContext.Provider>
  );
}

export const useToday = () => useContext(TodayContext);
