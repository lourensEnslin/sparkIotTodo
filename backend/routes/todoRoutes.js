const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Import the Todo mongo model

/**
 * Create a new TODO item
 * POST /createTodo
 * @param {string} title - The title of the todo item (required)
 * @param {string} description - Optional description of the todo item
 * @returns {Object} The newly created todo item
 */
router.post('/createTodo', async (req, res) => {
    try {
        console.log('[POST /createTodo] Creating new todo with data:', req.body);
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description,
        });
        const savedTodo = await newTodo.save();
        console.log('[POST /createTodo] Successfully created todo:', savedTodo);
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('[POST /createTodo] Error creating todo:', error);
        res.status(500).json({ message: 'Failed to create TODO', error });
    }
});

/**
 * Get a single TODO item by ID
 * GET /getTodo/:id
 * @param {string} id - The ID of the todo item to retrieve
 * @returns {Object} The requested todo item
 */
router.get('/getTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('[GET /getTodo/:id] Fetching todo with id:', id);
        const todo = await Todo.findById(id);
        if (!todo) {
            console.log('[GET /getTodo/:id] Todo not found with id:', id);
            return res.status(404).json({ message: 'TODO not found' });
        }
        console.log('[GET /getTodo/:id] Successfully retrieved todo:', todo);
        res.status(200).json(todo);
    } catch (error) {
        console.error('[GET /getTodo/:id] Error retrieving todo:', error);
        res.status(500).json({ message: 'Failed to retrieve TODO', error });
    }
});

/**
 * Retrieve all TODO items
 * GET /getAllTodos
 * @returns {Array} List of all todo items
 */
router.get('/getAllTodos', async (req, res) => {
    try {
        console.log('[GET /getAllTodos] Fetching all todos');
        const todos = await Todo.find();
        console.log('[GET /getAllTodos] Successfully retrieved todos. Count:', todos.length);
        res.status(200).json(todos);
    } catch (error) {
        console.error('[GET /getAllTodos] Error retrieving todos:', error);
        res.status(500).json({ message: 'Failed to retrieve TODOs', error });
    }
});

/**
 * Update a TODO item by ID
 * PUT /updateTodo/:id
 * @param {string} id - The ID of the todo item to update
 * @param {string} title - Updated title (optional)
 * @param {string} description - Updated description (optional)
 * @param {boolean} completed - Updated completion status (optional)
 * @returns {Object} The updated todo item
 */
router.put('/updateTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        console.log('[PUT /updateTodo/:id] Updating todo with id:', id, 'Data:', req.body);
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }//returns the updated todo
        );
        if (!updatedTodo) {
            console.log('[PUT /updateTodo/:id] Todo not found with id:', id);
            return res.status(404).json({ message: 'TODO not found' });
        }
        console.log('[PUT /updateTodo/:id] Successfully updated todo:', updatedTodo);
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('[PUT /updateTodo/:id] Error updating todo:', error);
        res.status(500).json({ message: 'Failed to update TODO', error });
    }
});

/**
 * Delete a TODO item by ID
 * DELETE /deleteTodo/:id
 * @param {string} id - The ID of the todo item to delete
 * @returns {Object} Success message
 */
router.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('[DELETE /deleteTodo/:id] Deleting todo with id:', id);
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            console.log('[DELETE /deleteTodo/:id] Todo not found with id:', id);
            return res.status(404).json({ message: 'TODO not found' });
        }
        console.log('[DELETE /deleteTodo/:id] Successfully deleted todo:', deletedTodo);
        res.status(200).json({ message: 'TODO deleted successfully' });
    } catch (error) {
        console.error('[DELETE /deleteTodo/:id] Error deleting todo:', error);
        res.status(500).json({ message: 'Failed to delete TODO', error });
    }
});

module.exports = router;