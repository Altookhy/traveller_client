import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import axios from 'axios';

const theme = createTheme();

export default function SignUp() {
  const [wantsVerified, setWantsVerified] = useState(false);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const RegisterSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Must be a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      username: values.username,
      wantsVerified: wantsVerified,
    };
  
    try {
      await axios.post('https://goldfish-app-x9ljm.ondigitalocean.app/users/signup', user);
      navigate(`/signin`);
    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error submitting form:', error.message);
      setServerError(error.response?.data?.message || error.message);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form noValidate>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="apply"
                        id="apply"
                        onChange={(e) => setWantsVerified(e.target.checked)}
                      />
                    }
                    label="Apply for verified user"
                  />

                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                  </Button>
                  {serverError && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                      {serverError}
                    </Typography>
                  )}
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link href="/SignIn" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
