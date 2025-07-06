import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useToday } from "../context/TodayContext";
const dayLabels = {
  sunday: "S",
  monday: "M",
  tuesday: "T",
  wednesday: "W",
  thursday: "T",
  friday: "F",
  saturday: "S",
};
export default function Calender() {
  const { todaysPlan, todaysKey, loading } = useToday();

  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      {Object.entries(dayLabels).map(([day, label]) => {
        return (
          <View key={day}>
            <Text>{label}</Text>
            <View
              style={[
                styles.circle,
                day === todaysKey ? styles.circleActive : styles.circleInactive,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  circleActive: {
    backgroundColor: "#000",
  },
  circleInactive: {
    backgroundColor: "transparent",
  },
});
