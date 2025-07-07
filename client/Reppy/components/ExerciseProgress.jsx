import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

export default function ExerciseProgress({ exercise }) {
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(
    Array(exercise.sets).fill(String(exercise.reps))
  );
  const [completed, setCompleted] = useState(Array(exercise.sets).fill(false));

  const handleRepsChange = (text, index) => {
    const updatedReps = [...reps];
    updatedReps[index] = text.replace(/[^0-9]/g, "");
    setReps(updatedReps);
  };

  const handleCompleted = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
  };

  const addSet = () => {
    setSets(sets + 1);
    setReps((prev) => [...prev, "0"]);
    setCompleted((prev) => [...prev, false]);
  };

  return (
    <View>
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
              placeholder={String(reps[i])}
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
    </View>
  );
}
