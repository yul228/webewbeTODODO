import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/screnochki/Homechek/Home';
import TodoListPage from './components/screnochki/Todopagek/TodoListPage'; 
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todolist" element={<TodoListPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;