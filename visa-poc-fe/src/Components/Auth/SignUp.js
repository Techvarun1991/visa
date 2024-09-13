import * as React from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';

export default function SignUp() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate();
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

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z]).{8,}$/;
    if (!value.match(passwordPattern)) {
      return 'Password must be at least 8 characters long and contain at least one special character and one uppercase letter';
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setFormData(data);
      setDialogOpen(true);
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  const handleRegister = async () => {
    try {
      const payload = {
        mobileNumber: formData.mobileNumber,
        emailId: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      };

      console.log('payload:', payload);
      const response = await axios.post(`${API_BASE_URL}/patientUser/saveUser`, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success('Your account has been created successfully! You can now log in with your credentials.');
        setTimeout(() => {
          navigate('/');
        }, 500);
      }

    } catch (error) {
      console.error('There was an error registering the account:', error);
      toast.error('There was an error creating your account. Please try again.');
    }
  };


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Full viewport height
          bgcolor: '#f5f5f5', // Optional background color
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 2 }}
                >
                  <strong>Sign Up</strong>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      {...register('firstName', {
                        required: 'First Name is required',
                        validate: validateNameField,
                        minLength: {
                          value: 3,
                          message: 'First Name must be at least 3 characters long.',
                        },
                      })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      {...register('lastName', {
                        required: 'Last Name is required',
                        validate: validateNameField,
                        minLength: {
                          value: 3,
                          message: 'Last Name must be at least 3 characters long.',
                        },
                      })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register('email', {
                        required: 'Email is required.',
                        validate: validateEmail,
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="mobileNumber"
                      label="Mobile Number"
                      type="tel"
                      id="mobileNumber"
                      autoComplete="mobilenumber"
                      {...register('mobileNumber', {
                        required: 'Mobile Number is Required',
                        pattern: {
                          value: /^[6789][0-9]{9}$/,
                          message: 'Please enter a valid mobile number',
                        },
                      })}
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register('password', {
                        required: 'Password is required.',
                        validate: validatePassword,
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirm-new-password"
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required.',
                        validate: (value) =>
                          value === getValues().password || 'Passwords do not match',
                      })}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>

      {/* Dialog for success message */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to register with this account details?
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
    </>
  );
}
