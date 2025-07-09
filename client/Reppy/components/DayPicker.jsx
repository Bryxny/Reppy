import { useState } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const dayLabels = {
  monday: "M",
  tuesday: "T",
  wednesday: "W",
  thursday: "T",
  friday: "F",
  saturday: "S",
  sunday: "S",
};

export default function DayPicker({ setDays, setStepIndex }) {
  const [daysOfWeek, setDaysOfWeek] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [error, setError] = useState("");
  const toggleDay = (day) => {
    setDaysOfWeek((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleDays = () => {
    const selectedDays = Object.entries(daysOfWeek)
      .filter(([day, isTrue]) => isTrue)
      .map(([day]) => day);
    if (selectedDays.length < 2 || selectedDays.length > 6) {
      setError("Please select between 2 and 6 days");
      setDays([]);
    } else {
      setError("");
      setDays(selectedDays);
      setStepIndex(1);
    }
  };

  return (
    <View className="items-center justify-center gap-16">
      <View className="flex-row justify-center gap-5">
        {Object.entries(dayLabels).map(([day, label]) => {
          return (
            <View key={day}>
              <Text className="text-3xl font-bold mb-3 text-grey text-center">
                {label}
              </Text>
              <TouchableOpacity onPress={() => toggleDay(day)}>
                <FontAwesome
                  name={daysOfWeek[day] ? "check-circle" : "circle-o"}
                  size={36}
                  color="#a5aacc"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={handleDays}>
        <AntDesign name="rightcircle" size={40} color="#b0cca5" />
      </TouchableOpacity>
      <Text className="text-l mb-4 text-grey text-center mt-5 h-5">
        {error || " "}
      </Text>
    </View>
  );
}
