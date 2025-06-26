import { useState } from "react";
import { Text, View, Button } from "react-native";

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
    <View>
      {Object.entries(dayLabels).map(([day, label]) => {
        return (
          <View key={day}>
            <Text>{label}</Text>
            <Button
              onPress={() => toggleDay(day)}
              title={daysOfWeek[day] ? "Selected" : "Select"}
            />
          </View>
        );
      })}
      <Button title="submit" onPress={handleDays} />
      {error && <Text>{error}</Text>}
    </View>
  );
}
