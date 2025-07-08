import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Box,
    Divider,
    Paper,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BMIGauge = ({ bmi }) => {
    const getNeedleAngle = (bmi) => {
        const minAngle = -90;
        const maxAngle = 90;
        const minBMI = 10;
        const maxBMI = 40;
        const clampedBMI = Math.max(minBMI, Math.min(bmi, maxBMI));
        return minAngle + ((clampedBMI - minBMI) / (maxBMI - minBMI)) * (maxAngle - minAngle);
    };

    const angle = getNeedleAngle(bmi);

    const getBMICategory = () => {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    const getBMICategoryColor = () => {
        if (bmi < 18.5) return "#82d8d8";
        if (bmi < 25) return "#4caf50";
        if (bmi < 30) return "#ff9800";
        return "#f44336";
    };

    return (
        <Box mt={4} textAlign="center">
            <svg width="320" height="180" viewBox="0 0 320 160">
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#82d8d8" />
                        <stop offset="33%" stopColor="#4caf50" />
                        <stop offset="66%" stopColor="#ff9800" />
                        <stop offset="100%" stopColor="#f44336" />
                    </linearGradient>
                </defs>
                <path
                    d="M 30 150 A 120 120 0 0 1 290 150"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="22"
                    strokeLinecap="round"
                />
                <g transform={`rotate(${angle}, 160, 150)`}>
                    <line x1="160" y1="150" x2="160" y2="40" stroke="#fff" strokeWidth="4" />
                    <circle cx="160" cy="150" r="6" fill="#fff" />
                </g>
                <text x="25" y="145" fontSize="12" fill="#aaa">Underweight</text>
                <text x="110" y="60" fontSize="12" fill="#aaa">Normal</text>
                <text x="200" y="60" fontSize="12" fill="#aaa">Overweight</text>
                <text x="255" y="145" fontSize="12" fill="#aaa">Obese</text>
            </svg>

            <Typography variant="h6" mt={2} color={getBMICategoryColor()}>
                BMI = {bmi} ({getBMICategory()})
            </Typography>
        </Box>
    );
};

const BMICalculator = () => {
    const theme = useTheme();
    const [unit, setUnit] = useState("metric");
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [heightIn, setHeightIn] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const navigate = useNavigate();

    const handleUnitChange = (_, newUnit) => {
        if (newUnit !== null) {
            setUnit(newUnit);
            setBmi(null);
            setHeight("");
            setHeightIn("");
            setWeight("");
        }
    };

    const calculateBMI = () => {
        if (!age || !gender || !height || !weight || (unit === "us" && heightIn === "")) {
            window.alert("Please fill in all required fields before calculating BMI.");
            return;
        }

        let h, w;
        if (unit === "metric") {
            h = parseFloat(height) / 100;
            w = parseFloat(weight);
        } else {
            const feet = parseFloat(height);
            const inches = parseFloat(heightIn) || 0;
            h = (feet * 12 + inches) * 0.0254;
            w = parseFloat(weight) * 0.453592;
        }

        if (!h || !w) return setBmi(null);

        const bmiCalc = w / (h * h);
        setBmi(bmiCalc.toFixed(2));
    };


    const getBMICategory = () => {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    return (
        <Box sx={{ bgcolor: "#0e0e0e", minHeight: "100vh", py: 6 }}>
            <Container maxWidth="sm">
                <Paper elevation={5} sx={{
                    p: 4,
                    borderRadius: 6,
                    bgcolor: "#1c1c1e",
                    boxShadow: "0 0 20px rgba(255,255,255,0.08)"
                }}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            background: "linear-gradient(65deg, rgb(81,156,223), rgb(59,4,255))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold"
                        }}
                    >
                        BMI Calculator
                    </Typography>

                    <ToggleButtonGroup
                        value={unit}
                        exclusive
                        onChange={handleUnitChange}
                        fullWidth
                        sx={{
                            mb: 3,
                            bgcolor: "#2a2a2e",
                            borderRadius: 2,
                            "& .MuiToggleButton-root": {
                                color: "#fff",
                                border: "none",
                                "&.Mui-selected": {
                                    background: "#519cdf",
                                    color: "#000",
                                    "&:hover": {
                                        background: "#3c7ebb"
                                    }
                                }
                            }
                        }}
                    >
                        <ToggleButton value="metric" sx={{ flex: 1 }}>Metric</ToggleButton>
                        <ToggleButton value="us" sx={{ flex: 1 }}>US</ToggleButton>
                    </ToggleButtonGroup>

                    <TextField
                        label="Age"
                        type="number"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        sx={{
                            bgcolor: "#2a2a2e",
                            input: { color: "#fff" },
                            label: { color: "#aaa" }
                        }}
                    />

                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <FormLabel sx={{ color: "#fff" }}>Gender</FormLabel>
                        <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                            <FormControlLabel
                                value="male"
                                control={<Radio sx={{ color: "#82d8d8" }} />}
                                label={<Typography sx={{ color: "#fff" }}>Male</Typography>}
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio sx={{ color: "#82d8d8" }} />}
                                label={<Typography sx={{ color: "#fff" }}>Female</Typography>}
                            />
                        </RadioGroup>
                    </FormControl>

                    {unit === "metric" ? (
                        <>
                            <TextField
                                label="Height (cm)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                sx={{
                                    bgcolor: "#2a2a2e",
                                    input: { color: "#fff" },
                                    label: { color: "#aaa" }
                                }}
                            />
                            <TextField
                                label="Weight (kg)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                sx={{
                                    bgcolor: "#2a2a2e",
                                    input: { color: "#fff" },
                                    label: { color: "#aaa" }
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Box display="flex" gap={2}>
                                <TextField
                                    label="Height (feet)"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    sx={{
                                        bgcolor: "#2a2a2e",
                                        input: { color: "#fff" },
                                        label: { color: "#aaa" }
                                    }}
                                />
                                <TextField
                                    label="Height (inches)"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={heightIn}
                                    onChange={(e) => setHeightIn(e.target.value)}
                                    sx={{
                                        bgcolor: "#2a2a2e",
                                        input: { color: "#fff" },
                                        label: { color: "#aaa" }
                                    }}
                                />
                            </Box>
                            <TextField
                                label="Weight (lbs)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                sx={{
                                    bgcolor: "#2a2a2e",
                                    input: { color: "#fff" },
                                    label: { color: "#aaa" }
                                }}
                            />
                        </>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={calculateBMI}
                        sx={{
                            mt: 3,
                            background: "linear-gradient(65deg, rgb(57, 144, 220), rgb(59,4,255))",
                            color: "#000",
                            fontWeight: "bold",
                            borderRadius: 3,
                            "&:hover": {
                                background: "linear-gradient(65deg, rgb(50,120,190), rgb(40,0,200))"
                            }
                        }}
                    >
                        Calculate BMI
                    </Button>

                    {bmi && (
                        <>
                            <Divider sx={{ my: 4, borderColor: "#333" }} />
                            <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
                                Your BMI is:
                            </Typography>
                            <Typography variant="h4" align="center" sx={{
                                color: getBMICategory() === "Normal" ? "#82d8d8" : "#f48fb1"
                            }}>
                                {bmi} ({getBMICategory()})
                            </Typography>
                            <Typography align="center" mt={1} sx={{ color: "#aaa" }}>
                                Healthy range: 18.5 - 24.9
                            </Typography>
                            <BMIGauge bmi={parseFloat(bmi)} />
                        </>
                    )}

                    <Button
                        onClick={() => navigate("/home")}
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 4,
                            borderColor: "#82d8d8",
                            color: "#82d8d8",
                            fontWeight: "bold",
                            "&:hover": {
                                borderColor: "#f48fb1",
                                color: "#f48fb1"
                            }
                        }}
                    >
                        Back to Home
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default BMICalculator;
