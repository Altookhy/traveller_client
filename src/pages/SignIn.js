import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { AuthContext } from '../AuthContext';
import withNoAuth from './withNoAuth';
import { useContext } from 'react';

const theme = createTheme();

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
  
    try {
      const response = await axios.post('https://goldfish-app-x9ljm.ondigitalocean.app/users/signin', credentials);
      setAuthData({
        token: response.data.token,
        user: {
            id: response.data.user.id,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
            password: response.data.user.password,
            role: response.data.user.role,
        },
    });
      if (response.status === 200) {   // Correct way to check the response status
        navigate(`/DashBoard`);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            backgroundImage: 'url(https://directorsblog.nih.gov/wp-content/uploads/2020/07/RNA-Virus.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={1} sm={2} md={3} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // onClick={()=> window.location.assign("/dashboard")}

                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color='primary'
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="http://localhost:3000/ForgotPass" variant="body2">

                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="../SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default withNoAuth(SignIn);
