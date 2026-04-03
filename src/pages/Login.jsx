import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  //const { login } = useContext(AuthContext);
  const { login } = useAuth();
    const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const res = await loginUser(data);
    console.log("API Response:", res);
    if (res.accessToken) {
      localStorage.setItem("token", res.accessToken);
      login(data.username);
      alert("Login successful");
      navigate("/");
      } else {
      alert("Invalid credentials");
       }

  } catch (error) {
    console.log(error);
    alert("Login failed");
  }
  console.log("Form Data:", data);
};

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username")}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;