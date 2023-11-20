import ParkingForm from "../../components/ParkingForm/ParkingForm";
import ParkingLot from "../../components/ParkingLot/ParkingLot";
import VehicleForm from "../../components/VehicleForm/VehicleForm";

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Mostrar el formulario de registro de vehículos */}
      <VehicleForm />

      {/* Mostrar el formulario de ingreso al parqueadero */}
      <ParkingForm />

      {/* Mostrar la visualización del estado del parqueadero */}
      <ParkingLot />
    </div>
  );
}

export default DashboardPage;
