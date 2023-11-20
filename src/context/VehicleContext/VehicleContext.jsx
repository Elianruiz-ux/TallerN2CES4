/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// VehicleContext.js
import { createContext, useState, useContext } from "react";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const addVehicle = (vehicle) => {
    console.log(vehicle);
    setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
  };

  const getVehicles = () => {
    // Puedes implementar lógica para obtener la lista de vehículos
    return vehicles;
  };

  return (
    <VehicleContext.Provider value={{ addVehicle, getVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error(
      "useVehicle debe ser utilizado dentro de un VehicleProvider"
    );
  }
  return context;
};
