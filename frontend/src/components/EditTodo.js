// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useParams } from 'react-router-dom';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as editStyles } from '../styles/editTodoStyles';

/**
 * EditTodo Component
 * Renders a form to edit existing TODO items
 * @param {Function} onCancel - Callback function called after successful update or cancel
 */
const EditTodo = () => {
    // State for form inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // Get todo ID from URL parameters
    const { id } = useParams();

    const onCancel = () => {window.location.href = '/'};

    // Fetch todo data when component mounts
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                // Get todo details from API
                const response = await axios.get(`/getTodo/${id}`);
                const todo = response.data;
                // Set form fields with todo data
                setTitle(todo.title);
                setDescription(todo.description || '');
            } catch (error) {
                console.error('Error fetching TODO:', error);
            }
        };
        fetchTodo();
    }, [id]);

    /**
     * Handles form submission
     * Updates the TODO item and closes the edit form
     * @param {Event} e - Form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send PUT request to update todo
            await axios.put(`/updateTodo/${id}`, { title, description });
            // Call cancel callback to close form
            onCancel();
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    };

    return (
        <div style={globalStyles.container}>
            <h3 style={globalStyles.title}>Edit TODO</h3>
            <form onSubmit={handleSubmit} style={editStyles.editForm}>
                {/* Title input field */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={globalStyles.input}
                    placeholder="Title"
                />
                {/* Optional description textarea */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={globalStyles.textarea}
                    placeholder="Description (optional)"
                />
                <div style={editStyles.buttonContainer}>
                    {/* Submit button - disabled if title is empty */}
                    <button 
                        type="submit" 
                        style={{...globalStyles.button, ...editStyles.saveButton}}
                        disabled={!title}
                    >
                        Save
                    </button>
                    {/* Cancel button */}
                    <button 
                        type="button" 
                        onClick={onCancel}
                        style={{...globalStyles.button, ...editStyles.cancelButton}}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTodo;