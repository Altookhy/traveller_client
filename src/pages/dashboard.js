import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import { VectorMap } from "react-jvectormap";


const theme = createTheme();
var mapData = {
  "US": 25270200,
  "CA": 20830860,
  "MX": 24636564,
  "BR": 27270240,
  "UK": 24452358,
  "FR": 30845136,
  "DE": 17371512,
  "IT": 28105629,
  "ES": 16768284,
  "RU": 21331149,
  "CN": 23874012,
  "IN": 19513581,
  "AU": 26077317,
  "ZA": 27359727,
  "EG": 14416818
};

export default function DashBoard() {
  const [countries, setCountries] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setAuthData } = useContext(AuthContext);


  function getCountryCode(country) {
    var countryCode = "";
    country = country.toLowerCase(); // Convert to lowercase for case-insensitive matching

    // Switch case statement
    switch (country) {
      case "united states":
        countryCode = "US";
        break;
      case "united kingdom":
        countryCode = "UK";
        break;
      case "canada":
        countryCode = "CA";
        break;
      case "australia":
        countryCode = "AU";
        break;
      case "germany":
        countryCode = "DE";
        break;
      case "france":
        countryCode = "FR";
        break;
      case "japan":
        countryCode = "JP";
        break;
      case "india":
        countryCode = "IN";
        break;
      case "china":
        countryCode = "CN";
        break;
      case "brazil":
        countryCode = "BR";
        break;
      case "mexico":
        countryCode = "MX";
        break;
      case "spain":
        countryCode = "ES";
        break;
      case "italy":
        countryCode = "IT";
        break;
      case "south africa":
        countryCode = "ZA";
        break;
      case "russia":
        countryCode = "RU";
        break;
      case "egypt":
        countryCode = "EG";
        break;
      case "argentina":
        countryCode = "AR";
        break;
      case "south korea":
        countryCode = "KR";
        break;
      case "sweden":
        countryCode = "SE";
        break;
      case "netherlands":
        countryCode = "NL";
        break;
      case "uk":
        countryCode = "UK";
        break;
      case "usa":
        countryCode = "US";
        break;
      // Add more cases for other countries as needed
      default:
        countryCode = null; // Default value is an empty string if not found
        break;
    }
    return countryCode;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setAuthData(null);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    (async () => {
      axios.get('https://goldfish-app-x9ljm.ondigitalocean.app/diseases/getDiseases')
        .then(response => {
          const data = response.data;
          let countryData = {};

          data.forEach(disease => {
            var countryCode = getCountryCode(disease.country);
            if (countryCode !== "") {
              if (!countryData[disease.country]) {
                countryData[disease.country] = {
                  diseases: [{ disease: disease.disease, cases: disease.cases }],
                  totalCases: disease.cases,
                };
              } else {
                countryData[disease.country].diseases.push({ disease: disease.disease, cases: disease.cases });
                countryData[disease.country].totalCases += disease.cases;
              }

              mapData[countryCode] = countryData[disease.country].totalCases;
            }
          });

          setCountries(countryData);
        })
        .catch(error => {
          console.error('Error fetching diseases:', error);
        });
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ position: 'absolute', left: '10px' }}>
            Travellers Health Advisor
          </Typography>
          <Typography variant="h6" color="inherit" noWrap sx={{ width: '100%', textAlign: 'center' }}>
            Stay safe, travel safe, and make memories that will last a lifetime
          </Typography>
          <IconButton sx={{ p: 0, position: 'absolute', right: '10px' }} onClick={handleClick}>
            <Avatar alt="L" src="./images/Traveller logo.png" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              DashBoard
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <Button onClick={() => window.location.assign("/diseases")} variant="contained">Diseases</Button>
              <Button onClick={() => window.location.assign("/Flights")} variant="outlined">Flights</Button>
            </Stack>
          </Container>
          <Container maxWidth="m">
            <div>
              <VectorMap
                map={"world_mill"}
                backgroundColor="transperant" //change it to ocean blue: #0077be
                zoomOnScroll={false}
                containerStyle={{
                  width: "100%",
                  height: "520px"
                }}
                containerClassName="map"
                regionStyle={{
                  initial: {
                    fill: "#e4e4e4",
                    "fill-opacity": 0.9,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 0
                  },
                  hover: {
                    "fill-opacity": 0.8,
                    cursor: "pointer"
                  },
                  selected: {
                    fill: "#2938bc" //color for the clicked country
                  },
                  selectedHover: {},
                }}
                regionsSelectable={true}
                series={{
                  regions: [
                    {
                      values: mapData, //this is your data
                      scale: ["#008000", "#FFFF00","#FF0000"], //your color game's here
                      normalizeFunction: "polynomial",
                      legend: {
                        vertical: true,
                        title: 'Cases'
                      }
                    }
                  ]
                }}
              />
            </div>
          </Container>
        </Box>
        <Container>
          {Object.entries(countries).map(([country, data]) => (
            <Card sx={{ minWidth: 275, mt: 2 }} key={country}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Cases: {data.totalCases}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Diseases:
                </Typography>
                {data.diseases.map((disease, index) => (
                  <Typography key={index} variant="body2">
                    {disease.disease}: {disease.cases} cases
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Container>

      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

      </Box>
    </ThemeProvider>
  );
}
