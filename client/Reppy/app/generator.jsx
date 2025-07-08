import { useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import DayPicker from "../components/DayPicker";
import WorkoutSummary from "../components/WorkoutSummary";
import { useEquipment } from "../context/EquipmentContext";

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
    <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
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
                    title={
                      selectedEquipment.includes(item) ? "Selected" : "Select"
                    }
                  />
                </View>
              );
            })}
            <Button
              title="submit"
              onPress={() => {
                if (selectedEquipment.length > 0) {
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
              Here's your personalised workout, select a day to edit the
              exercises
            </Text>
            <WorkoutSummary days={days} equipment={selectedEquipment} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
