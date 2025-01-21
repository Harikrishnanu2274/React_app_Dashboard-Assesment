// src/components/TaskItem.tsx
import React from 'react';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch } = useTaskContext();

  const handleMarkCompleted = () => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.status} | Priority: {task.priority}</p>
      {task.status === 'Pending' && (
        <button onClick={handleMarkCompleted}>Mark as Completed</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
