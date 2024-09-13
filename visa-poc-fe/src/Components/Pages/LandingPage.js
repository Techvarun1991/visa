import React from 'react';
import { Typography, Box, Container, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  const handleFamilyMember = () => {
    navigate('/layout/add-profile');
  }

  const handleViewProfile = () => {
    navigate('/layout/patient-profiles');
  }

  const handleUpdateLifestyle = () => {
    navigate('/layout/lifestyle');
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: 'center',
          padding: '40px 0',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        }}
      >
        {/* Title Section */}
        <Typography variant="h3" gutterBottom>
          <strong>Welcome to Your Health Dashboard</strong>
        </Typography>

        {/* Introductory Text */}
        <Typography variant="body1" color="textSecondary" paragraph>
          Manage your family’s health profiles with ease. Keep track of important medical records, 
          lifestyle habits, and stay informed with your personalized health dashboard.
        </Typography>

        {/* CTA Buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button onClick={handleFamilyMember} variant="contained" color="primary" size="large">
              Add Family Member
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleViewProfile} variant="outlined" color="primary" size="large">
              View Profiles
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleUpdateLifestyle} variant="outlined" color="secondary" size="large">
              Update Lifestyle
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Benefits Section */}
      <Box mt={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Use Our Application?
        </Typography>
        <Grid mt={3}  container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Easy Family Management
              </Typography>
              <Typography variant="body2">
                Quickly add, update, and manage your family’s health profiles, all in one place.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Lifestyle Tracking
              </Typography>
              <Typography variant="body2">
                Keep track of important lifestyle habits such as smoking, drinking, and medical conditions.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Secure & Private
              </Typography>
              <Typography variant="body2">
                Your data is encrypted and safe. Only you have control over your family's health information.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Features Section */}
      <Box mt={6} mb={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid mt={3}  container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Centralized Dashboard
            </Typography>
            <Typography variant="body1" paragraph>
              Get an overview of your entire family’s health in one place. The dashboard is your one-stop 
              solution to monitor health progress and upcoming appointments.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Comprehensive Health Profiles
            </Typography>
            <Typography variant="body1" paragraph>
              Each family member’s profile contains medical history, lifestyle habits, and contact information, 
              making it easy for you to manage and update health data.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginTop: '40px' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Have questions? Reach out to us at:
            </Typography>
            <Typography variant="body2">
              Email: support@healthdashboard.com
            </Typography>
            <Typography variant="body2">
              Phone: +123 456 7890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2">
              Stay connected through our social media channels for updates.
            </Typography>
            <Typography variant="body2">
              Twitter | Facebook | Instagram
            </Typography>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
};

export default LandingPage;
