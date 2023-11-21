import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      spacing={2}
      padding={2}
    >
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" component="div">
          Estado del Parqueadero
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Celdas Disponibles
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Celda</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingSpaces.map(
                (space, index) =>
                  !space.occupied && (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {`${space.type === "car" ? "Carro" : "Moto"} `}
                      </TableCell>
                      <TableCell align="center">
                        {`Celda ${space.number}`}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  Celdas Ocupadas
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Celda</TableCell>
                <TableCell align="center">Placa</TableCell>
                <TableCell align="center">Hora ingreso</TableCell>
                <TableCell align="center">Salida</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((space, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{`Celda ${space.number} - Ocupada`}</TableCell>
                  <TableCell align="center">
                    {`${space.type === "car" ? "carro" : "moto"}`}
                  </TableCell>
                  <TableCell align="center">{`${space.vehicle.licensePlate}`}</TableCell>
                  <TableCell align="center">{`${space.vehicle.entryTime}`}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleElimiarCelda(space.number)}
                    >
                      Dar salida
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default ParkingLot;
