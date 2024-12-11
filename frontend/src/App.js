import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                        element={<TodoList />}
                    />
                    <Route
                        path="/add"
                        element={<AddTodo />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<EditTodo />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;