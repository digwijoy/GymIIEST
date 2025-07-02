const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const FitnessRouter = require('./Routes/FitnessRouter');
const SlotRouter = require('./Routes/SlotRouter');
const planRoutes = require('./Routes/planRoutes');
const fitnessRecommendationRoutes = require('./Routes/fitnessRecommendations');

const app = express();
const PORT = process.env.PORT || 8080;

const mongo_url = process.env.MONGO_URI;
if (!mongo_url) {
    console.error("❌ MONGO_URI not found in .env file");
    process.exit(1);
}

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected...'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/predict-plan', FitnessRouter);
app.use('/api/slots', SlotRouter);
app.use('/api/plans', planRoutes);
app.use('/api/fitness-recommendations', fitnessRecommendationRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
