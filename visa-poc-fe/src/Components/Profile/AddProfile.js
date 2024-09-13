import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Grid, TextField, Typography, Button, Paper, CssBaseline, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';
import { toast } from 'react-toastify';

export default function AddProfile() {

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [gender, setGender] = useState('');
  const bloodGroupWatch = watch('bloodGroup', '');
  const genderWatch = watch('gender', '');
  const maritalStatusWatch = watch('maritalStatus', '');
  const [formData, setFormData] = React.useState(null);
  // State to control the dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const validateNameField = (value) => {
    const namePattern = /^[A-Za-z]+$/;
    if (!value.match(namePattern)) {
      return 'Only alphabets are allowed';
    }
    return true;
  };

  const validateEmail = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value.match(emailPattern)) {
      return 'Email is incorrect';
    }
    return true;
  };

  const validateMobileNumber = (value) => {
    const phonePattern = /^[6789][0-9]{9}$/;
    if (!value.match(phonePattern)) {
      return 'Please enter a valid mobile number';
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setFormData(data);
      setDialogOpen(true);
      // navigate('/layout/landingpage');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  const handleRegister = async () => {

    console.log('formdata:- ', formData);

    try {
      const payload = {
        userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        emailId: formData.emailId,
        address: formData.address,
        city: formData.city,
        pinCode: formData.pinCode,
        country: formData.country,
        gender: formData.gender,
        age: formData.age,
        dob: formData.dob,
        bloodGroup: formData.bloodGroup,
        height: formData.height,
        weight: formData.weight,
        maritalStatus: formData.maritalStatus,
      };

      console.log('payload:- ', payload);
      const response = await axios.post(`${API_BASE_URL}/patientUser/add`, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success('Your account has been created successfully!');
        setTimeout(() => {
          navigate('/layout/landingpage');
        }, 500);
      }

    } catch (error) {
      console.error('There was an error registering the account:', error);
      toast.error('There was an error creating your account. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Paper>
          <Grid container>
            {/* Left section with the text */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                bgcolor: '#e0f7fa',
                p: 3,
                m: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                <strong>Patient Profile Information</strong>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                Please provide accurate and up-to-date information to create your profile. This will help us offer you the best care and track your medical history effectively.
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center' }}>
                Your personal information is securely stored and will only be used for medical purposes. Make sure to fill out all required fields.
              </Typography>
            </Grid>

            {/* Divider line */}
            <Grid item xs={12} md={0.5}>
              <Box
                sx={{
                  height: '100%',
                  width: '1px',
                  bgcolor: 'white',
                  mx: 'auto', // centers the line
                }}
              />
            </Grid>

            {/* Right section with the form */}
            <Grid item xs={12} md={7}>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 1 }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                  Patient Profile
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      {...register('firstName', {
                        required: 'First Name is required',
                        validate: validateNameField,
                        minLength: {
                          value: 3,
                          message: 'First Name must be at least 3 characters long',
                        },
                      })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      {...register('lastName', {
                        required: 'Last Name is required',
                        validate: validateNameField,
                        minLength: {
                          value: 3,
                          message: 'Last Name must be at least 3 characters long',
                        },
                      })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="mobileNumber"
                      label="Mobile Number"
                      {...register('mobileNumber', {
                        required: 'Mobile Number is required',
                        validate: validateMobileNumber,
                      })}
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      {...register('emailId', {
                        required: 'Email is required',
                        validate: validateEmail,
                      })}
                      error={!!errors.emailId}
                      helperText={errors.emailId?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address"
                      {...register('address', { required: 'Address is required' })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="city"
                      label="City"
                      {...register('city', { required: 'City is required' })}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="pinCode"
                      label="Pin Code"
                      {...register('pinCode', { required: 'Pin Code is required' })}
                      error={!!errors.pinCode}
                      helperText={errors.pinCode?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="country"
                      label="Country"
                      {...register('country', { required: 'Country is required' })}
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      value={genderWatch}
                      onChange={(e) => setGender(e.target.value)}
                      id="gender"
                      label="Gender"
                      {...register('gender', { required: 'Gender is required' })}
                      error={!!errors.gender}
                      helperText={errors.gender?.message}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      type="number"
                      {...register('age', { required: 'Age is required' })}
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="dob"
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register('dob', { required: 'Date of Birth is required' })}
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      id="bloodGroup"
                      label="Blood Group"
                      value={bloodGroupWatch} // set value to control the TextField
                      onChange={(e) => setBloodGroup(e.target.value)} // update state on change
                      error={!!errors.bloodGroup}
                      helperText={errors.bloodGroup?.message}
                      {...register('bloodGroup', { required: 'Blood Group is required' })}
                    >
                      <MenuItem value=""><em>Select Blood Group</em></MenuItem>
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="height"
                      label="Height (cm)"
                      type="number"
                      {...register('height', { required: 'Height is required' })}
                      error={!!errors.height}
                      helperText={errors.height?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="weight"
                      label="Weight (kg)"
                      type="number"
                      {...register('weight', { required: 'Weight is required' })}
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      value={maritalStatusWatch}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                      id="maritalStatus"
                      label="Marital Status"
                      {...register('maritalStatus', { required: 'Marital Status is required' })}
                      error={!!errors.maritalStatus}
                      helperText={errors.maritalStatus?.message}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to register this patient profile ?
          </Typography>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary" autoFocus>
            Register
          </Button>

        </DialogActions>
      </Dialog>

    </Box>



  );
}  