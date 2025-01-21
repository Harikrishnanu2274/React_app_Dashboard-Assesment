import React from 'react';
import { Task as TaskType } from '../type';

interface TaskProps {
  task: TaskType;
  onUpdate: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  return (
    <li style={taskItemStyle}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status} | Priority: {task.priority}</p>
      </div>
      <div style={buttonsStyle}>
        {task.status === 'Pending' && (
          <button onClick={onUpdate} style={buttonStyle}>
            Mark as Completed
          </button>
        )}
        <button onClick={onDelete} style={buttonStyle}>
          Delete
        </button>
      </div>
    </li>
  );
};

// Styling for Task component
const taskItemStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
};

const buttonsStyle: React.CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  gap: '10px',
};

const buttonStyle: React.CSSProperties = {
  padding: '5px 10px',
  borderRadius: '3px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#007BFF',
  color: '#fff',
};

export default Task;
