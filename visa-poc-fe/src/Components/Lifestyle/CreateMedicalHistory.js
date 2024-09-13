import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, TextField, Container, Box, Typography, Paper } from '@mui/material';

export default function CreateMedicalHistory() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Add your logic for handling the form submission
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
        </Container>
    );
}
