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
  const [hasInitialized, setHasInitialized] = useState(false);
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
      } finally {
        setHasInitialized(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;
    (async () => {
      try {
        const dataToSave = JSON.stringify({ name, workoutPlan, stats });
        await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
      } catch (e) {}
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
        hasInitialized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
