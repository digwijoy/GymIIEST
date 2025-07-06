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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

// ----------------- ProductCard Component (V3) -----------------
// A more subtle and calming aesthetic with a new color scheme.

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProductCard = ({ title, description, imageUrl, onNext }) => {
    // New neutral dark background color for the card's text area.
    const cardBgColor = 'rgba(38, 38, 38, 1)';

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                scale: 1.03,
                // New subtle green glow on hover.
                boxShadow: '0px 15px 35px rgba(110, 231, 183, 0.15)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={onNext}
            style={{
                position: 'relative',
                cursor: 'pointer',
                height: '380px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 3,
                    color: '#EAEAEA',
                    // Gradient updated to use the new neutral dark background.
                    background: `linear-gradient(to top, ${cardBgColor} 30%, rgba(38, 38, 38, 0.7) 50%, transparent 80%)`,
                }}
            >
                <Box>
                    <Typography variant="h5" component="h3" fontWeight="700">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 1.5, lineHeight: 1.6 }}>
                        {description}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', opacity: 0.7, mt: 3 }}>
                    <Typography variant="caption" sx={{ mr: 0.5, fontWeight: '600' }}>Explore</Typography>
                    <ArrowForwardIcon fontSize="small" />
                </Box>
            </Box>
        </motion.div>
    );
};

// ----------------- Home Component (V3) -----------------
// Featuring a neutral background and calming green accents.

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const Home = () => {
    const navigate = useNavigate();
    const [logoutOpen, setLogoutOpen] = useState(false);

    const handleLogout = () => {
        setLogoutOpen(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const cards = [
        { title: 'BMI Calculator', description: 'Check your Body Mass Index for a healthier life.', imageUrl: 'bmi.jpeg', route: '/bmi' },
        { title: 'AI Analyser', description: 'Analyse your exercise form with AI pose detection.', imageUrl: 'exercise.jpg', route: '/ai-analyser' },
        { title: 'Workout Gear', description: 'Everything you need for an effective workout.', imageUrl: 'workout.jpg', route: '/gear' },
        { title: 'Fitness Planner', description: 'Personalized diet and workout plans just for you.', imageUrl: 'planner.jpg', route: '/fitness-planner' },
        { title: 'Exercise Predictor', description: 'Making health easy, one day at a time.', imageUrl: 'thumb__5_.jpg', route: '/exercise-predictor' },
        { title: 'Gym Equipments', description: 'High-quality equipment for your fitness journey.', imageUrl: 'sugar.jpg', route: '/equipment' },
        { title: 'Slot Booking', description: 'Book your personal training sessions with ease.', imageUrl: 'bmi.jpg', route: '/dashboard' },
        { title: 'Exercise Recommendation', description: 'Get AI-powered workouts tailored to you.', imageUrl: 'exercise.jpg', route: '/exercise-recommendation' },
    ];

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
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
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    zIndex: -2,
                }}
            />

            {/* Background overlay is now a neutral dark charcoal, no blue tones. */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(25, 25, 25, 0.9) 0%, rgba(25, 25, 25, 0.5) 100%)',
                    zIndex: -1,
                }}
            />

            {/* Main Content */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    p: { xs: 2, sm: 4, md: 6 },
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem',
                        width: '100%',
                        maxWidth: '1500px',
                    }}
                >
                    {cards.map((card) => (
                        <ProductCard
                            key={card.title}
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            onNext={() => navigate(card.route)}
                        />
                    ))}
                </motion.div>
            </Box>

            {/* Snackbar updated with the new calm aesthetic. */}
            <Snackbar
                open={logoutOpen}
                autoHideDuration={2000}
                onClose={() => setLogoutOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{ pb: 2 }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#EAEAEA',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        minWidth: '320px',
                        // Using a neutral, slightly transparent dark background.
                        backgroundColor: 'rgba(38, 38, 38, 0.8)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* New calming green accent color. */}
                    <CheckCircleIcon sx={{ mr: 1.5, color: '#6EE7B7' }} />
                    <Typography sx={{ flex: 1, fontWeight: '500' }}>Logout Successful!</Typography>
                    <IconButton size="small" onClick={() => setLogoutOpen(false)}>
                        <CloseIcon fontSize="small" sx={{ color: '#EAEAEA' }} />
                    </IconButton>
                </Box>
            </Snackbar>
        </Box>
    );
};

export default Home;