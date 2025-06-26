import { useState } from "react";
import { Text, View, Button } from "react-native";
import DayPicker from "../components/DayPicker";
import WorkoutSummary from "../components/WorkoutSummary";

const equipmentOptions = [
  "gym",
  "bodyweight",
  "dumbbells",
  "barbell",
  "resistance Bands",
  "pull-up bar",
];

export default function Generator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");
  const [equipment, setEquipment] = useState([]);

  const toggleEquipment = (item) => {
    setEquipment((prev) => {
      if (prev.includes(item)) {
        return prev.filter((e) => e !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {stepIndex === 0 && (
        <View>
          <Text>Select which days you'd like to workout</Text>
          <DayPicker setDays={setDays} setStepIndex={setStepIndex} />
          {error && <Text>{error}</Text>}
        </View>
      )}
      {stepIndex === 1 && (
        <View>
          <Text>Select which equipment you have access to</Text>
          {equipmentOptions.map((item) => {
            return (
              <View key={item}>
                <Text>{item}</Text>
                <Button
                  onPress={() => toggleEquipment(item)}
                  title={equipment.includes(item) ? "Selected" : "Select"}
                />
              </View>
            );
          })}
          <Button
            title="submit"
            onPress={() => {
              if (equipment.length > 0) {
                setStepIndex(2);
              } else {
                setError("Please select one");
              }
            }}
          />
          {error && <Text>{error}</Text>}
        </View>
      )}
      {stepIndex === 2 && (
        <View>
          <Text>
            Here's your personalised workout, select a day to edit the exercises
          </Text>
          <WorkoutSummary days={days} equipment={equipment} />
          <Button
            title="save and continue"
            onPress={() => {
              "navigation placeholder";
            }}
          />
        </View>
      )}
    </View>
  );
}
