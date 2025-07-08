import { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import RestTimer from "./RestTimer";

export default function ExerciseProgress({
  exercise,
  setVolume,
  handleSetCompleteChange,
}) {
  console.log("Rendering ExerciseProgress for:", exercise.name);
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(
    Array(exercise.sets).fill(String(exercise.reps))
  );
  const [weightInKG, setWeightInKG] = useState(Array(exercise.sets).fill("0"));
  const [completed, setCompleted] = useState(Array(exercise.sets).fill(false));

  const [showRestTimer, setShowRestTimer] = useState(false);

  useEffect(() => {
    const completedSets = completed.filter(Boolean).length;
    handleSetCompleteChange(exercise.name, completedSets);
  }, [completed]);

  const handleRepsChange = (text, index) => {
    const updatedReps = [...reps];
    updatedReps[index] = text.replace(/[^0-9]/g, "");
    setReps(updatedReps);
  };

  const handleWeightChange = (text, index) => {
    const updatedWeights = [...weightInKG];
    updatedWeights[index] = text.replace(/[^0-9]/g, "");
    setWeightInKG(updatedWeights);
  };

  const handleCompleted = (index) => {
    setShowRestTimer(true);
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
    setVolume((prev) => prev + Number(weightInKG[index]) * Number(reps[index]));
  };

  const addSet = () => {
    setSets(sets + 1);
    setReps((prev) => [...prev, "0"]);
    setCompleted((prev) => [...prev, false]);
    setWeightInKG((prev) => [...prev, "0"]);
  };

  return (
    <View>
      <Text>Rest time - 2 mins </Text>
      <Text>{exercise.name}</Text>
      {Array.from({ length: sets }).map((_, i) => {
        return (
          <View key={i}>
            <Text>Set {i + 1}</Text>
            <TextInput
              editable={!completed[i]}
              value={String(reps[i])}
              onChangeText={(text) => handleRepsChange(text, i)}
              keyboardType="numeric"
              placeholder={"0"}
            />
            <TextInput
              editable={!completed[i]}
              value={String(weightInKG[i])}
              keyboardType="numeric"
              onChangeText={(text) => handleWeightChange(text, i)}
              placeholder={"0"}
            />
            <Button
              title={!completed[i] ? "not complete" : "complete"}
              onPress={() => {
                handleCompleted(i);
              }}
            />
          </View>
        );
      })}
      <Button title="Add Set" onPress={addSet} />
      {showRestTimer && (
        <RestTimer
          seconds={120}
          visible={showRestTimer}
          onFinish={() => setShowRestTimer(false)}
          onSkip={() => setShowRestTimer(false)}
        />
      )}
    </View>
  );
}
