import { createContext, useState, useContext } from "react";

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
