import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './Home/Home';
import AboutUs from './AboutUs/AboutUs';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Profile from './Profile/Profile';
import HeartRate from './Biometrics/HeartRate';
import Movement from './Biometrics/Movement';
import OxygenSaturation from './Biometrics/OxygenSaturation';
import GettingStarted from './AboutUs/GettingStarted';

import './App.css';

function AppRoutes({ isAuthenticated, handleLogin, handleLogout, checkAuth }) {
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/login" /> : <Signup />} />
            <Route path="/profile" element={isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/heart-rate" element={isAuthenticated ? <HeartRate /> : <Navigate to="/login" />} />
            <Route path="/movement" element={isAuthenticated ? <Movement /> : <Navigate to="/login" />} />
            <Route path="/oxygen-saturation" element={isAuthenticated ? <OxygenSaturation /> : <Navigate to="/login" />} />
        </Routes>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    };

    const handleLogin = () => {
        checkAuth();
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        checkAuth();
    };

    return (
        <Router basename="/somniguard.github.io">
            <AppRoutes
                isAuthenticated={isAuthenticated}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                checkAuth={checkAuth}
            />
        </Router>
    );
}

export default App;
