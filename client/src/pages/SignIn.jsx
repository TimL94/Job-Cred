import * as React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  CssBaseline,
  Avatar,
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  Link,
  
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BasicSelect from "../components/UserDropDown";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";


// uses the Auth file to sign in a user based on user type and creates a JWT token, also passes the user type into the token for displaying releant data
export default function SignIn() {
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const userType = data.get("userType");

    try {
      const { data: userData } = await login({
        variables: { email: email, password: password, userType: userType },
      });

      Auth.login(userData.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (

    <Container component="main" maxWidth="xs" sx={{mb:8}}>
      <CssBaseline />
      <Box
        sx={(theme) => ({
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: `2px solid ${theme.palette.primary.main}`,
          p: 10,
          boxShadow:`${theme.palette.primary.main} 0px 8px 24px`,
        })}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <BasicSelect name="userType" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>

              Don't have an account?
              <Link href="/register" variant="body2">
                {" Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
