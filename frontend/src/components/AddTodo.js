// Import necessary dependencies
import React, { useState } from 'react';
import axios from '../services/api';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as addStyles } from '../styles/addTodoStyles';

/**
 * AddTodo Component
 * Renders a form to add new TODO items
 * @param {Function} onSuccess - Callback function called after successful TODO creation or cancel
 */
const AddTodo = () => {
    // State for form inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Navigate to the home page after successful addition
    const onSuccess = () => {window.location.href = '/'};

    /**
     * Handles form submission
     * Creates a new TODO item and resets the form
     * @param {Event} e - Form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            // Send POST request to create new TODO
            await axios.post('/createTodo', { title, description });
            // Reset form fields
            setTitle('');
            setDescription('');
            // Call success callback
            onSuccess();
        } catch (error) {
            console.error('Error adding TODO:', error);
            if (error.response) {
                // Server responded with an error
                setError(error.response.data.message || 'Failed to add TODO. Please try again.');
            } else if (error.request) {
                // Request was made but no response received
                setError('Unable to reach the server. Please check your connection.');
            } else {
                // Something else went wrong
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div style={globalStyles.container}>
            <h3 style={globalStyles.title}>Add TODO</h3>
            <form onSubmit={handleSubmit} style={addStyles.addForm}>
                {/* Display error message if there is one */}
                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}
                {/* Title input field */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={globalStyles.input}
                />
                {/* Optional description textarea */}
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={globalStyles.textarea}
                />
                <div style={addStyles.buttonContainer}>
                    {/* Submit button - disabled if title is empty */}
                    <button 
                        type="submit" 
                        disabled={!title}
                        style={{...globalStyles.button, ...addStyles.submitButton}}
                    >
                        Add
                    </button>
                    {/* Cancel button */}
                    <button 
                        type="button" 
                        onClick={onSuccess}
                        style={{...globalStyles.button, ...addStyles.cancelButton}}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;