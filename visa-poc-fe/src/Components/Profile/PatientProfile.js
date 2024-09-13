import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';

// Dummy data for patients
const patients = [
  {
    firstName: 'John',
    lastName: 'Doe',
    mobileNumber: '9876543210',
    emailId: 'john.doe@example.com',
    address: '123 Elm Street',
    city: 'Los Angeles',
    pinCode: '90001',
    country: 'USA',
    gender: 'Male',
    age: 30,
    dob: '1993-01-01',
    bloodGroup: 'A+',
    height: 175,
    weight: 70,
    maritalStatus: 'Single',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    mobileNumber: '8765432109',
    emailId: 'jane.smith@example.com',
    address: '456 Oak Street',
    city: 'New York',
    pinCode: '10001',
    country: 'USA',
    gender: 'Female',
    age: 28,
    dob: '1995-02-15',
    bloodGroup: 'B+',
    height: 165,
    weight: 60,
    maritalStatus: 'Married',
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    mobileNumber: '7654321098',
    emailId: 'michael.johnson@example.com',
    address: '789 Pine Street',
    city: 'Chicago',
    pinCode: '60601',
    country: 'USA',
    gender: 'Male',
    age: 40,
    dob: '1984-06-10',
    bloodGroup: 'O+',
    height: 180,
    weight: 85,
    maritalStatus: 'Married',
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    mobileNumber: '6543210987',
    emailId: 'emily.davis@example.com',
    address: '101 Maple Avenue',
    city: 'San Francisco',
    pinCode: '94102',
    country: 'USA',
    gender: 'Female',
    age: 35,
    dob: '1989-03-25',
    bloodGroup: 'AB+',
    height: 160,
    weight: 55,
    maritalStatus: 'Single',
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
    mobileNumber: '5432109876',
    emailId: 'david.wilson@example.com',
    address: '202 Cedar Road',
    city: 'Houston',
    pinCode: '77001',
    country: 'USA',
    gender: 'Male',
    age: 45,
    dob: '1978-11-15',
    bloodGroup: 'B-',
    height: 185,
    weight: 90,
    maritalStatus: 'Divorced',
  },
];


export default function PatientProfile() {

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/patientUser/allProfileByuserId/${userId}`)
      .then((response) => {
        setPatientData(response.data)
      })
  }, [userId])

  const handleSearchFilter = (event) => {
    console.log(event.target.value);
  }

  const handleViewClick = (patient) => {
    navigate(`/layout/patient-profile/view/${patient.patientId}`);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        flexDirection: 'column',
      }}
    >
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        {/* Header Section */}
        <Box sx={{ p: 3, bgcolor: '#e0f7fa', mb: 3 }}>
          <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            <strong> Registered Patients</strong>
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            The list of registered patients. Use the search bar below to quickly find specific patient.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Patients</Typography>
                <Typography variant="h6">{patients.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Average Age</Typography>
                <Typography variant="h6">
                  {Math.round(patientData.reduce((sum, p) => sum + p.age, 0) / patientData.length)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Blood Group Distribution</Typography>
                <Typography variant="h6">
                  {/* Placeholder logic for distribution */}
                  A+: 1, B+: 1 {/* Add more blood group details dynamically if needed */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search/Filter Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <Button onClick={handleSearchFilter} variant="contained">Search</Button>
              ),
            }}
          />
        </Box>

        {/* Table Section */}
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientData.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold' }} >{patient.firstName}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.lastName}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.mobileNumber}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.emailId}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.city}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.age}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.gender}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{patient.bloodGroup}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      <Button color='primary' sx={{ fontWeight: 'bold' }} onClick={() => handleViewClick(patient)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}
