import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const { setName, setWorkoutPlan, setStats } = useUser();
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared!");
      setName("");
      setWorkoutPlan([]);
      setStats({
        totalWorkouts: 0,
        totalTime: 0,
        totalSets: 0,
        totalVolume: 0,
        totalUpper: 0,
        totalLower: 0,
      });
      router.replace("/");
    } catch (e) {
      console.log("Failed to clear AsyncStorage", e);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the profile page</Text>
      <Button title="delete user data" onPress={clearStorage} />
    </View>
  );
}
