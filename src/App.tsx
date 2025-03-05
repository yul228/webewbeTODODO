import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './components/screnochki/Homechek/Home';
import TodoListPage from './components/screnochki/Todopagek/TodoListPage'; 
import LoginPage from './components/screnochki/login/login';
import RegPage from './components/screnochki/registration/reg';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todolist" element={<TodoListPage />} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegPage />} /> 
    </Routes>
  );
};

export default App;