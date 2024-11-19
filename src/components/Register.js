// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';



const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/register', { username, password });
      setMessage(response.data.message);
      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">My<span className="text-blue-400">Finance</span></h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Correo Electrónico"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {message && <p className="text-center text-gray-400 mt-4">{message}</p>}

        {/* Redirection text */}
        <p className="text-center text-gray-400 mt-6">
          Si ya tienes cuenta,{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
