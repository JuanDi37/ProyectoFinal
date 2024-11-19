// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Barra superior fija con padding adicional */}
      <header className="w-full bg-gray-800 shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-3xl font-bold text-center text-white mt-4">Bienvenido</h1>
      </header>

      {/* Contenedor central para el texto de bienvenida */}
      <div className="flex flex-grow items-center justify-center p-4 text-center mt-20">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-white mb-4">Bienvenido, Usuario</h2>
          <p className="text-gray-400 text-lg">
            Esta es tu aplicación de Finanzas Personales, donde podrás controlar tus gastos, visualizar tu presupuesto y
            alcanzar tus objetivos financieros de una manera sencilla y eficiente.
          </p>
        </div>
      </div>

      {/* Barra de navegación inferior con padding adicional */}
      <nav className="bg-gray-800 fixed bottom-0 left-0 w-full border-t border-gray-700 py-3 px-4">
        <div className="flex justify-around py-2">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center text-gray-400 hover:text-blue-500"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-sm">Home</span>
          </button>
          <button
            onClick={() => navigate('/meta')}
            className="flex flex-col items-center text-gray-400 hover:text-blue-500"
          >
            <ClipboardDocumentListIcon className="h-6 w-6" />
            <span className="text-sm">Metas</span>
          </button>
          <button
            onClick={() => navigate('/calendar')}
            className="flex flex-col items-center text-gray-400 hover:text-blue-500"
          >
            <CalendarDaysIcon className="h-6 w-6" />
            <span className="text-sm">Calendar</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center text-gray-400 hover:text-blue-500"
          >
            <Cog6ToothIcon className="h-6 w-6" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
