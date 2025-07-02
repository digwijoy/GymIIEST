import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const FitnessPlanner = () => {
    const [form, setForm] = useState({
        height: '',
        weight: '',
        gender: '',
        goal: '',
        activityLevel: '',
        diet: '',
        allergens: '',
        cuisine: ''
    });

    const [weeklyMeals, setWeeklyMeals] = useState(null);
    const [nutrition, setNutrition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setNutrition(null);
        setWeeklyMeals(null);

        try {
            // --- STEP 1: Request to ML Backend ---
            const res = await fetch('http://127.0.0.1:8080/api/predict-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    height: parseFloat(form.height),
                    weight: parseFloat(form.weight)
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to generate plan from ML backend');
            }

            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setNutrition(data.calculated_nutrition);
                setWeeklyMeals(data.recommended_meals);

                // --- STEP 2: Save data to MERN Backend ---
                try {
                    const saveRes = await fetch('http://localhost:8080/api/plans/save-plan', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            // Send all original form data
                            height: parseFloat(form.height),
                            weight: parseFloat(form.weight),
                            gender: form.gender,
                            goal: form.goal,
                            activityLevel: form.activityLevel,
                            diet: form.diet,
                            cuisine: form.cuisine,
                            allergens: form.allergens,
                            // Send ML-generated data with keys matching ML backend's output (often preferred for consistency)
                            calculated_nutrition: data.calculated_nutrition, // Corrected key
                            recommended_meals: data.recommended_meals      // Corrected key
                        }),
                    });

                    if (!saveRes.ok) {
                        const saveErrorData = await saveRes.json();
                        console.error("Error saving plan to MERN backend:", saveErrorData.message || 'Unknown error');
                        // You can set an error state here if you want to notify the user about save failure
                        // setError("Plan generated but failed to save to your personal history.");
                    } else {
                        console.log("Plan successfully saved to MERN backend!");
                    }
                } catch (saveErr) {
                    console.error("Network error while saving plan to MERN backend:", saveErr);
                    // setError("Plan generated but encountered network error saving to history.");
                }
            }
        } catch (err) {
            console.error("Error during plan generation:", err);
            setError(err.message || "Something went wrong while generating your plan.");
        } finally {
            setLoading(false);
        }
    };

    const cuisines = [
        "North Indian",
        "South Indian",
        "Chinese",
        "Mediterranean",
        "Continental/Western",
        "Asian (Thai/Japanese)",
        "Fusion/Modern"
    ];

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
                        color: '#2196f3',
                        letterSpacing: 1,
                        textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
                    }}
                >
                    Fitness & Diet Planner
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="height"
                                label="Height (cm)"
                                type="number"
                                required
                                fullWidth
                                value={form.height}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="weight"
                                label="Weight (kg)"
                                type="number"
                                required
                                fullWidth
                                value={form.weight}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="gender"
                                select
                                label="Gender"
                                fullWidth
                                required
                                value={form.gender}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="goal"
                                select
                                label="Fitness Goal"
                                fullWidth
                                required
                                value={form.goal}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            >
                                <MenuItem value="lose">Lose Weight</MenuItem>
                                <MenuItem value="gain">Gain Weight</MenuItem>
                                <MenuItem value="maintain">Maintain</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="activityLevel"
                                select
                                label="Activity Level"
                                fullWidth
                                required
                                value={form.activityLevel}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            >
                                <MenuItem value="sedentary">Sedentary</MenuItem>
                                <MenuItem value="moderate">Moderate</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="diet"
                                select
                                label="Diet Preference"
                                fullWidth
                                required
                                value={form.diet}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            >
                                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                                <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
                                <MenuItem value="vegan">Vegan</MenuItem>
                                <MenuItem value="keto">Keto</MenuItem>
                                <MenuItem value="gluten-free">Gluten-Free</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="cuisine"
                                select
                                label="Cuisine Preference"
                                fullWidth
                                required
                                value={form.cuisine}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            >
                                {cuisines.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="allergens"
                                label="Allergens (e.g. nuts, soy)"
                                fullWidth
                                value={form.allergens}
                                onChange={handleChange}
                                variant="filled"
                                sx={textFieldDarkStyles}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: '#1976d2',
                                boxShadow: '0 0 10px #2196f3',
                            },
                        }}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate 7-Day Meal Plan"}
                    </Button>
                </form>
            </Paper>

            {error && (
                <Typography color="error" sx={{ mt: 3 }}>
                    {error}
                </Typography>
            )}

            {nutrition && (
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
                                color: '#fff',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Nutrition Summary
                        </Typography>
                        <Divider sx={{ mb: 2, borderColor: '#555' }} />

                        <Grid container spacing={2}>
                            {Object.entries(nutrition).map(([key, value]) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            px: 2,
                                            py: 1,
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            borderRadius: '20px',
                                            fontWeight: 500,
                                            fontSize: '0.95rem',
                                            textAlign: 'center',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                            minWidth: '120px',
                                        }}
                                    >
                                        {`${formatKey(key)}: ${value}`}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </motion.div>
            )}

            {weeklyMeals && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 2,
                            background: '#2c2c2c',
                            color: '#fff',
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
                            Your 7-Day Meal Plan
                        </Typography>

                        <Divider sx={{ mb: 2, borderColor: '#555' }} />

                        {Object.entries(weeklyMeals).map(([day, meals]) => (
                            <Accordion
                                key={day}
                                sx={{
                                    backgroundColor: '#1e1e1e',
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
                                        {day}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        borderRadius: 1,
                                        p: 2,
                                    }}
                                >
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ color: '#7dcfff', fontWeight: 'bold' }}>
                                                        Meal Type
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#7dcfff', fontWeight: 'bold' }}>
                                                        Food
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#7dcfff', fontWeight: 'bold' }}>
                                                        Cuisine
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#7dcfff', fontWeight: 'bold' }}>
                                                        Calories
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#7dcfff', fontWeight: 'bold' }}>
                                                        Ingredients
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.entries(meals).map(([mealType, meal]) => (
                                                    <TableRow key={mealType}>
                                                        <TableCell sx={{ color: '#ffffff' }}>{mealType}</TableCell>
                                                        <TableCell sx={{ color: '#ffffff' }}>{meal.food_name}</TableCell>
                                                        <TableCell sx={{ color: '#ffffff' }}>{meal.cuisine}</TableCell>
                                                        <TableCell sx={{ color: '#ffffff' }}>{meal.calories}</TableCell>
                                                        <TableCell sx={{ color: '#ffffff' }}>{meal.ingredients}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Paper>
                </motion.div>
            )}
        </Box>
    );
};
// Dark TextField Styles
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
        borderBottomColor: '#2196f3',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#2196f3',
    },
};

const formatKey = (key) => {
    return key
        .replace(/content$/i, '')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};

export default FitnessPlanner;