import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Box from '@mui/material/Box';

export default function Borders() {
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    axios.get('https://goldfish-app-x9ljm.ondigitalocean.app/diseases/getDiseases')
      .then(response => {
        const data = response.data;
        let countries = {};
        let totalCases = 0;

        data.forEach(disease => {
          if (!countries[disease.country]) {
            countries[disease.country] = disease.cases;
          } else {
            countries[disease.country] += disease.cases;
          }
          totalCases += disease.cases;
        });

        const averageCases = totalCases / Object.keys(countries).length;

        let borders = [];

        for (const country in countries) {
          let status;
          const cases = countries[country];

          if (cases > averageCases * 2) {
            status = 'Extreme Danger';
          } else if (cases > averageCases * 1.5) {
            status = 'High Danger';
          } else if (cases > averageCases) {
            status = 'Moderate';
          } else if (cases > averageCases * 0.5) {
            status = 'Low Danger';
          } else {
            status = 'Safe';
          }

          borders.push({ country, cases, status });
        }

        setBorders(borders);
      })
      .catch(error => {
        console.error("Error fetching diseases", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>borders status</Title>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Country Name</TableCell>
            <TableCell>Total Cases</TableCell>
            <TableCell>Border Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {borders.map((border, index) => (
            <TableRow key={index}>
              <TableCell>{border.country}</TableCell>
              <TableCell>{border.cases}</TableCell>
              <TableCell>{border.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
