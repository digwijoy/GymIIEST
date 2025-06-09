
import React from "react";
import { Box, Typography, Grid, Card, CardContent, IconButton, Avatar } from "@mui/material";
import { Email, LinkedIn } from "@mui/icons-material";

const teamMembers = [
    {
        name: "Raunak Sarkar",
        role: "MERN-Stack Developer",
        image: "", // Add image URL if needed
        email: "mailto:raunaksarkar@gmail.com",
        linkedin: "https://www.linkedin.com/in/raunak-sarkar-424a4425b/",
    },
    {
        name: "Digwijoy Pandit",
        role: "ML Developer",
        image: "", // Add image URL if needed
        email: "mailto:digwijoypandit@gmail.com",
        linkedin: "https://www.linkedin.com/in/digwijoy-pandit-620163253/",
    },
];

const Developers = ({ darkMode }) => {
    return (
        <Box
            textAlign="center"
            p={4}
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

            <Grid container spacing={4} justifyContent="center" mt={4}>
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                width: 300,
                                height: 370,
                                mx: "auto",
                                p: 3,
                                textAlign: "center",
                                background: darkMode ? "#1E1E1E" : "#FFF",
                                color: darkMode ? "#fff" : "#000",
                                transition: "0.4s",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                border: darkMode ? "1px solid #444" : "1px solid #ddd",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: darkMode
                                        ? "0px 4px 20px #fff"
                                        : "0px 4px 20px rgb(4, 84, 255)",
                                    border: darkMode
                                        ? "1px solid #fff"
                                        : "1px solid  rgb(59, 4, 255)",
                                },
                            }}
                        >
                            {/* Optional Avatar */}
                            {/* {member.image && (
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                />
              )} */}

                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {member.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color={darkMode ? "gray" : "black"}
                                    gutterBottom
                                >
                                    {member.role}
                                </Typography>

                                <Box mt={3} display="flex" justifyContent="center" gap={3}>
                                    <Box
                                        sx={{
                                            background:
                                                "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(45deg, rgb(4, 88, 157), rgb(35, 4, 157))",
                                            },
                                            borderRadius: "30%",
                                            display: "inline-block",
                                            p: 0.5,
                                        }}
                                    >
                                        <IconButton
                                            href={member.email}
                                            target="_blank"
                                            sx={{ color: "#fff" }}
                                        >
                                            <Email />
                                        </IconButton>
                                    </Box>

                                    <Box
                                        sx={{
                                            background:
                                                "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(45deg, rgb(4, 88, 157), rgb(35, 4, 157))",
                                            },
                                            borderRadius: "30%",
                                            display: "inline-block",
                                            p: 0.5,
                                        }}
                                    >
                                        <IconButton
                                            href={member.linkedin}
                                            target="_blank"
                                            sx={{ color: "#FFF" }}
                                        >
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