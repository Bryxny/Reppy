import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { formatTime } from "../utils/formatTime";

export default function Timer({ paused, elapsedRef }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev + 1;
        if (elapsedRef) elapsedRef.current = newTime;
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <View className="bg-black rounded-2xl p-2 px-3">
      <Text className="color-green text-xl font-bold">
        {formatTime(seconds)}
      </Text>
    </View>
  );
}
