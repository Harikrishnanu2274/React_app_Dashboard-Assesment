// src/components/TaskList.tsx
import React from 'react';
import { useTaskContext } from '../Context/TaskContext';
import TaskItem from './Taskitem';

const TaskList: React.FC = () => {
  const { state } = useTaskContext();

  return (
    <div className="task-list">
      {state.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
