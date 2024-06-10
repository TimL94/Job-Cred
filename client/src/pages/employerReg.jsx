import React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { ADD_EMPLOYER } from "../utils/mutations";

import Auth from "../utils/auth";

// handles creating of an employer model and creates a JWT token
const EmployerRegistration = () => {
  const [employer, setEmployer] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addEmployer, { error, data }] = useMutation(ADD_EMPLOYER);

  const handleChange = (e) => {
    setEmployer({
      ...employer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Employer Registered: ", employer);

    try {
      const { data } = await addEmployer({
        variables: { ...employer },
      });
      Auth.login(data.addEmployer.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container sx={{ mt: 14, p: 1 }} component="main" maxWidth="xs">
      <Typography
        sx={{
          p: 1,
          boxShadow: "#013e87 0px 8px 24px",
          border: "#013e87 2px solid",
          bgcolor: "#013e87",
          color: "#fff",
        }}
        align="center"
        component="h1"
        variant="h5"
      >
        Employers - Sign up Today!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={employer.username}
            onChange={handleChange}
          />
        </Box>
        <Box marginTop={1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={employer.email}
            onChange={handleChange}
          />
        </Box>
        <Box marginTop={1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={employer.password}
            onChange={handleChange}
          />
        </Box>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
      <Paper
        align="center"
        sx={{ mt: 5, mb: 3, bgcolor: "#f5f5f5", p: 1 }}
        elevation={20}
      >
        <Link color="#000" variant="h5" href="/register" underline="hover">
          {"Workers Sign Up Here"}
        </Link>
      </Paper>
    </Container>
  );
};

export default EmployerRegistration;
