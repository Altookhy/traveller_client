import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Title from './Title';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import TextField from '@mui/material/TextField';

export default function DiseasesData() {
  const [diseases, setDiseases] = React.useState([]);
  const [countryFilter, setCountryFilter] = React.useState(''); 
  const navigate = useNavigate();

  const { authData } = React.useContext(AuthContext);
  const role = authData?.user?.role || 'normal';

  const filteredDiseases = diseases.filter(disease => {
    return disease.country.toLowerCase().includes(countryFilter.toLowerCase());
  });

  React.useEffect(() => {
    axios.get('https://goldfish-app-x9ljm.ondigitalocean.app/diseases/getDiseases')
      .then(response => setDiseases(response.data))
      .catch(console.error);
  }, []);

  const handleAddClick = () => {
    navigate('/AddDisease')
  }

  const handleDeleteClick = (diseaseId) => {
    axios.post(`https://goldfish-app-x9ljm.ondigitalocean.app/diseases/removeDisease?diseaseId=${diseaseId}`)
      .then(() => setDiseases(diseases.filter(disease => disease.id !== diseaseId)))
      .catch(console.error);
  }

  return (
    <React.Fragment>
      {['admin', 'mod'].includes(role) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Disease list</Title>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder='search by country'
            defaultValue="Normal"
            variant="filled"
            value={countryFilter} // Set the value of the TextField to the countryFilter state
            onChange={(e) => setCountryFilter(e.target.value)} // Update the countryFilter state when the input changes
          />
          <Button variant="outlined" color="primary" onClick={handleAddClick}>
            Add
          </Button>
        </Box>
      )}
      {['normal'].includes(role) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Disease list</Title>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder='search by country'
            defaultValue="Normal"
            variant="filled"
            value={countryFilter} // Set the value of the TextField to the countryFilter state
            onChange={(e) => setCountryFilter(e.target.value)} // Update the countryFilter state when the input changes
          />
        </Box>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Vaccine</TableCell>
            <TableCell>Cases</TableCell>
            {['admin', 'mod'].includes(role) && (
              <TableCell>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredDiseases.map((disease) => (
            <TableRow key={disease.id}>
              <TableCell>{disease.id}</TableCell>
              <TableCell>{disease.disease}</TableCell>
              <TableCell>{disease.country}</TableCell>
              <TableCell>{disease.vaccine}</TableCell>
              <TableCell>{disease.cases}</TableCell>
              <TableCell>
                {['admin', 'mod'].includes(role) && (
                  <>
                    <Button variant="outlined" component={Link} to={`/Disease?diseaseId=${disease.id}`}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(disease.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
