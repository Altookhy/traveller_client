import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../component/UserInfo';
import * as yup from 'yup';



const defaultTheme = createTheme();

export default function Roles() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email address').required('Email is required'),
    // Add more validation rules for other fields if needed
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://goldfish-app-x9ljm.ondigitalocean.app/users/getUser?userId=${userId}`);
      setUserData(response.data.user);
      console.log(response.data.user);

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateUserData = async (userId, updatedData) => {
    try {
      await axios.patch(`https://goldfish-app-x9ljm.ondigitalocean.app/users/updateUser?userId=${userId}`, updatedData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // const handleFormSubmit = (updatedData) => {
  //   updateUserData(userId, updatedData)
  //     .then(() => {
  //       navigate(`/adminPage`);
  //     })
  //     .catch(() => {
  //       alert('Error updating user');
  //     });
  // };

  const handleFormSubmit = async (updatedData) => {
    try {
      await validationSchema.validate(updatedData, { abortEarly: false });

      await updateUserData(userId, updatedData);

      navigate(`/adminPage`);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        // Set the validation errors in your form state or display them as needed
        console.log(validationErrors);
      } else {
        // Handle other errors
        console.error('Error updating user:', error);
        alert('Error updating user');
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Travellers Health Advisor
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Edit User
          </Typography>

          <React.Fragment>
            <UserInfo initialData={userData} onSubmit={handleFormSubmit} />
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}