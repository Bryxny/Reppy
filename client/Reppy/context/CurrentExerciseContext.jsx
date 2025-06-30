import { createContext, useState, useContext } from "react";

const CurrentExerciseContext = createContext();

export const CurrentExerciseProvider = ({ children }) => {
  const [selectedExercise, setSelectedExercise] = useState({});

  return (
    <CurrentExerciseContext.Provider
      value={{ selectedExercise, setSelectedExercise }}
    >
      {children}
    </CurrentExerciseContext.Provider>
  );
};

export const useCurrentExercise = () => useContext(CurrentExerciseContext);
