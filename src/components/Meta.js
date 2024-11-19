// src/components/Meta.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HomeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Meta = () => {
  const [metas, setMetas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMetas();
  }, []);

  const fetchMetas = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/metas/${userId}`);
      setMetas(response.data);
    } catch (error) {
      console.error('Error al cargar las metas:', error);
    }
  };

  const handleCreateMeta = async () => {
    if (!titulo || !descripcion || !monto) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const newMeta = { titulo, descripcion, monto, user_id: userId };
    try {
      await axios.post('http://localhost:8000/metas', newMeta);
      fetchMetas();
      setTitulo('');
      setDescripcion('');
      setMonto('');
    } catch (error) {
      console.error('Error al crear la meta:', error);
    }
  };

  const handleUpdateMeta = async (metaId) => {
    if (!titulo || !descripcion || !monto) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const updatedMeta = { titulo, descripcion, monto };
    try {
      await axios.put(`http://localhost:8000/metas/${metaId}`, updatedMeta);
      fetchMetas();
      setTitulo('');
      setDescripcion('');
      setMonto('');
    } catch (error) {
      console.error('Error al actualizar la meta:', error);
    }
  };

  const handleDeleteMeta = async (metaId) => {
    try {
      await axios.delete(`http://localhost:8000/metas/${metaId}`);
      fetchMetas();
    } catch (error) {
      console.error('Error al eliminar la meta:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Barra superior fija */}
      <header className="w-full bg-gray-800 shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-3xl font-bold text-center text-white mt-4">Mis Metas</h1>
      </header>

      {/* Formulario para crear una nueva meta */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col w-full max-w-md">
          <input
            className="border rounded p-2 mb-2"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            className="border rounded p-2 mb-2"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            className="border rounded p-2 mb-2"
            placeholder="Monto"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleCreateMeta}>
            Crear Meta
          </button>
        </div>

        {/* Lista de metas creadas */}
        <div className="mt-8 w-full max-w-md">
          {metas.map((meta) => (
            <div key={meta.id} className="bg-gray-800 p-4 mb-4 rounded shadow">
              <h2 className="text-xl font-semibold text-white">{meta.titulo}</h2>
              <p className="text-gray-400">{meta.descripcion}</p>
              <p className="text-green-500">Monto: ${meta.monto}</p>
              <div className="flex mt-4">
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                  onClick={() => {
                    setTitulo(meta.titulo);
                    setDescripcion(meta.descripcion);
                    setMonto(meta.monto);
                    handleUpdateMeta(meta.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteMeta(meta.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de navegación inferior */}
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

export default Meta;
