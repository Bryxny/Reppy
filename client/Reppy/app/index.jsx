import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";
import "../global.css";
import logo from "../assets/images/ReppyGraphic.webp";
import background from "../assets/images/ReppyGraphic2.webp";
import { AntDesign } from "@expo/vector-icons";

export default function Index() {
  const { name, setName, hasInitialized } = useUser();
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (hasInitialized && name && name.length > 0) {
      router.replace("/home");
    }
  }, [name, hasInitialized]);

  async function handleLogin() {
    if (nameInput.trim()) {
      await setName(nameInput.trim());
      setError("");
      router.navigate("/generator");
    } else {
      setError("Please enter your name to continue");
    }
  }

  if (step === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-black gap-10">
        <Image source={logo} className="w-60 h-96" />
        <Text className="text-xl font-bold mb-4 text-grey text-center">
          Ready to move?{"\n"}Let's build your perfect workout
        </Text>
        <TouchableOpacity onPress={() => setStep(1)}>
          <AntDesign name="rightcircle" size={40} color="#a5aacc" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center flex-col justify-center bg-black gap-4 ">
      <Text className="text-2xl font-bold mb-4 text-grey text-center tracking-widest mt-30">
        What's your name?
      </Text>
      <View className="w-60 h-16 justify-center items-center relative">
        <Image
          source={background}
          className="absolute h-36 w-80 -left-14"
          style={{ top: -20 }}
          resizeMode="contain"
        />
        <TextInput
          value={nameInput}
          onChangeText={setNameInput}
          autoFocus
          className="bg-grey rounded-full py-3 px-3 w-60 text-black font-bold text-center"
        />
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <AntDesign name="rightcircle" size={40} color="#a5aacc" />
      </TouchableOpacity>
      <Text className="text-l mb-4 text-grey text-center mt-5 h-5">
        {error || " "}
      </Text>
    </View>
  );
}
