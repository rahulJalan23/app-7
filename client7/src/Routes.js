import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransactionFile';
import ValidateTransactionPage from './components/ValidateTransactionPage2';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="transaction/add" element={<AddTransaction />} />
      <Route
        path="transaction/validate/:id"
        element={<ValidateTransactionPage />}
      />
    </Routes>
  );
}
