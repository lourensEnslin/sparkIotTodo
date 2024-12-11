const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Import the Todo mongo model

// Create a new TODO item
router.post('/createTodo', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create TODO', error });
    }
});
// Get a single TODO item by ID
router.get('/getTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'TODO not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve TODO', error });
    }
});

// Retrieve all TODO items
router.get('/getAllTodos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve TODOs', error });
    }
});

// Update a TODO item by ID
router.put('/updateTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'TODO not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update TODO', error });
    }
});

// Delete a TODO item by ID
router.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'TODO not found' });
        }
        res.status(200).json({ message: 'TODO deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete TODO', error });
    }
});

module.exports = router;