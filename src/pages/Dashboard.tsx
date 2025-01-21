import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';
import Task from '../components/Task';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true)
  );

  return (
    <div>
      <h1>Task Management Dashboard</h1>

      {/* Search and Filter */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onUpdate={() => dispatch({ type: 'UPDATE_TASK_STATUS', payload: task.id })}
            onDelete={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
