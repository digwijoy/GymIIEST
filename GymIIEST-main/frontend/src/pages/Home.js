import React, { useState } from 'react';
import {
    Typography,
    Box,
    Snackbar,
    IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Assuming this path is correct

const Home = () => {
    const navigate = useNavigate();

    const [logoutOpen, setLogoutOpen] = useState(false);

    // Profile section removed as per requirements

    const handleLogout = () => {
        setLogoutOpen(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const cards = [
        { title: 'BMI Calculator', description: 'Check your Body Mass Index for a healthier life.', imageUrl: 'bmi.jpeg', route: '/bmi' },
        { title: 'Fitness Planner', description: 'Personalized diet and workout plans just for you.', imageUrl: 'ai4.jpeg', route: '/fitness-planner' },
        { title: 'Gym Rules & Timings', description: 'Know the guidelines and schedule to make your workouts safe and efficient.', imageUrl: 'workout.jpg', route: '/gym-rules' },
        { title: 'Exercise Predictor', description: 'Making health easy, one day at a time.', imageUrl: 'thumb__5_.jpg', route: '/exercise-predictor' },
        { title: 'AI Analyser', description: 'Analyse your exercise form with AI pose detection.', imageUrl: 'ai3.jpeg', route: '/ai-analyser' },
        { title: 'Gym Equipments', description: 'High-quality equipment for your fitness journey.', imageUrl: 'ai1.jpg', route: '/equipment' },
        { title: 'Slot Booking', description: 'Book your personal training sessions with ease.', imageUrl: 'ai2.jpeg', route: '/dashboard' },
        { title: 'Exercise Recommendation', description: 'Get AI-powered workouts tailored to you.', imageUrl: 'ai5.jpeg', route: '/exercise-recommendation' },
    ];

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                src="/bg-video.mp4"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -2
                }}
            />

            {/* Dark overlay to blend with UI */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: -1
                }}
            />

            {/* Main Content */}
            <Box
                sx={{
                    color: '#fff',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    padding: { xs: '1rem', md: '2rem' },
                    gap: { xs: '2rem', md: '2rem' },
                    justifyContent: 'center', // Center content horizontally
                    alignItems: 'center',     // Center content vertically
                    minHeight: 'calc(100vh - 64px)' // Adjust based on header height
                }}
            >
                {/* Profile section has been removed from here */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)' // Added 3 columns for larger screens
                            },
                            gap: '1.5rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: '1200px', // Limit max width
                            width: '100%' // Ensure it takes full width within its container
                        }}
                    >
                        {cards.map((card, idx) => (
                            <ProductCard
                                key={idx}
                                title={card.title}
                                description={card.description}
                                imageUrl={card.imageUrl}
                                onNext={() => navigate(card.route)}
                                glassmorphic
                            />
                        ))}
                    </Box>
                </motion.div>
            </Box>

            <Snackbar
                open={logoutOpen}
                autoHideDuration={2000}
                onClose={() => setLogoutOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#1f1f1f',
                        color: '#0ce600',
                        border: '1px solid #0ce600',
                        borderRadius: '6px',
                        padding: '10px 20px',
                        boxShadow: 5,
                        minWidth: '300px'
                    }}
                >
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    <Typography sx={{ flex: 1 }}>Logout Successful!</Typography>
                    <IconButton size="small" onClick={() => setLogoutOpen(false)}>
                        <CloseIcon sx={{ color: '#0ce600' }} />
                    </IconButton>
                </Box>
            </Snackbar>
        </Box>
    );
};

export default Home;