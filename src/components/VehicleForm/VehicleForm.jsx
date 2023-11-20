import { useState } from "react";
import { useVehicle } from "../../context/VehicleContext/VehicleContext";

function VehicleForm() {
  const { addVehicle } = useVehicle();

  const [vehicleType, setVehicleType] = useState("car");
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [cylinder, setCylinder] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };
  const handleIdDocumentChange = (event) => {
    setIdDocument(event.target.value);
  };

  const handleLicensePlateChange = (event) => {
    setLicensePlate(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleCylinderChange = (event) => {
    setCylinder(event.target.value);
  };

  const handleAddVehicle = () => {
    // Realiza las validaciones necesarias antes de agregar el vehículo
    if (
      !licensePlate ||
      !brand ||
      (!cylinder && vehicleType === "moto") ||
      (!model && vehicleType === "car")
    ) {
      // Puedes manejar el error de validación aquí
      return;
    }

    // Agregar el vehículo utilizando la función del contexto
    addVehicle({
      namePropetario: name,
      idDocument: idDocument,
      type: vehicleType,
      licensePlate,
      model,
      brand,
      cylinder: vehicleType === "moto" ? cylinder : undefined,
    });

    // Limpiar los campos después de agregar el vehículo
    setVehicleType("car");
    setLicensePlate("");
    setModel("");
    setBrand("");
    setCylinder("");
  };

  return (
    <div>
      <h2>Registrar Vehículo</h2>
      <div>
        <label htmlFor="vehicleType">Tipo de Vehículo:</label>
        <select
          id="vehicleType"
          value={vehicleType}
          onChange={handleVehicleTypeChange}
        >
          <option value="car">Carro</option>
          <option value="moto">Moto</option>
        </select>
      </div>
      <div>
        <label htmlFor="licensePlate">Número de Placa:</label>
        <input
          type="text"
          id="licensePlate"
          value={licensePlate}
          onChange={handleLicensePlateChange}
        />
      </div>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="idDocument">Número de documento:</label>
        <input
          type="number"
          id="idDocument"
          value={idDocument}
          onChange={handleIdDocumentChange}
        />
      </div>

      <div>
        <label htmlFor="brand">Marca:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={handleBrandChange}
        />
      </div>
      {vehicleType === "moto" ? (
        <div>
          <label htmlFor="cylinder">Cilindraje:</label>
          <input
            type="text"
            id="cylinder"
            value={cylinder}
            onChange={handleCylinderChange}
          />
        </div>
      ) : (
        <div>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={handleModelChange}
            disabled={vehicleType === "moto"}
          />
        </div>
      )}
      <button onClick={handleAddVehicle}>Registrar Vehículo</button>
    </div>
  );
}

export default VehicleForm;
