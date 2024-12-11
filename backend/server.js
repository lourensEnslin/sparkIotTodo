const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//tinydevicesbiginsights

// MongoDB connection
mongoose.connect(`mongodb+srv://sparkIot:tinydevicesbiginsights@sparkiottodo.3ntia.mongodb.net/?retryWrites=true&w=majority&appName=sparkIotTodo`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the routes
app.use('/', todoRoutes);

// Start server on port 3001 so that the frontend can run on port 3000
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));