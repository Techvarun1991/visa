import React from 'react';
import { Container, Button, Paper, Typography, Grid, Divider } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const dummyLifestyleData = {
    smoke: 'Occasionally',
    alcohol: 'Yes',
    exercise: 'Regular',
    foodPreferences: 'Vegetarian',
    occupation: 'Employed'
};

const dummyMedicalHistoryData = {
    allergies: 'None',
    currentMedication: 'None',
    pastMedication: 'Aspirin',
    chronicDiseases: 'None',
    injuries: 'Fractured arm in 2018',
    surgeries: 'Appendectomy in 2015'
};

export default function ViewingPage() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        console.log("Edit")
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
            <Paper sx={{ p: 3 }}>
                {/* <Typography component="h1" variant="h4" mb={3}>
                    <strong>Patient Information</strong>
                </Typography> */}

                <Typography component="h1" variant="h5" mb={2}>
                    <strong>Lifestyle Information</strong>
                </Typography>
                <Grid padding={2} container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Smoking Habits:</strong> {dummyLifestyleData.smoke}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Alcohol Consumption:</strong> {dummyLifestyleData.alcohol}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Exercise Routine:</strong> {dummyLifestyleData.exercise}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Food Preferences:</strong> {dummyLifestyleData.foodPreferences}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography><strong>Occupation:</strong> {dummyLifestyleData.occupation}</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography component="h1" variant="h5" mb={2}>
                    <strong>Medical History</strong>
                </Typography>
                <Grid padding={2} container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Allergies:</strong> {dummyMedicalHistoryData.allergies}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Current Medication:</strong> {dummyMedicalHistoryData.currentMedication}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Past Medication:</strong> {dummyMedicalHistoryData.pastMedication}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Chronic Diseases:</strong> {dummyMedicalHistoryData.chronicDiseases}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Injuries:</strong> {dummyMedicalHistoryData.injuries}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Surgeries:</strong> {dummyMedicalHistoryData.surgeries}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item sm={12} sx={{ mt: 3, p: 3, display: 'flex', justifyContent: 'end' }}>
                        <Button
                            disabled
                            size="medium"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit()}
                        >
                            Edit
                        </Button>
                        <Button
                            size="medium"
                            startIcon={<ReplyIcon />}
                            onClick={() => handleGoBack()}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Paper>


        </Container>
    );
}
