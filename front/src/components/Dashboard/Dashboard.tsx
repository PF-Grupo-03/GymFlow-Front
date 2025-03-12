'use client';

import { useState } from 'react';
import MyProfile from '../UserDash/MyProfile/MyProfile';
import Turns from '../UserDash/MyTurns/MyTurns';
import MyMembership from '../UserDash/MyMemberships';
import RoutineView from '../UserDash/MyRoutine/MyRoutine';
import TitleBox from '../TitleBox/TitleBox';

const Dashboard = () => {
  // Estado para controlar la opción seleccionada
  const [selectedOption, setSelectedOption] = useState('personalData');

  // Función para renderizar el componente correspondiente
  const renderComponent = () => {
    switch (selectedOption) {
      case 'personalData':
        return <MyProfile />;
      case 'myTurns':
        return <Turns />;
      case 'myMembership':
        return <MyMembership />;
      case 'myRoutines':
        return <RoutineView />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-primary text-white">
      {/* Menú lateral */}
      <div className="w-full md:w-64 bg-primary p-4">
        <h2 className="text-xl font-holtwood mb-4">Menú</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                selectedOption === 'personalData'
                  ? 'bg-tertiary text-primary'
                  : 'hover:bg-tertiary hover:text-primary'
              }`}
              onClick={() => setSelectedOption('personalData')}
            >
              Datos personales
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                selectedOption === 'myTurns'
                  ? 'bg-tertiary text-primary'
                  : 'hover:bg-tertiary hover:text-primary'
              }`}
              onClick={() => setSelectedOption('myTurns')}
            >
              Mis turnos
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                selectedOption === 'myMembership'
                  ? 'bg-tertiary text-primary'
                  : 'hover:bg-tertiary hover:text-primary'
              }`}
              onClick={() => setSelectedOption('myMembership')}
            >
              Mi membresía
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                selectedOption === 'myRoutines'
                  ? 'bg-tertiary text-primary'
                  : 'hover:bg-tertiary hover:text-primary'
              }`}
              onClick={() => setSelectedOption('myRoutines')}
            >
              Mis rutinas
            </button>
          </li>
        </ul>
      </div>

      {/* Área de contenido */}
      <div className="flex-1 p-4">
        <div className="flex justify-center items-center mb-6">
          <TitleBox title="Dashboard" />
        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
