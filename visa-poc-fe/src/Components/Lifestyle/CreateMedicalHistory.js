import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, TextField, Container, Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';
import { toast } from 'react-toastify';

export default function CreateMedicalHistory() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const userId = localStorage.getItem('userId');
    const { patientId } = useParams();
    const [formData, setFormData] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setFormData(data);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };


    const handleRegister = async () => {
        try {
            const payload = {
                userId: parseInt(userId), // Ensure it's an integer, though it might already be
                patientId: parseInt(patientId), // Convert patientId to an integer if needed
                allergies: formData.allergies,
                chronicDiseases: formData.chronicDiseases,
                currentMedication: formData.currentMedication,
                injuries: formData.injuries,
                pastMedication: formData.pastMedication,
                surgeries: formData.surgeries
            };

            console.log('payload:', payload);
            const response = await axios.post(`${API_BASE_URL}/lifeStyleAndHistory/MedicalHistory/add`, payload);
            if (response.status === 200 || response.status === 201) {
                toast.success('Medical History is created.');
                setTimeout(() => {
                    navigate(`/layout/patient-profile/view/${patientId}`);
                }, 500);
            }

        } catch (error) {
            if (error.response.status === 400) {
                toast.error('You have already added the Medical History, kindly check.');
                return;
            }
            console.error('There was an error registering the account:', error);
            toast.error('There was an error creating your account. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ p: 3, mt: 3 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Typography component="h1" variant="h5" mb={2}>
                        <strong>Medical History Information</strong>
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Allergies */}
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Allergies"
                                {...register('allergies')}
                                error={!!errors.allergies}
                                helperText={errors.allergies?.message}
                            />
                        </Grid>

                        {/* Current Medication */}
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Current Medication"
                                {...register('currentMedication')}
                                error={!!errors.currentMedication}
                                helperText={errors.currentMedication?.message}
                            />
                        </Grid>

                        {/* Past Medication */}
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Past Medication"
                                {...register('pastMedication')}
                                error={!!errors.pastMedication}
                                helperText={errors.pastMedication?.message}
                            />
                        </Grid>

                        {/* Chronic Diseases */}
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Chronic Diseases"
                                {...register('chronicDiseases')}
                                error={!!errors.chronicDiseases}
                                helperText={errors.chronicDiseases?.message}
                            />
                        </Grid>

                        {/* Injuries */}
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Injuries"
                                {...register('injuries')}
                                error={!!errors.injuries}
                                helperText={errors.injuries?.message}
                            />
                        </Grid>

                        {/* Surgeries */}
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Surgeries"
                                {...register('surgeries')}
                                error={!!errors.surgeries}
                                helperText={errors.surgeries?.message}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                        Submit
                    </Button>
                </Box>
            </Paper>

            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Registration</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to update the Lifestyle ?
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

        </Container>
    );
}
