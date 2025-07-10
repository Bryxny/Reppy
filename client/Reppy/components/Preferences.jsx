import React from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

export default function PreferenceModal({ visible, onClose, onDeleteData }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      >
        <View className="bg-white p-10 rounded-xl items-center justify-center w-72 h-48">
          <TouchableOpacity
            onPress={() => {
              router.push("/generator");
              onClose();
            }}
            className="mb-5"
          >
            <Text className="text-black text-lg font-bold">Reset Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Delete All Data?", "This action cannot be undone.", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: onDeleteData,
                },
              ]);
            }}
            className="mb-4"
          >
            <Text className="text-red-600 text-lg font-bold">
              Delete User Data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} className="mt-5">
            <Text className="text-black text-lg font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
