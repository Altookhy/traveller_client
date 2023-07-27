import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const RegisterSchema = yup.object().shape({
    country: yup.string().required('Country is required'),
    disease: yup.string().required('Diseaseis required'),
    vaccine: yup.string().required('Vaccine is required'),
    cases: yup.number().required('Cases is required').min(0, 'Cases must be a positive number or zero').integer('Cases must be an integer'),

  });

  const handleSubmit = async (values) => {
    const newDisease = {
      country: values.country,
      disease: values.disease,
      cases: values.cases,
      vaccine: values.vaccine,
    };
  
    try {
      await axios.post('https://goldfish-app-x9ljm.ondigitalocean.app/diseases/addDisease', newDisease);
      navigate(`/diseases`);
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
          <Typography component="h1" variant="h5">
            Add Disease
          </Typography>

          <Formik
            initialValues={{
              country: '',
              disease: '',
              vaccine: '',
              cases: '',
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
                        name="country"
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        id="disease"
                        label="Disease Name"
                        name="disease"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        id="vaccine"
                        label="Vaccine"
                        name="vaccine"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        required
                        fullWidth
                        id="cases"
                        label="Cases"
                        name="cases"
                        autoComplete="cases"
                      />
                    </Grid>
                  </Grid>

                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Add
                  </Button>
                  {serverError && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                      {serverError}
                    </Typography>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
