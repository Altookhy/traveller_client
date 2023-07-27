import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from 'react';

export default function UserInfo({ initialData, onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [wantsVerified, setWantsVerified] = useState('');

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setUsername(initialData.username);
      setEmail(initialData.email);
      setRole(initialData.role);
      setWantsVerified(initialData.wantsVerified);
    }
  }, [initialData])

  const handleSubmit = () => {
    onSubmit({
      firstName,
      lastName,
      username,
      email,
      role,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            variant="standard"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="wantsVerified"
            name="wantsVerified"
            label="Wants Verified"
            fullWidth
            variant="standard"
            value={wantsVerified}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="mod">Mod</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} sx={{ mt: 3, ml: 1, backgroundColor: 'black', color: 'white' }}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}