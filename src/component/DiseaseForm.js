import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useEffect } from 'react';

const validationSchema = yup.object({
  vaccine: yup.string().required('Vaccine is required'),
  cases: yup.number().required('Cases is required').min(0, 'Cases must be a positive number or zero').integer('Cases must be an integer'),
});

export default function DiseaseForm({ initialData, onSubmit }) {
  const [disease, setdisease] = useState('');
  const [country, setcountry] = useState('');

  const formik = useFormik({
    initialValues: {
      vaccine: '',
      cases: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({
        disease,
        country,
        vaccine: values.vaccine,
        cases: values.cases,
      });
    },
  });

  useEffect(() => {
    if (initialData) {
      setdisease(initialData.disease.disease);
      setcountry(initialData.disease.country);
      formik.setFieldValue('vaccine', initialData.disease.vaccine);
      formik.setFieldValue('cases', initialData.disease.cases);
    }
  }, [initialData])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Disease info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="disease"
            name="disease"
            label="Disease Name"
            fullWidth
            variant="standard"
            value={disease}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="country"
            fullWidth
            variant="standard"
            value={country}
            disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="vaccine"
            name="vaccine"
            label="Vaccine"
            fullWidth
            variant="standard"
            value={formik.values.vaccine}
            onChange={formik.handleChange}
            error={formik.touched.vaccine && Boolean(formik.errors.vaccine)}
            helperText={formik.touched.vaccine && formik.errors.vaccine}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="cases"
            name="cases"
            label="Cases"
            fullWidth
            variant="standard"
            value={formik.values.cases}
            onChange={formik.handleChange}
            error={formik.touched.cases && Boolean(formik.errors.cases)}
            helperText={formik.touched.cases && formik.errors.cases}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={formik.handleSubmit} sx={{ mt: 3, ml: 1, backgroundColor: 'black', color: 'white' }}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
