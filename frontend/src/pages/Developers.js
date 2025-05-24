import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import { Email, LinkedIn } from "@mui/icons-material";

const teamMembers = [
    {
        name: "Raunak Sarkar",
        role: "MERN-Stack Developer",
        // image: "/image1.jpg",
        email: "mailto:raunaksarkar@gmail.com",
        linkedin: " https://www.linkedin.com/in/raunak-sarkar-424a4425b/",
    },
    {
        name: "Digwijoy Pandit",
        role: "ML Developer",
        // image: "https://via.placeholder.com/150",
        email: "mailto:digwijoypandit@gmail.com",
        linkedin: "https://www.linkedin.com/in/digwijoy-pandit-620163253/",
    },
];

const Developers = ({ darkMode }) => {
    return (
        <Box
            textAlign="center"
            mt={0}
            p={3}
            sx={{
                backgroundColor: darkMode ? "#1E1E1E" : "#E6E6FA",
                minHeight: "100vh",
                transition: "background-color 0.3s ease",
            }}
        >
            <Typography variant="h4" fontWeight="bold">
                Developers
            </Typography>
            <Typography mt={2}>Meet our amazing development team!!</Typography>

            {/* Team Member Cards */}
            <Grid container spacing={3} justifyContent="center" mt={3}>
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                maxWidth: 300,
                                maxHeight: 800,
                                mx: "auto",
                                p: 2,
                                textAlign: "center",
                                background: darkMode ? "#1E1E1E" : "#FFF",
                                color: darkMode ? "#fff" : "#000",
                                transition: "0.4s",
                                border: darkMode ? "1px solid #444" : "1px solid #ddd",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: darkMode
                                        ? "0px 4px 20px #fff"
                                        : "0px 4px 20px rgb(4, 84, 255)",
                                    border: darkMode ? "1px solid #fff" : "1px solid  rgb(59, 4, 255)",
                                },
                            }}
                        >

                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle2" color={darkMode ? "gray" : "black"}>
                                    {member.role}
                                </Typography>
                                {/* Icons with Gradient Background */}
                                <Box mt={1} display="flex" justifyContent="center" gap={2}>
                                    <Box
                                        sx={{
                                            background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                            "&:hover": { background: "linear-gradient(45deg, rgb(4, 88, 157), rgb(35, 4, 157))" },
                                            borderRadius: "30%",
                                            display: "inline-block",
                                            p: 0.2,
                                        }}
                                    >
                                        <IconButton href={member.email} target="_blank" sx={{ color: "#fff" }}>
                                            <Email />
                                        </IconButton>
                                    </Box>

                                    <Box
                                        sx={{
                                            background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                            "&:hover": { background: "linear-gradient(45deg, rgb(4, 88, 157), rgb(35, 4, 157))" },
                                            borderRadius: "30%",
                                            display: "inline-block",
                                            p: 0.2,
                                        }}
                                    >
                                        <IconButton href={member.linkedin} target="_blank" sx={{ color: "#FFF" }}>
                                            <LinkedIn />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Developers;