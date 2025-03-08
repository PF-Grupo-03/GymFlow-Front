import React from 'react';
import RoutineView from '../UserDashboard/MyRoutine/MyRoutine';

const UserRoutines = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-odor text-primary mb-4">
        Rutinas de Usuarios
      </h2>
      <RoutineView />
    </div>
  );
};

export default UserRoutines;
