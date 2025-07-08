import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_data";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalTime: 0,
    totalSets: 0,
    totalVolume: 0,
    totalUpper: 0,
    totalLower: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const savedData = JSON.parse(jsonValue);
          setName(savedData.name || "");
          setWorkoutPlan(savedData.workoutPlan || []);
          setStats(
            savedData.stats || {
              totalWorkouts: 0,
              totalTime: 0,
              totalSets: 0,
              totalVolume: 0,
              totalUpper: 0,
              totalLower: 0,
            }
          );
        }
      } catch (e) {
        console.log("Failed to load user data", e);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Saving user data", { name, workoutPlan, stats });
    (async () => {
      try {
        const dataToSave = JSON.stringify({ name, workoutPlan, stats });
        await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
      } catch (e) {
        console.log("Failed to save user data", e);
      }
    })();
  }, [name, workoutPlan, stats]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        workoutPlan,
        setWorkoutPlan,
        stats,
        setStats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
