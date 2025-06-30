import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";
import { Link } from "expo-router";

export default function Index() {
  const { name, setName } = useUser();
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    if (nameInput.trim()) {
      await setName(nameInput.trim());
      setError("");
      router.navigate("/generator");
    } else {
      setError("Please enter your name");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/modal" style={styles.link}>
        Open modal
      </Link>
      <Text>What's your name?</Text>
      <TextInput
        style={styles.input}
        value={nameInput}
        onChangeText={setNameInput}
        autoFocus
      />
      <Button title="submit" onPress={handleLogin} />
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
