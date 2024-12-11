// Import necessary dependencies
import React from 'react';
import { styles as globalStyles } from '../styles/globalStyles';
import { styles as todoStyles } from '../styles/todoListStyles';

/**
 * LoadingPlaceholder Component
 * Renders a list of placeholder items that simulate loading state of todos
 * Uses animation and gradient backgrounds to create a shimmer effect
 */
const LoadingPlaceholder = () => (
    <ul style={todoStyles.todoList}>
        {/* Render 5 placeholder items */}
        {[1, 2, 3, 4, 5].map((index) => (
            <li key={index} style={{
                ...todoStyles.todoItem(false),
                // Add shimmer animation effect
                animation: 'pulse 1.5s infinite',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
            }}>
                {/* Placeholder for todo title */}
                <div style={{
                    height: '24px',
                    width: '60%',
                    background: '#e0e0e0',
                    marginBottom: '10px',
                    borderRadius: '4px'
                }}></div>
                {/* Placeholder for todo description */}
                <div style={{
                    height: '16px',
                    width: '80%',
                    background: '#e0e0e0',
                    marginBottom: '15px',
                    borderRadius: '4px'
                }}></div>
                {/* Placeholder for todo metadata */}
                <div style={{
                    height: '14px',
                    width: '40%',
                    background: '#e0e0e0',
                    marginBottom: '15px',
                    borderRadius: '4px'
                }}></div>
                {/* Container for action button placeholders */}
                <div style={globalStyles.buttonContainer}>
                    {/* Render 3 button placeholders */}
                    {[1, 2, 3].map((btnIndex) => (
                        <div key={btnIndex} style={{
                            height: '32px',
                            width: '100px',
                            background: '#e0e0e0',
                            borderRadius: '4px',
                            margin: '0 5px'
                        }}></div>
                    ))}
                </div>
            </li>
        ))}
    </ul>
);

export default LoadingPlaceholder;
