import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box, Typography, Container, Paper, MenuItem, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../Api/ApiConfig';
import { toast } from 'react-toastify';

export default function EditPatientProfile() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const { patientId } = useParams();

    useEffect(() => {
        // Fetch the user details and pre-fill the form
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/patientUser/byPatientId/${patientId}`);
                const userData = response.data;

                // Set form data with API response
                setValue('firstName', userData.firstName);
                setValue('lastName', userData.lastName);
                setValue('mobileNumber', userData.mobileNumber);
                setValue('emailId', userData.emailId);
                setValue('address', userData.address);
                setValue('city', userData.city);
                setValue('pinCode', userData.pinCode);
                setValue('country', userData.country);
                setValue('gender', userData.gender);
                setValue('age', userData.age);
                setValue('dob', userData.dob);
                setValue('bloodGroup', userData.bloodGroup);
                setValue('height', userData.height);
                setValue('weight', userData.weight);
                setValue('maritalStatus', userData.maritalStatus);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [patientId, setValue]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                patientId,
                userId,
                ...data,
            };

            console.log(payload);

            const response = await axios.put(`${API_BASE_URL}/patientUser/byPatientId/${patientId}`, payload);
            if (response.status === 200 || response.status === 201) {
                toast.success('Profile updated successfully!');
                navigate('/layout/patient-profiles');
            }
        } catch (error) {
            toast.error('Something went wrong!');
            console.error('Error updating profile:', error);
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

                            <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
                                <strong>Edit Profile</strong>
                            </Typography>
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                                    Make sure the member's profile information is up-to-date to ensure accurate records and better treatment recommendations.
                                </Typography>
                            </Box>

                        </Grid>

                        {/* Form Section */}
                        <Grid item xs={12} md={7}>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            {...register('firstName', { required: 'First Name is required' })}
                                            error={!!errors.firstName}
                                            helperText={errors.firstName?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            {...register('lastName', { required: 'Last Name is required' })}
                                            error={!!errors.lastName}
                                            helperText={errors.lastName?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Mobile Number"
                                            {...register('mobileNumber', { required: 'Mobile Number is required' })}
                                            error={!!errors.mobileNumber}
                                            helperText={errors.mobileNumber?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            {...register('emailId', { required: 'Email is required' })}
                                            error={!!errors.emailId}
                                            helperText={errors.emailId?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            {...register('address', { required: 'Address is required' })}
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            {...register('city', { required: 'City is required' })}
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Pin Code"
                                            {...register('pinCode', { required: 'Pin Code is required' })}
                                            error={!!errors.pinCode}
                                            helperText={errors.pinCode?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            {...register('country', { required: 'Country is required' })}
                                            error={!!errors.country}
                                            helperText={errors.country?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Gender"
                                            select
                                            {...register('gender', { required: 'Gender is required' })}
                                            error={!!errors.gender}
                                            helperText={errors.gender?.message}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Age"
                                            {...register('age', { required: 'Age is required' })}
                                            error={!!errors.age}
                                            helperText={errors.age?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            {...register('dob', { required: 'Date of Birth is required' })}
                                            error={!!errors.dob}
                                            helperText={errors.dob?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Blood Group"
                                            {...register('bloodGroup', { required: 'Blood Group is required' })}
                                            error={!!errors.bloodGroup}
                                            helperText={errors.bloodGroup?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Height (cm)"
                                            {...register('height', { required: 'Height is required' })}
                                            error={!!errors.height}
                                            helperText={errors.height?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Weight (kg)"
                                            {...register('weight', { required: 'Weight is required' })}
                                            error={!!errors.weight}
                                            helperText={errors.weight?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Marital Status"
                                            select
                                            {...register('maritalStatus', { required: 'Marital Status is required' })}
                                            error={!!errors.maritalStatus}
                                            helperText={errors.maritalStatus?.message}
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Divorced">Divorced</MenuItem>
                                            <MenuItem value="Widowed">Widowed</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Update Profile
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}      