// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-gray-900 p-8">
      {/* Contenedor para el texto y los botones - centrado */}
      <div className="max-w-lg text-center md:text-left space-y-6 mb-8 md:mb-0 md:self-center">
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-white">
          Bienvenido a Finanzas Personales
        </h1>
        
        {/* Texto secundario */}
        <p className="text-gray-400 text-xl">
          Controla tus finanzas de manera sencilla y eficiente.
        </p>

        {/* Contenedor de botones con espacio horizontal */}
        <div className="flex space-x-4 mt-6 justify-center md:justify-start">
          {/* Botón para Volver al Login */}
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 border border-gray-400 text-gray-400 font-semibold rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Volver al Login
          </button>

          {/* Botón para Registrarse */}
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 border border-white text-white font-semibold rounded bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Registrarse
          </button>
        </div>
      </div>

      {/* Contenedor del logo - centrado */}
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img 
          src="/MyFinance.png" 
          alt="FinanceApp Logo" 
          className="w-full h-auto"
          style={{ maxWidth: '500px' }} // Ajuste del tamaño del logo
        />
      </div>
    </div>
  );
};

export default Welcome;
