import React, { useState } from 'react';
import axios from '../services/api';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as addStyles } from '../styles/addTodoStyles';

const AddTodo = ({ onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/createTodo', { title, description });
            setTitle('');
            setDescription('');
            onSuccess();
        } catch (error) {
            console.error('Error adding TODO:', error);
        }
    };

    return (
        <div style={globalStyles.container}>
            <h3 style={globalStyles.title}>Add TODO</h3>
            <form onSubmit={handleSubmit} style={addStyles.addForm}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={globalStyles.input}
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={globalStyles.textarea}
                />
                <div style={addStyles.buttonContainer}>
                    <button 
                        type="submit" 
                        disabled={!title}
                        style={{...globalStyles.button, ...addStyles.submitButton}}
                    >
                        Add
                    </button>
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