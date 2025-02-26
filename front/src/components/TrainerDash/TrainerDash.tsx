import React from 'react';
import TrainingRooms from './TrainingRooms';
import RoomDetails from './RoomDetails';
import UserRoutines from './UserRoutines';

const TrainerDash = () => {
    return (
      <div className="min-h-screen p-6 text-foreground font-odor bg-background">
        <div className="max-w-6xl mx-auto bg-secondary p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-holtwood text-primary mb-10 underline">Dashboard del Entrenador</h1>
          <TrainingRooms />
          <RoomDetails />
          <UserRoutines />
        </div>
      </div>
    );
  };

export default TrainerDash;