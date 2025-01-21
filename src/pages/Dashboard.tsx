// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/Taskform';
import { fetchTasks } from '../services/taskservice';

const Dashboard: React.FC = () => {
  const { dispatch } = useTaskContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
      setLoading(false);
    };
    loadTasks();
  }, [dispatch]);

  return (
    <div>
      <h1>Task Dashboard</h1>
      <TaskForm />
      {loading ? <p>Loading tasks...</p> : <TaskList />}
    </div>
  );
};

export default Dashboard;
