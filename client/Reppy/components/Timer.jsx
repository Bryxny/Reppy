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
    <View>
      <Text>Elapsed: {formatTime(seconds)}</Text>
    </View>
  );
}
