import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useParams } from 'react-router-dom';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as editStyles } from '../styles/editTodoStyles';

const EditTodo = ({ onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`/getTodo/${id}`);
                const todo = response.data;
                setTitle(todo.title);
                setDescription(todo.description || '');
            } catch (error) {
                console.error('Error fetching TODO:', error);
            }
        };
        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/updateTodo/${id}`, { title, description });
            onCancel();
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    };

    return (
        <div style={globalStyles.container}>
            <h3 style={globalStyles.title}>Edit TODO</h3>
            <form onSubmit={handleSubmit} style={editStyles.editForm}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={globalStyles.input}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={globalStyles.textarea}
                    placeholder="Description (optional)"
                />
                <div style={editStyles.buttonContainer}>
                    <button 
                        type="submit" 
                        style={{...globalStyles.button, ...editStyles.saveButton}}
                        disabled={!title}
                    >
                        Save
                    </button>
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