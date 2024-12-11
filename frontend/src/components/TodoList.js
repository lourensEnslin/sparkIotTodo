import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as todoStyles } from '../styles/todoListStyles';

const TodoList = ({ refresh, onEdit }) => {
    const [todos, setTodos] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

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

    useEffect(() => {
        fetchTodos();
    }, [refresh]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/deleteTodo/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting TODO:', error);
        }
    };

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={globalStyles.container}>
            <h3 style={{...globalStyles.text, ...globalStyles.title}}>TODO List</h3>
            <button 
                style={{...globalStyles.button, ...todoStyles.refreshButton}} 
                onClick={fetchTodos}
                disabled={isRefreshing}
            >
                {isRefreshing ? 'Refreshing...' : '↻ Refresh List'}
            </button>
            <button style={{...globalStyles.button, ...todoStyles.addButton}} onClick={() => window.location.href = '/add'}>
                Add New Todo
            </button>
            {todos.length === 0 ? (
                <p style={todoStyles.emptyMessage}>No todos yet. Click "Add New Todo" to create one!</p>
            ) : (
                <ul style={todoStyles.todoList}>
                    {todos.slice().reverse().map((todo) => (
                        <li key={todo._id} style={todoStyles.todoItem(todo.completed)}>
                            <h4>
                                <span style={{...globalStyles.text, ...todoStyles.todoTitle(todo.completed)}}>
                                    {todo.title}
                                </span>
                                {todo.completed && <span style={{...globalStyles.text, color: '#2ecc71'}}> ✓</span>}
                            </h4>
                            <p style={{...globalStyles.text, ...todoStyles.todoDescription}}>{todo.description}</p>
                            <div style={todoStyles.todoMeta}>
                                <span>{todo.completed ? '(Completed)' : '(Pending)'}</span>
                                <span> • Created on {formatDate(todo.createdAt)}</span>
                            </div>
                            <div style={globalStyles.buttonContainer}>
                                <button 
                                    style={{...globalStyles.button, ...todoStyles.completeButton}}
                                    onClick={() => handleComplete(todo._id, todo.completed)}
                                >
                                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button style={{...globalStyles.button, ...todoStyles.actionButton}} onClick={() => onEdit(todo)}>Edit</button>
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