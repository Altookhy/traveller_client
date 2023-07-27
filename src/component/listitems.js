import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';


export const mainListItems = (
  <React.Fragment>

    
    <ListItemButton onClick={()=> window.location.assign("/dashboard")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
      
    </ListItemButton>

    
    <ListItemButton onClick={()=> window.location.assign("/diseases")}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>

  </React.Fragment>
);

