export const styles = {
    todoList: {
        listStyle: 'none',
        padding: 0
    },
    todoItem: (completed) => ({
        backgroundColor: completed ? 'transparent' : '#f8f9fa',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        opacity: completed ? 0.7 : 1
    }),
    todoTitle: (completed) => ({
        fontSize: '18px',
        textDecoration: completed ? 'line-through' : 'none'
    }),
    todoDescription: {
        color: '#7f8c8d',
        fontSize: '14px'
    },
    todoMeta: {
        fontSize: '12px',
        color: '#95a5a6',
        marginBottom: '10px'
    },
    refreshButton: {
        backgroundColor: '#95a5a6',
        padding: '10px 20px',
        borderRadius: '5px',
        marginBottom: '20px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: '10px 20px',
        borderRadius: '5px',
        marginBottom: '20px',
        width: '100%'
    },
    actionButton: {
        backgroundColor: '#2ecc71'
    },
    deleteButton: {
        backgroundColor: '#e74c3c'
    },
    completeButton: {
        backgroundColor: '#222'
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#95a5a6',
        fontSize: '16px',
        marginTop: '20px',
        fontStyle: 'italic'
    }
};

