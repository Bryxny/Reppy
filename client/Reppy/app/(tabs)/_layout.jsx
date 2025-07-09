import { Tabs } from "expo-router";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          width: 350,
          transform: [{ translateX: 25 }],
          backgroundColor: "#29272f",
          borderRadius: 20,
          height: 60,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: 0,
          alignSelf: "center",
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={26} color="#a5aacc" />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <FontAwesome5 name="dumbbell" size={22} color="#b0cca5" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={22} color="#f9eaa1" />
          ),
        }}
      />
    </Tabs>
  );
}
