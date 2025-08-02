import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    Divider,
    ListItemIcon,
    ListItemText,
    Grid,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const rules = [
    "Must fill the attendance register with needed details before entering the gym.",
    "Don't wear outside shoes and chappal inside Gymnasium.",
    "Don't bring personal bag inside the gym. Either keep your bags outside or don't bring them.",
    "Bring essential accessories like Towel, Water bottle, Body Spray, lifting belt on your own.",
    "Keep private owings like Mobile Phones at your own safety.",
    "Don't workout shirtless.",
    "Wear proper clothes for exercising. Don't wear Jeans or Shirt while exercising.",
    "No kind of time pass activities in the gym which disturbs others’ exercising schedule will be tolerated.",
    "Don't overuse the treadmill. 10-15 minutes run before a break.",
    "Have proper guidance and spotter for doing weighted lifting exercises.",
    "Re-rack the dumbbells and weights properly after using.",
    "Use extra rubber tiles before hitting heavyweight lifts like Deadlift.",
    "Don't smash the weight too fast on the floor, considering the potential of cracking of floor.",
    "Taking any gym utility outside the gym without permission is punishable.",
    "Keep a friendly and helpful environment helping each other when needed, without any brawl inside gym.",
    "Careful use of items and machines are our own responsibility.",
    "Try to come on time as scheduled by 'The Director' and don't take over 1.5-2 hours inside the gym to reduce crowd.",
    "Maintain the decorum of this group.",
    "Please do not advertise events other than sports events in this group."
];

const Gear = () => {
    return (
        <Box sx={{ bgcolor: '#0e0e0e', minHeight: '100vh', py: 5, px: { xs: 2, sm: 4 } }}>
            <Typography variant="h3" color="#ffffff" gutterBottom textAlign="center" fontWeight="bold">
                IIEST Gym Info & Rules
            </Typography>

            {/* Timings Section */}
            <Card sx={{ bgcolor: '#1c1c1c', color: '#ffffff', mb: 5, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        <AccessTimeIcon sx={{ mr: 1, color: '#69b3f9' }} />
                        Gym Timings
                    </Typography>

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ color: '#69b3f9' }}>Weekdays (Monday To Saturday):</Typography>
                            <Typography> Morning: 7:00 AM - 9:00 AM (Boys)</Typography>
                            <Typography> Morning: 9:30 AM - 11:00 AM (Girls)</Typography>
                            <Typography> Evening: 5:00 PM - 6:00 PM (Girls)</Typography>
                            <Typography> Evening: 7:00 PM - 9:00 PM (Boys)</Typography>
                        </Grid>
                    </Grid>

                    <Typography mt={3} sx={{ color: '#bbdefb', fontStyle: 'italic' }}>
                        NOTE: Gym will be closed on college holidays.
                    </Typography>
                </CardContent>
            </Card>

            {/* Rules Section */}
            <Card sx={{ bgcolor: '#1c1c1c', color: '#ffffff', borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        <FitnessCenterIcon sx={{ mr: 1, color: '#69b3f9' }} />
                        Rules & Regulations
                    </Typography>

                    <List>
                        {rules.map((rule, index) => (
                            <Box key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemIcon sx={{ color: '#69b3f9', minWidth: 30 }}>
                                        ➤
                                    </ListItemIcon>
                                    <ListItemText primary={rule} />
                                </ListItem>
                                {index < rules.length - 1 && (
                                    <Divider sx={{ bgcolor: '#333' }} />
                                )}
                            </Box>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Gear;