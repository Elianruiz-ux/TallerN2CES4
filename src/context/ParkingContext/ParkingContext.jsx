/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// ParkingContext.js
import { createContext, useState, useContext } from "react";

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [occupiedSpaces, setOccupiedSpaces] = useState([]);

  const initializeParkingSpaces = (carSpaces, motoSpaces) => {
    // Inicializa las celdas del parqueadero para carros y motos
    const carSpacesArray = Array(carSpaces)
      .fill(null)
      .map((_, index) => ({ type: "car", number: index + 1, occupied: false }));
    const motoSpacesArray = Array(motoSpaces)
      .fill(null)
      .map((_, index) => ({
        type: "moto",
        number: index + 1,
        occupied: false,
      }));

    setParkingSpaces([...carSpacesArray, ...motoSpacesArray]);
  };

  const getParkingSpaces = () => {
    // Obtiene la información de todas las celdas del parqueadero
    return parkingSpaces;
  };

  const getOccupiedSpaces = () => {
    // Obtiene la información de las celdas ocupadas
    return occupiedSpaces;
  };

  const parkVehicle = (spaceNumber) => {
    // Estaciona un vehículo en la celda especificada
    // Actualiza los estados según sea necesario
    const updatedSpaces = parkingSpaces.map((space) => {
      if (space.number === spaceNumber) {
        return { ...space, occupied: true };
      }
      return space;
    });

    setParkingSpaces(updatedSpaces);
    setOccupiedSpaces([...occupiedSpaces, spaceNumber]);
  };

  const leaveParkingSpace = (spaceNumber) => {
    // Libera la celda del parqueadero ocupada por un vehículo
    // Actualiza los estados según sea necesario
    const updatedSpaces = parkingSpaces.map((space) => {
      if (space.number === spaceNumber) {
        return { ...space, occupied: false };
      }
      return space;
    });

    setParkingSpaces(updatedSpaces);
    setOccupiedSpaces(occupiedSpaces.filter((space) => space !== spaceNumber));
  };

  return (
    <ParkingContext.Provider
      value={{
        initializeParkingSpaces,
        getParkingSpaces,
        getOccupiedSpaces,
        parkVehicle,
        leaveParkingSpace,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error(
      "useParking debe ser utilizado dentro de un ParkingProvider"
    );
  }
  return context;
};
