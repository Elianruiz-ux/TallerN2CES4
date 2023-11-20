import { useState, useEffect } from "react";
import { useParking } from "../../context/ParkingContext/ParkingContext";
import { useVehicle } from "../../context/VehicleContext/VehicleContext";
import { toast } from "react-toastify";

function ParkingForm() {
  const {
    parkVehicle,
    getOccupiedSpaces,
    initializeParkingSpaces,
    getVehicleByLicensePlate,
    getParkingSpaces,
    getVehicleAll,
  } = useParking();
  const { getVehicles } = useVehicle();

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [typeSelected, setTypeSelected] = useState("");
  const [buscar, setBuscar] = useState("");
  const [parkingSpacesList, setParkingSpacesList] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const vehiclesAll = getVehicleAll();
  const vehicles = getVehicles();
  const occupiedSpaces = getOccupiedSpaces();
  const parkingSpaces = getParkingSpaces();

  useEffect(() => {
    const updatedSpacesList = initializeParkingSpaces(5, 5);
    setParkingSpacesList(updatedSpacesList);
  }, [initializeParkingSpaces]);

  const handleVehicleChange = (event) => {
    const value = event.target.value;
    const type = vehicles.find((e) => e.licensePlate == value);
    setTypeSelected(type.type);
    setSelectedVehicle(value);
  };

  const handleSpaceChange = (event) => {
    const selectedSpaceValue = event.target.value;
    if (occupiedSpaces.includes(selectedSpaceValue)) {
      toast.warning("Esta celda está ocupada. Selecciona otra celda.");
    } else {
      setSelectedSpace(selectedSpaceValue);
    }
  };

  const handleBuscar = (event) => {
    const buscado = event.target.value;
    setBuscar(buscado);
    const filteredVehicleOptions = vehicles
      .filter(
        (vehicle) =>
          vehicle.licensePlate.toLowerCase().includes(buscado.toLowerCase()) ||
          vehicle.idDocument.toLowerCase().includes(buscado.toLowerCase())
      )
      .map((vehicle) => vehicle.licensePlate);

    // Actualiza las opciones de vehículos según la búsqueda
    setSelectedVehicle("");
    setVehicleOptions(filteredVehicleOptions);
  };

  const handleParkVehicle = () => {
    // Realiza las validaciones necesarias antes de registrar el ingreso al parqueadero
    if (!selectedVehicle || !selectedSpace) {
      toast.warning("Selecciona un vehículo y una celda");
      return;
    }
    // Lógica para registrar el ingreso al parqueadero
    const spaceNumber = parseInt(selectedSpace, 10);

    // El vigilante ha ingresado un número de placa
    const vehicleInfo = getVehicleByLicensePlate(
      selectedVehicle,
      vehicles,
      spaceNumber
    );

    const validarsiYaExiste = vehiclesAll.map((i) => i.vehicle.licensePlate);

    if (vehicleInfo && validarsiYaExiste.includes(selectedVehicle) != true) {
      parkVehicle(spaceNumber, selectedVehicle, vehicleInfo.type);
      toast.success("Vehiculo registrado en celda.");
      // Eliminar la celda ocupada de parkingSpacesList
      const updatedSpacesList = parkingSpacesList.filter(
        (space) => space !== spaceNumber
      );
      setParkingSpacesList(updatedSpacesList);

      // Limpiar los campos después de registrar el ingreso
      setSelectedVehicle("");
      setSelectedSpace("");
    } else {
      toast.error("Este vehiculo ya esta registrado en una celda");
    }
  };

  return (
    <div>
      <h2>Registrar Ingreso al Parqueadero</h2>
      <div>
        <div>
          <label htmlFor="Buscar">Buscar por placa o número de documento</label>
          <input
            id="Buscar"
            type="text"
            value={buscar}
            onChange={handleBuscar}
          />
        </div>
      </div>
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
          {vehicleOptions.map((vehicle, index) => (
            <option key={index} value={vehicle}>
              {vehicle}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="space">Selecciona una celda:</label>

        <select id="space" value={selectedSpace} onChange={handleSpaceChange}>
          <option value="" disabled>
            Selecciona una celda
          </option>
          {parkingSpaces.map((space, index) => {
            if (!space.occupied) {
              // Verificar el tipo de vehículo seleccionado
              if (typeSelected === "moto" && space.type === "moto") {
                return (
                  <option key={index} value={space.number}>
                    {`Moto - Celda ${space.number}`}
                  </option>
                );
              } else if (typeSelected === "car" && space.type === "car") {
                return (
                  <option key={index} value={space.number}>
                    {`Carro - Celda ${space.number}`}
                  </option>
                );
              }
            }
            return null; // No mostrar celdas ocupadas
          })}
        </select>
      </div>
      <button onClick={handleParkVehicle}>Registrar Ingreso</button>
    </div>
  );
}

export default ParkingForm;
