import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
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
      <View style={styles.overlay}>
        <View style={styles.timerBox}>
          <Text>Rest Time</Text>
          <Text>{formatTime(timeLeft)}</Text>
          <Button
            title="+30s"
            onPress={() => {
              setTimeLeft((prev) => prev + 30);
            }}
          />
          <Button title="Skip Rest" onPress={onSkip} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  timerBox: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 15,
    alignItems: "center",
    elevation: 10,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  countdown: {
    fontSize: 48,
    fontWeight: "bold",
    color: "red",
  },
});
