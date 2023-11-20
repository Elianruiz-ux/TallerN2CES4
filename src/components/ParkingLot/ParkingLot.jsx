import { useParking } from "../../context/ParkingContext/ParkingContext";

function ParkingLot() {
  const { getParkingSpaces, getVehicleAll, leaveParkingSpace } = useParking();


  const parkingSpaces = getParkingSpaces();
  const vehicles = getVehicleAll();

  const handleElimiarCelda = (e) => {
    const space = e;
    leaveParkingSpace(space);
  };


  return (
    <div>
      <h2>Estado del Parqueadero</h2>
      <div>
        <h3>Celdas Disponibles:</h3>
        <ul>
          {parkingSpaces.map(
            (space, index) =>
              !space.occupied && (
                <li key={index}>
                  {`${space.type === "car" ? "Carro" : "Moto"} - Celda ${
                    space.number
                  }`}
                </li>
              )
          )}
        </ul>
      </div>
      <div>
        <h3>Celdas Ocupadas:</h3>
        <ul>
          {vehicles.map((space, index) => (
            <li key={index}>
              {`Celda ${space.number} - Ocupada, vehiculo: ${
                space.type === "car" ? "carro" : "moto"
              }, placa: ${space.vehicle.licensePlate}, hora ingreso: ${
                space.vehicle.entryTime
              }`}
              <button onClick={() => handleElimiarCelda(space.number)}>
                Dar salida
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ParkingLot;
