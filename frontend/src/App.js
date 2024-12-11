import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <TodoList 
                                onEdit={(todo) => window.location.href = `/edit/${todo._id}`}
                                onAdd={() => window.location.href = '/add'} 
                            />
                        } 
                    />
                    <Route 
                        path="/add" 
                        element={<AddTodo onSuccess={() => window.location.href = '/'} />} 
                    />
                    <Route 
                        path="/edit/:id" 
                        element={<EditTodo onCancel={() => window.location.href = '/'} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;