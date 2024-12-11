// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as todoStyles } from '../styles/todoListStyles';

// Main TodoList component
const TodoList = () => {
    // State for storing todos and refresh status
    const [todos, setTodos] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetch all todos from the API
    const fetchTodos = async () => {
        setIsRefreshing(true);
        try {
            const response = await axios.get('/getAllTodos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching TODOs:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Fetch todos when component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    // Handle deletion of a todo
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/deleteTodo/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting TODO:', error);
        }
    };

    // Toggle completion status of a todo
    const handleComplete = async (id, completed) => {
        try {
            await axios.put(`/updateTodo/${id}`, { completed: !completed });
            setTodos(todos.map(todo => 
                todo._id === id ? { ...todo, completed: !completed } : todo
            ));
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    };

    // Format date to a readable string
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Render component
    return (
        <div style={globalStyles.container}>
            <h3 style={{...globalStyles.text, ...globalStyles.title}}>TODO List</h3>
            {/* Refresh button */}
            <button 
                style={{...globalStyles.button, ...todoStyles.refreshButton}} 
                onClick={fetchTodos}
                disabled={isRefreshing}
            >
                {isRefreshing ? 'Refreshing...' : '↻ Refresh List'}
            </button>
            {/* Add new todo button */}
            <button style={{...globalStyles.button, ...todoStyles.addButton}} onClick={() => window.location.href = '/add'}>
                Add New Todo
            </button>
            {/* Display empty message or todo list */}
            {todos.length === 0 ? (
                <p style={todoStyles.emptyMessage}>No todos yet. Click "Add New Todo" to create one!</p>
            ) : (
                <ul style={todoStyles.todoList}>
                    {/* Map through todos in reverse order to show newest first */}
                    {todos.slice().reverse().map((todo) => (
                        <li key={todo._id} style={todoStyles.todoItem(todo.completed)}>
                            <h4>
                                <span style={{...globalStyles.text, ...todoStyles.todoTitle(todo.completed)}}>
                                    {todo.title}
                                </span>
                                {/* Show checkmark for completed todos */}
                                {todo.completed && <span style={{...globalStyles.text, color: '#2ecc71'}}> ✓</span>}
                            </h4>
                            <p style={{...globalStyles.text, ...todoStyles.todoDescription}}>{todo.description}</p>
                            {/* Todo metadata section */}
                            <div style={todoStyles.todoMeta}>
                                <span>{todo.completed ? '(Completed)' : '(Pending)'}</span>
                                <span> • Created on {formatDate(todo.createdAt)}</span>
                            </div>
                            {/* Action buttons */}
                            <div style={globalStyles.buttonContainer}>
                                <button 
                                    style={{...globalStyles.button, ...todoStyles.completeButton}}
                                    onClick={() => handleComplete(todo._id, todo.completed)}
                                >
                                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button style={{...globalStyles.button, ...todoStyles.actionButton}} onClick={() => window.location.href = `/edit/${todo._id}`}>Edit</button>
                                <button style={{...globalStyles.button, ...todoStyles.deleteButton}} onClick={() => handleDelete(todo._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;