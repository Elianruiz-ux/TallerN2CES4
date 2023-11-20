import { useParking } from "../../context/ParkingContext/ParkingContext";

function ParkingLot() {
  const { getParkingSpaces, getOccupiedSpaces } = useParking();

  const parkingSpaces = getParkingSpaces();
  const occupiedSpaces = getOccupiedSpaces();

  return (
    <div>
      <h2>Estado del Parqueadero</h2>
      <div>
        <h3>Celdas Disponibles:</h3>
        <ul>
          {parkingSpaces.map(
            (space) =>
              !space.occupied && (
                <li key={space.number}>
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
          {occupiedSpaces.map((spaceNumber) => (
            <li key={spaceNumber}>{`Celda ${spaceNumber} - Ocupada`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ParkingLot;
