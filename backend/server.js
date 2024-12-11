const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//tinydevicesbiginsights

// MongoDB connection
mongoose.connect(`mongodb+srv://sparkIot:${process.env.MONGODB_PASSWORD}@sparkiottodo.3ntia.mongodb.net/?retryWrites=true&w=majority&appName=sparkIotTodo`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the routes
app.use('/', todoRoutes);

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));