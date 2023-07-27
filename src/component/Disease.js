import * as React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiseaseForm from './DiseaseForm'; // Assuming you have a DiseaseForm component

const defaultTheme = createTheme();

export default function Disease() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const diseaseId = params.get('diseaseId');
  const navigate = useNavigate();
  const [disease, setDisease] = React.useState(null);

  React.useEffect(() => {
    axios.get(`https://goldfish-app-x9ljm.ondigitalocean.app/diseases/getDisease?diseaseId=${diseaseId}`)
      .then(response => setDisease(response.data))
      .catch(console.error);
  }, [diseaseId]);

  const handleFormSubmit = (updatedData) => {
    axios.patch(`https://goldfish-app-x9ljm.ondigitalocean.app/diseases/updateDisease?diseaseId=${diseaseId}`, updatedData)
      .then(() => navigate('/diseases'))
      .catch(console.error);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Edit Diseases
          </Typography>
          {disease && <DiseaseForm initialData={disease} onSubmit={handleFormSubmit} />}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
