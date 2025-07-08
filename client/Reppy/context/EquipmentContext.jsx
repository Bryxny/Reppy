import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EquipmentContext = createContext();
const STORAGE_KEY_EQUIPMENT = "@selected_equipment";

export const EquipmentProvider = ({ children }) => {
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  useEffect(() => {
    async function loadEquipment() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY_EQUIPMENT);
        if (saved) {
          setSelectedEquipment(JSON.parse(saved));
        }
      } catch (e) {
        console.log("Failed to load selected equipment from storage", e);
      }
    }
    loadEquipment();
  }, []);

  useEffect(() => {
    async function saveEquipment() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY_EQUIPMENT,
          JSON.stringify(selectedEquipment)
        );
      } catch (e) {
        console.log("Failed to save selected equipment", e);
      }
    }
    saveEquipment();
  }, [selectedEquipment]);

  return (
    <EquipmentContext.Provider
      value={{ selectedEquipment, setSelectedEquipment }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => useContext(EquipmentContext);
