import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const equipmentData = [
    {
        name: 'Chest Press',
        imageUrl: '/images/chestpress.jpg',
        path: '/equipment/chest-press'
    },
    {
        name: 'Dual Function',
        imageUrl: '/images/dual_function.jpg',
        path: '/equipment/dual-function'
    },
    {
        name: 'Gym Benches',
        imageUrl: '/images/gymbenches.jpg',
        path: '/equipment/gym-benches'
    },
    {
        name: 'Treadmill',
        imageUrl: '/images/treadmill.jpg',
        path: '/equipment/treadmill'
    },
    {
        name: 'Dumbbells',
        imageUrl: '/images/dumbbells.jpg',
        path: '/equipment/dumbbells'
    },
    {
        name: 'Exercise Bike',
        imageUrl: '/images/exercisebike.jpg',
        path: '/equipment/exercise-bike'
    }
];

const GymEquipments = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
                py: 5,
                px: 3
            }}
        >
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}
            >
                Gym Equipments
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {equipmentData.map((equip, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#121212',
                                color: 'white',
                                borderRadius: 3,
                                boxShadow: 5,
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                            onClick={() => navigate(equip.path)}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={equip.imageUrl}
                                    alt={equip.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" align="center">
                                        {equip.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default GymEquipments;