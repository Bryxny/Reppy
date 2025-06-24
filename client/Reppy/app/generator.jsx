import { useState } from "react";
import { Text, View } from "react-native";

export default function Generator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [days, setDays] = useState([]);
  const [equipment, setEquipment] = useState([]);

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
        </View>
      )}
    </View>
  );
}
