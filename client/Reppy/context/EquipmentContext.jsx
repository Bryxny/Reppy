import { createContext, useState, useContext } from "react";

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  return (
    <EquipmentContext.Provider
      value={{ selectedEquipment, setSelectedEquipment }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => useContext(EquipmentContext);
