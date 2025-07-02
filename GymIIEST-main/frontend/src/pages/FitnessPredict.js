import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    CircularProgress,
    Paper,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import axios from 'axios';

const FitnessPredict = () => {
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        age: '',
        gender: '',
        goal: '',
        intensity: '',
    });

    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState(null);

    const goals = ['Weight Loss', 'Muscle Gain', 'Maintenance'];
    const intensities = ['Low', 'Medium', 'High'];
    const genders = ['Male', 'Female'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const missing = Object.entries(formData).filter(([key, value]) => value === '');
        if (missing.length > 0) {
            setError('Please fill out all fields before submitting.');
            return;
        }

        setLoading(true);
        setError(null);
        setRecommendations(null);

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/api/recommend-plan',
                formData
            );

            setRecommendations(response.data);

            await axios.post('http://localhost:8080/api/fitness-recommendations/save', {
                ...formData,
                recommendationResult: response.data,
            });

        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
            <Paper
                elevation={10}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #292929, #1f1f1f)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        mb: 3,
                        color: '#f3f3f3',
                        letterSpacing: 1,
                        textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
                    }}
                >
                    Fitness Exercise Recommendation
                </Typography>

                <Grid container spacing={3}>
                    {/* Height */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="height"
                            label="Height (cm)"
                            type="number"
                            required
                            fullWidth
                            value={formData.height}
                            onChange={handleChange}
                            variant="filled"
                            sx={textFieldDarkStyles}
                        />
                    </Grid>

                    {/* Weight */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="weight"
                            label="Weight (kg)"
                            type="number"
                            required
                            fullWidth
                            value={formData.weight}
                            onChange={handleChange}
                            variant="filled"
                            sx={textFieldDarkStyles}
                        />
                    </Grid>

                    {/* Age */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="age"
                            label="Age"
                            type="number"
                            required
                            fullWidth
                            value={formData.age}
                            onChange={handleChange}
                            variant="filled"
                            sx={textFieldDarkStyles}
                        />
                    </Grid>

                    {/* Gender */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="gender"
                            label="Gender"
                            select
                            required
                            fullWidth
                            value={formData.gender}
                            onChange={handleChange}
                            variant="filled"
                            sx={{
                                ...textFieldDarkStyles,
                                minWidth: 200,
                            }}
                        >
                            {genders.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Goal */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="goal"
                            label="Goal"
                            select
                            required
                            fullWidth
                            value={formData.goal}
                            onChange={handleChange}
                            variant="filled"
                            sx={{
                                ...textFieldDarkStyles,
                                minWidth: 200,
                            }}
                        >
                            {goals.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Intensity */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="intensity"
                            label="Intensity"
                            select
                            required
                            fullWidth
                            value={formData.intensity}
                            onChange={handleChange}
                            variant="filled"
                            sx={{
                                ...textFieldDarkStyles,
                                minWidth: 200,
                            }}
                        >
                            {intensities.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>


                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontWeight: 'bold',
                        bgcolor: '#444',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#555',
                            boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                        },
                    }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Exercise Recommendations'}
                </Button>
            </Paper>

            {error && (
                <Typography color="error" sx={{ mt: 3 }}>
                    {error}
                </Typography>
            )}

            {recommendations && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 2,
                            background: '#1c1c1c',
                            color: '#fff',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                color: '#7dcfff',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Your BMI Category: {recommendations.BMI_Category}
                        </Typography>

                        <Divider sx={{ mb: 3, borderColor: '#555' }} />

                        {Object.entries(recommendations.Recommendations).map(([bodyPart, exercises]) => (
                            <Accordion
                                key={bodyPart}
                                sx={{
                                    backgroundColor: '#2a2a2a',
                                    color: '#ffffff',
                                    borderRadius: 2,
                                    mb: 1,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                    '&:before': { display: 'none' },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#7dcfff' }} />}
                                >
                                    <Typography
                                        sx={{
                                            color: '#7dcfff',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {bodyPart}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails
                                    sx={{
                                        backgroundColor: '#333333',
                                        borderRadius: 1,
                                        p: 2,
                                    }}
                                >
                                    {exercises.map((exercise, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {exercise.Exercise}
                                            </Typography>
                                            <Typography variant="body2">
                                                Equipment: {exercise.Equipment}
                                            </Typography>
                                            <Typography variant="body2">
                                                Intensity: {exercise.Intensity}
                                            </Typography>
                                            <Typography variant="body2">
                                                Reps: {exercise.Reps} | Sets: {exercise.Sets}
                                            </Typography>
                                            <Typography variant="body2">
                                                Calories Burned (30 min): {exercise.Calories_Burned_30min}
                                            </Typography>
                                            <Typography variant="body2">
                                                Muscle Gain (kg/month): {exercise.MuscleGain_kg_month}
                                            </Typography>
                                            <Divider sx={{ my: 1, borderColor: '#555' }} />
                                        </Box>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Paper>
                </motion.div>
            )}
        </Box>
    );
};

const textFieldDarkStyles = {
    backgroundColor: '#333',
    '& .MuiFilledInput-root': {
        backgroundColor: '#333',
        color: '#fff',
    },
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& .MuiInputLabel-root': {
        color: '#aaa',
    },
    '& .MuiSelect-icon': {
        color: '#fff',
    },
    '& .MuiFilledInput-underline:before': {
        borderBottomColor: '#555',
    },
    '& .MuiFilledInput-underline:hover:before': {
        borderBottomColor: '#aaa',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#7dcfff',
    },
};

export default FitnessPredict;
