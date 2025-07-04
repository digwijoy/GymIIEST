import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import GoToTop from './components/GoToTop';

import Main from './pages/Main';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Developers from './pages/Developers';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BMICalculator from './pages/BMICalculator';
import ExercisePredictor from './pages/ExercisePredictor';
import GymEquipments from './pages/GymEquipments';
import FitnessPlanner from './pages/FitnessPlanner';
import Dashboard from './pages/Dashboard';
import FitnessPredict from './pages/FitnessPredict';
import FlaskMLInterface from './pages/FlaskMLInterface';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/exercise-predictor" element={<ExercisePredictor />} />
        <Route path="/equipment" element={<GymEquipments />} />
        <Route path="/fitness-planner" element={<FitnessPlanner />} />
        <Route path="/ai-analyser" element={<FlaskMLInterface />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise-recommendation" element={<FitnessPredict />} />
      </Routes>

      <GoToTop />
      <Footer />
    </>
  );
};

export default App;
