import { useEffect, useState } from "react";
import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import { formatTime } from "../utils/formatTime";

export default function RestTimer({ seconds, onFinish, onSkip }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onFinish]);

  return (
    <Modal transparent={true} animationType="fade">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      >
        <View className="bg-white p-10 rounded-xl items-center justify-center w-72 h-48">
          <Text className="font-semibold mb-2 text-xl">Rest Timer</Text>
          <Text className="text-4xl font-bold text-blue mb-5 mt-5 leading-none">
            {formatTime(timeLeft)}
          </Text>
          <View className="flex-row gap-10">
            <TouchableOpacity onPress={() => setTimeLeft((prev) => prev + 30)}>
              <Text className="text-xl font-bold">+30s</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkip}>
              <Text className="text-xl font-bold">skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
