import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import RestTimer from "./RestTimer";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ExerciseProgress({
  exercise,
  setVolume,
  handleSetCompleteChange,
  bgcolor,
}) {
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
    const wasCompleted = completed[index];
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !wasCompleted;
    setCompleted(updatedCompleted);

    if (!wasCompleted) {
      setShowRestTimer(true);
      setVolume(
        (prev) => prev + Number(weightInKG[index]) * Number(reps[index])
      );
    } else {
      setVolume(
        (prev) => prev - Number(weightInKG[index]) * Number(reps[index])
      );
    }
  };

  const addSet = () => {
    setSets(sets + 1);
    setReps((prev) => [...prev, "0"]);
    setCompleted((prev) => [...prev, false]);
    setWeightInKG((prev) => [...prev, "0"]);
  };

  return (
    <View className="bg-white p-4 rounded-2xl">
      <View className="flex-row justify-between border-b border-black pb-2 mb-4">
        <Text className="font-bold text-black ml-2">{exercise.name}</Text>
        <View className="flex-row gap-2">
          <Text className="font-semibold text-black">2 mins </Text>
          <MaterialCommunityIcons
            name="timer-sand-complete"
            size={16}
            color="black"
          />
        </View>
      </View>
      <View className="flex-row px-2 mb-2">
        <Text className="w-[70px] font-bold text-black text-left px-2">
          Set
        </Text>
        <Text className="w-[70px] font-bold text-black text-left px-2">
          Reps
        </Text>
        <Text className="w-[100px] font-bold text-black text-left px-2">
          Weight(kg)
        </Text>
        <Text className="w-[70px] font-bold text-black text-center px-2">
          Status
        </Text>
      </View>

      {Array.from({ length: sets }).map((_, i) => (
        <View
          key={i}
          className="flex-row px-2 mb-2 items-center align-center rounded-xl py-1.5"
          style={{ backgroundColor: completed[i] ? bgcolor : "white" }}
        >
          <Text className="w-[70px] pl-4 font-bold text-left">{i + 1}</Text>

          <TextInput
            editable={!completed[i]}
            value={String(reps[i])}
            onChangeText={(text) => handleRepsChange(text, i)}
            keyboardType="numeric"
            placeholder={"0"}
            className={`w-[70px] px-2 py-1 text-center rounded-xl ${
              completed[i] ? "bg-transparent" : "bg-grey"
            } mr-6 -ml-3`}
          />

          <TextInput
            editable={!completed[i]}
            value={String(weightInKG[i])}
            keyboardType="numeric"
            onChangeText={(text) => handleWeightChange(text, i)}
            placeholder={"0"}
            className={`w-[70px] px-2 py-1 text-center rounded-xl ${
              completed[i] ? "bg-transparent" : "bg-grey"
            }`}
          />

          <TouchableOpacity
            onPress={() => handleCompleted(i)}
            className="w-[70px] ml-5 items-center"
          >
            <FontAwesome
              name={!completed[i] ? "check-circle-o" : "check-circle"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ))}

      <View className="items-center mt-3">
        <TouchableOpacity
          onPress={addSet}
          className=" flex-row gap-3 justify-center"
        >
          <FontAwesome5 name="plus" size={15} color="black" />
        </TouchableOpacity>
      </View>

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
