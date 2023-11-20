import { useState } from "react";
import { useParking } from "../../context/ParkingContext/ParkingContext";
import { useVehicle } from "../../context/VehicleContext/VehicleContext";

function ParkingForm() {
  const { parkVehicle } = useParking();
  const { getVehicles } = useVehicle();

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [error, setError] = useState("");

  const vehicles = getVehicles();

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    setError("");
  };

  const handleSpaceChange = (event) => {
    setSelectedSpace(event.target.value);
    setError("");
  };

  const handleParkVehicle = () => {
    // Realiza las validaciones necesarias antes de registrar el ingreso al parqueadero
    if (!selectedVehicle || !selectedSpace) {
      setError("Selecciona un vehículo y una celda");
      return;
    }

    // Lógica para registrar el ingreso al parqueadero
    parkVehicle(selectedSpace);

    // Limpiar los campos después de registrar el ingreso
    setSelectedVehicle("");
    setSelectedSpace("");
    setError("");
  };

  return (
    <div>
      <h2>Registrar Ingreso al Parqueadero</h2>
      <div>
        <label htmlFor="vehicle">Selecciona un vehículo:</label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={handleVehicleChange}
        >
          <option value="" disabled>
            Selecciona un vehículo
          </option>
          {vehicles.map((vehicle, index) => (
            <option key={index} value={vehicle.licensePlate}>
              {vehicle.licensePlate}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="space">Selecciona una celda:</label>
        {/* Lógica para mostrar las celdas disponibles */}
        <select id="space" value={selectedSpace} onChange={handleSpaceChange}>
          <option value="" disabled>
            Selecciona una celda
          </option>
          {/* Mapear y mostrar las celdas disponibles */}
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleParkVehicle}>Registrar Ingreso</button>
    </div>
  );
}

export default ParkingForm;
