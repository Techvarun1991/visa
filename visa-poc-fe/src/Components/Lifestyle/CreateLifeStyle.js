import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, TextField, Container, Box, Typography, Paper, MenuItem, DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../Api/ApiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
// import API_BASE_URL_LIFESTYLE from '../../Api/ApiConfigLifeStyle';

export default function CreateLifeStyle() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [smoke, setSmoke] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [exercise, setExercise] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [occupation, setOccupation] = useState('');
  const userId = localStorage.getItem('userId');
  const { patientId } = useParams();
  // Watch for changes
  const smokeWatch = watch('smoke', smoke);
  const alcoholWatch = watch('alcohol', alcohol);
  const exerciseWatch = watch('exercise', exercise);
  const foodPreferencesWatch = watch('foodPreferences', foodPreferences);
  const occupationWatch = watch('occupation', occupation);
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
        smoke: formData.smoke,
        alcohol: formData.alcohol,
        exercise: formData.exercise,
        foodPreferences: formData.foodPreferences,
        occupation: formData.occupation
      };

      console.log('payload:', payload);
      const response = await axios.post(`${API_BASE_URL}/lifeStyleAndHistory/lifeStyle`, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success('Lifestyle is created.');
        setTimeout(() => {
          navigate('/');
        }, 500);
      }

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        toast.error('You have already added the LifeStyle, kindly check.');
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
            <strong>Lifestyle Information</strong>
          </Typography>
          <Grid container spacing={2}>

            {/* Smoking Habits */}
            <Grid item xs={12}>
              <TextField
                select
                id="smoke"
                fullWidth
                value={smokeWatch}
                onChange={(e) => setSmoke(e.target.value)}
                label="Smoking Habits"
                {...register('smoke', { required: 'Smoking habits are required' })}
                error={!!errors.smoke}
                helperText={errors.smoke?.message}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Occasionally">Occasionally</MenuItem>
              </TextField>
            </Grid>

            {/* Alcohol Consumption */}
            <Grid item xs={12}>
              <TextField
                select
                id="alcohol"
                fullWidth
                value={alcoholWatch}
                onChange={(e) => setAlcohol(e.target.value)}
                label="Alcohol Consumption"
                {...register('alcohol', { required: 'Alcohol is required' })}
                error={!!errors.alcohol}
                helperText={errors.alcohol?.message}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Occasionally">Occasionally</MenuItem>
              </TextField>
            </Grid>

            {/* Exercise Routine */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                id="exerice"
                value={exerciseWatch}
                onChange={(e) => setExercise(e.target.value)}
                label="Exercise Routine"
                {...register('exercise', { required: 'Exercise are required' })}
                error={!!errors.exercise}
                helperText={errors.exercise?.message}
              >
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Occasional">Occasional</MenuItem>
                <MenuItem value="Never">Never</MenuItem>
              </TextField>
            </Grid>

            {/* Food Preferences */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                id="foodPreferences"
                value={foodPreferencesWatch}
                onChange={(e) => setFoodPreferences(e.target.value)}
                label="Food Preferences"
                {...register('foodPreferences', { required: 'Smoking habits are required' })}
                error={!!errors.foodPreferences}
                helperText={errors.foodPreferences?.message}
              >
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
            </Grid>

            {/* Occupation */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                id="occupation"
                value={occupationWatch}
                onChange={(e) => setOccupation(e.target.value)}
                label="Occupation"
                {...register('occupation', { required: 'Smoking habits are required' })}
                error={!!errors.occupation}
                helperText={errors.occupation?.message}
              >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
                <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </TextField>
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
