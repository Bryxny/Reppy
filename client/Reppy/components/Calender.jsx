import { Text, View, StyleSheet, Button } from "react-native";
import { useToday } from "../context/TodayContext";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
const dayLabels = {
  sunday: "S",
  monday: "M",
  tuesday: "T",
  wednesday: "W",
  thursday: "T",
  friday: "F",
  saturday: "S",
};

const bgColors = [
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
  "#a5aacc",
  "#b0cca5",
  "#f9eaa1",
  "#a5aacc",
];

export default function Calender() {
  const { todaysPlan, todaysKey, loading } = useToday();

  if (loading) return <Text>Loading...</Text>;
  return (
    <View
      className="flex-row justify-center gap-5 bg-black p-7 rounded-3xl"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      {Object.entries(dayLabels).map(([day, label], i) => {
        return (
          <View key={day}>
            <Text className="text-3xl font-bold mb-3 text-grey text-center">
              {label}
            </Text>

            <FontAwesome
              name={day === todaysKey ? "circle" : "circle-o"}
              size={28}
              color={bgColors[i]}
            />
          </View>
        );
      })}
    </View>
  );
}
