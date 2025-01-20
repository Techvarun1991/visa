import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RateReviewIcon from '@mui/icons-material/RateReview';
import EditIcon from '@mui/icons-material/Edit';
import API_BASE_URL from '../../Api/ApiConfig';
import { toast } from 'react-toastify';


export default function ViewPatientProfile() {

  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/patientUser/byPatientId/${patientId}`)
      .then((response) => {
        setPatientData(response.data)
      })
  }, [patientId])

  const handleEditClick = () => {
    navigate(`/layout/patient-profile/edit/${patientId}`);
  };

  const handleAddLifeStyleClick = () => {
    navigate(`/layout/lifestyle/${patientId}`);
  };

  const handleLifeStyle = () => {
    navigate(`/layout/lifestyle/view/${patientId}`);
  };

  const handleDialogClose = () => {
    setDeleteDialog(false);
  };


  const handleDeleteClick = () => {
    setDeleteDialog(true);
  };

  // const handleConfirmDeleteClick = async () => {
  //   try {
  //     // Make an axios DELETE request to the endpoint using patientId
  //     const response = await axios.delete(`${API_BASE_URL}/patientUser/byPatientId/${patientId}`);

  //     if (response.status === 200 || response.status === 204) {
  //       toast.success('Profile deleted successfully!');
  //       navigate('/layout/patient-profiles');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting profile:', error);
  //     toast.error('Failed to delete the profile. Please try again.');
  //   }
  // };


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      flexDirection: 'column',
    }}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              p: 3,
              bgcolor: '#e0f7fa',
              textAlign: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              <strong>
                Member's Profile Information
              </strong>
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Grid container spacing={2}>
              {/* Patient's Personal Info Section */}
              <Grid item xs={12} sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: 'First Name', value: patientData.firstName },
                    { label: 'Last Name', value: patientData.lastName },
                    { label: 'Mobile Number', value: patientData.mobileNumber },
                    { label: 'Email', value: patientData.emailId },
                    { label: 'Address', value: patientData.address },
                    { label: 'City', value: patientData.city },
                    { label: 'Pin Code', value: patientData.pinCode },
                    { label: 'Country', value: patientData.country },
                    { label: 'Gender', value: patientData.gender },
                    { label: 'Age', value: patientData.age },
                    { label: 'Date of Birth', value: patientData.dob },
                    { label: 'Blood Group', value: patientData.bloodGroup },
                    { label: 'Height (cm)', value: `${patientData.height} cm` },
                    { label: 'Weight (kg)', value: `${patientData.weight} kg` },
                    { label: 'Marital Status', value: patientData.maritalStatus },
                  ].map(({ label, value }, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                      <Typography variant="subtitle2">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 2 }}>
                  <Button startIcon={<AddBoxIcon />} color="primary" onClick={handleAddLifeStyleClick}>
                    Add Lifestyle Info
                  </Button>
                  <Button startIcon={<RateReviewIcon />} color="secondary" onClick={handleLifeStyle}>
                    View Lifestyle
                  </Button>
                  <Button
                    startIcon={<EditIcon />}
                    color="info"

                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      {/* <Dialog open={deleteDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this patient profile ?
          </Typography>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleDialogClose} color="primary" >
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteClick} color="error" autoFocus>
            Delete
          </Button>

        </DialogActions>
      </Dialog> */}

    </Box>
  );
}
