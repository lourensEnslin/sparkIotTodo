// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the Todo schema
const TodoSchema = new mongoose.Schema({
    // Title of the todo item - required field
    title: { type: String, required: true },
    // Optional description of the todo item
    description: { type: String },
    // Tracks completion status, defaults to false
    completed: { type: Boolean, default: false },
    // Automatically set timestamp when todo is created
    createdAt: { type: Date, default: Date.now },
});

// Export the Todo model using the schema
module.exports = mongoose.model('Todo', TodoSchema);