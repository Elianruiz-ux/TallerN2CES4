import { useState } from "react";
import { useVehicle } from "../../context/VehicleContext/VehicleContext";
import { toast } from "react-toastify";

function VehicleForm() {
  const { addVehicle } = useVehicle();

  const [vehicleType, setVehicleType] = useState("car");
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("2000");
  const [brand, setBrand] = useState("honda");
  const [cylinder, setCylinder] = useState("0-100");
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
    const value = event.target.value;
    setLicensePlate(value);

    // Verificar el tipo de vehículo seleccionado
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
    if (
      !licensePlate ||
      !brand ||
      (!cylinder && vehicleType === "moto") ||
      (!model && vehicleType === "car") ||
      !idDocument ||
      !name
    ) {
      toast.warning("Rellena todos los campos");
    } else if (vehicleType == "moto") {
      // Para motos: 3 letras, 2 números y 1 letra
      const motoPlateRegex = /^[A-Z]{3}\d{2}[A-Z]$/;

      if (!motoPlateRegex.test(licensePlate.toUpperCase())) {
        toast.error("Número de placa de moto inválido (AAA12A)");
        return;
      }
    } else if (vehicleType == "car") {
      // Para carros: 3 letras y 3 números
      const carPlateRegex = /^[A-Z]{3}\d{3}$/;
      if (!carPlateRegex.test(licensePlate.toUpperCase())) {
        toast.error("Número de placa de carro inválido (AAA123)");
        return;
      }
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
    toast.success("Vehiculo registrado");

    // Limpiar los campos después de agregar el vehículo
    setVehicleType("car");
    setLicensePlate("");
    setName("");
    setIdDocument("");
    setModel("2000");
    setBrand("honda");
    setCylinder("0-100");
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
        <select id="brand" value={brand} onChange={handleBrandChange}>
          <option value="honda">Honda</option>
          <option value="bmw">BMW</option>
          <option value="suzuki">suzuki</option>
          <option value="ktm">ktm</option>
        </select>
      </div>

      {vehicleType === "moto" ? (
        <div>
          <label htmlFor="cylinder">Cilindraje:</label>
          <select
            id="cylinder"
            value={cylinder}
            onChange={handleCylinderChange}
          >
            <option value="0-100">0-100</option>
            <option value="101-200">101-200</option>
            <option value="201-300">201-300</option>
            <option value="301-400">301-400</option>
            <option value="+401">+401</option>
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="model">Modelo:</label>
          <select id="model" value={model} onChange={handleModelChange}>
            <option value="2000">2000</option>
            <option value="2001">2002</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2024">2024</option>
          </select>
        </div>
      )}
      <button onClick={handleAddVehicle}>Registrar Vehículo</button>
    </div>
  );
}

export default VehicleForm;
