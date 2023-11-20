import { useState } from "react";
import { useUser } from "../../context/UserContext/UserContext";
import { Button, Container, FormControl, TextField } from "@mui/material";

function Login() {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Realiza la lógica de autenticación aquí
    login(username, password);
  };

  return (
    <Container maxWidth="sm" >
      <h2>Login</h2>
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          label="Correo"
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          label="Contraseña"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button variant="outlined" onClick={handleLogin}>
        Iniciar Sesión
      </Button>
    </Container>
  );
}

export default Login;
