// src/App.tsx
import React from 'react';
import { TaskProvider } from './Context/TaskContext';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
};

export default App;
