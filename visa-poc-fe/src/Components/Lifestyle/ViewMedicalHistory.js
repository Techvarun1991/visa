import React, { useEffect, useState } from 'react';
import { Container, Button, Paper, Typography, Grid, Divider } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams,Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';


const dummyMedicalHistoryData = {
    allergies: 'None',
    currentMedication: 'None',
    pastMedication: 'Aspirin',
    chronicDiseases: 'None',
    injuries: 'Fractured arm in 2018',
    surgeries: 'Appendectomy in 2015'
};

export default function ViewMedicatlHistory() {

    const { patientId } = useParams();
    const navigate = useNavigate();
    const [medicalHistory, setMedicalHistoryData] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/lifeStyleAndHistory/MedicalHistory/byPatientId/${patientId}`)
            .then((response) => {
                console.log(response.data);
                setMedicalHistoryData(response.data);
            }).catch((error) => {
                if (error.response && error.response.status === 404) {
                    setError("Medical history data not found. Please add medical history information.");
                } else {
                    setError("An error occurred while fetching medical history data.");
                }
                setMedicalHistoryData(null);
            });
    }, [patientId])

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        console.log("Edit")
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography component="h1" variant="h5" mb={2}>
                    <strong>Medical History</strong>
                </Typography>
                {error ? (
                    <>
                        <Typography color="error" variant="body1" mb={3}>
                            {error}

                        </Typography>
                        <RouterLink
                            component={RouterLink}
                            to={`/layout/lifestyle/${patientId}`} // Redirect to add lifestyle page for the specific patient
                            variant="body2"
                            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            Click here to add medical history information
                        </RouterLink>
                    </>
                ) : (
                    <Grid padding={2} container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Allergies:</strong> {medicalHistory.allergies}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Current Medication:</strong> {medicalHistory.currentMedication}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Past Medication:</strong> {medicalHistory.pastMedication}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Chronic Diseases:</strong> {medicalHistory.chronicDiseases}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Injuries:</strong> {medicalHistory.injuries}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Surgeries:</strong> {medicalHistory.surgeries}</Typography>
                        </Grid>
                    </Grid>
                )}
                <Divider sx={{ my: 3 }} />

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
