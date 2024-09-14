import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, CssBaseline } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';

// const patientData = {
//   firstName: 'John',
//   lastName: 'Doe',
//   mobileNumber: '9876543210',
//   emailId: 'john.doe@example.com',
//   address: '123 Elm Street',
//   city: 'Los Angeles',
//   pinCode: '90001',
//   country: 'USA',
//   gender: 'Male',
//   age: 30,
//   dob: '1993-01-01',
//   bloodGroup: 'A+',
//   height: 175,
//   weight: 70,
//   maritalStatus: 'Single',
// };

export default function ViewPatientProfile() {

  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/patientUser/byPatientId/${patientId}`)
      .then((response) => {
        setPatientData(response.data)
      })
  }, [patientId])

  const handleEditClick = () => {
    navigate('/layout/patient-profile/edit');
  };

  const handleAddLifeStyleClick = () => {
    navigate(`/layout/lifestyle/${patientId}`);
  };

  const handleLifeStyle = () => {
    navigate(`/layout/lifestyle/view/${patientId}`);
  };

  const handleDeleteClick = () => {
    alert('Patient deleted successfully.');
    navigate('/layout/patient-profile');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3}>
          <Box sx={{ p: 3, bgcolor: '#e0f7fa' }}>
            <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
              Patient Profile Information
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid container item sm={12} xs={12}>
                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>First Name:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.firstName}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Last Name:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.lastName}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Mobile Number:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.mobileNumber}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Email:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.emailId}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Address:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.address}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>City:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.city}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Pin Code:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.pinCode}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Country:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.country}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Gender:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.gender}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Age:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.age}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Date of Birth:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.dob}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Blood Group:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.bloodGroup}</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Height (cm):</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.height} cm</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Weight (kg):</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.weight} kg</Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ mb: 1 }}>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2"><strong>Marital Status:</strong></Typography>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">{patientData.maritalStatus}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button variant="text" color="primary" onClick={handleAddLifeStyleClick}>
                Add Lifestyle Info
              </Button>
              <Button variant="text" color="secondary" onClick={handleLifeStyle}>
                View Lifestyle
              </Button>
              <Button disabled variant="text" color="error" onClick={handleDeleteClick}>
                <Button disabled variant="text" color="primary" onClick={handleEditClick}>
                  Edit
                </Button>
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
