import { useState } from "react";
import { Text, View, Button, ScrollView, TouchableOpacity } from "react-native";
import DayPicker from "../components/DayPicker";
import WorkoutSummary from "../components/WorkoutSummary";
import { useEquipment } from "../context/EquipmentContext";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const equipmentOptions = ["gym", "bodyweight", "dumbbells", "bands"];

export default function Generator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");
  const { selectedEquipment, setSelectedEquipment } = useEquipment();

  const toggleEquipment = (item) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  return (
    <View className="flex-1 flex-col items-center justify-center bg-black gap-10 p-16">
      {stepIndex === 0 && (
        <View className="mt-36 items-center">
          <Text className="text-2xl font-bold mb-10 text-grey text-center tracking-widest ">
            Which days would{"\n"} you like to exercise?
          </Text>
          <DayPicker setDays={setDays} setStepIndex={setStepIndex} />
          <Text className="text-l mb-4 text-grey text-center mt-5 h-5">
            {error || " "}
          </Text>
        </View>
      )}
      {stepIndex === 1 && (
        <View className="flex-col gap-2 items-center">
          <Text className="text-2xl font-bold mb-10 text-grey text-center tracking-widest ">
            Which equipment do you have access to?
          </Text>
          <View className="gap-4 mb-10">
            {equipmentOptions.map((item) => {
              return (
                <View key={item} className="flex-row gap-7 items-center">
                  <TouchableOpacity onPress={() => toggleEquipment(item)}>
                    <FontAwesome
                      name={
                        selectedEquipment.includes(item)
                          ? "check-circle"
                          : "circle-o"
                      }
                      size={36}
                      color="#a5aacc"
                    />
                  </TouchableOpacity>
                  <Text className="text-xl font-semibold  text-grey tracking-widest capitalize">
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (selectedEquipment.length > 0) {
                setStepIndex(2);
              } else {
                setError("Please select one");
              }
            }}
          >
            <AntDesign name="rightcircle" size={40} color="#f9eaa1" />
          </TouchableOpacity>
          <Text className="text-l mb-4 text-grey text-center mt-7 h-5">
            {error || " "}
          </Text>
        </View>
      )}
      {stepIndex === 2 && (
        <View className="mt-10">
          <Text className="text-2xl font-bold mb-10 text-grey text-center tracking-widest">
            Here's your personalised plan. Tap a day to view or edit exercises
          </Text>
          <WorkoutSummary
            days={days}
            equipment={selectedEquipment}
            variant="light"
          />
        </View>
      )}
    </View>
  );
}
