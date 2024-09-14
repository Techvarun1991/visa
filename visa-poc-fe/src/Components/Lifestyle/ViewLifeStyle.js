import React, { useEffect, useState } from 'react';
import { Container, Button, Paper, Typography, Grid, Divider } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Api/ApiConfig';

const ViewLifeStyle = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [lifeStyleData, setLifeStyleData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/lifeStyleAndHistory/lifeStyle/byPatientId/${patientId}`)
            .then((response) => {
                setLifeStyleData(response.data);
                setError(null); // Reset any previous errors
            }).catch((error) => {
                if (error.response && error.response.status === 404) {
                    setError("Lifestyle data not found. Please add lifestyle information.");
                } else {
                    setError("An error occurred while fetching lifestyle data.");
                }
                setLifeStyleData(null); // Clear data in case of error
            });
    }, [patientId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        console.log("Edit");
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography component="h1" variant="h5" mb={2}>
                    <strong>Lifestyle Information</strong>
                </Typography>

                {/* Check for error state and render the helper message */}
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
                            Click here to add lifestyle information
                        </RouterLink>
                    </>
                ) : (
                    lifeStyleData && (
                        <Grid padding={2} container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography><strong>Smoking Habits:</strong> {lifeStyleData.smoke}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography><strong>Alcohol Consumption:</strong> {lifeStyleData.alcohol}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography><strong>Exercise Routine:</strong> {lifeStyleData.exercise}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography><strong>Food Preferences:</strong> {lifeStyleData.foodPreferences}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography><strong>Occupation:</strong> {lifeStyleData.occupation}</Typography>
                            </Grid>
                        </Grid>
                    )
                )}

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2}>
                    <Grid item sm={12} sx={{ mt: 3, p: 3, display: 'flex', justifyContent: 'end' }}>
                        <Button
                            disabled={!lifeStyleData} // Disable edit if no data is available
                            size="medium"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            size="medium"
                            startIcon={<ReplyIcon />}
                            onClick={handleGoBack}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ViewLifeStyle;
