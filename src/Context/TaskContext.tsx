// src/context/TaskContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task } from '../type';

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'UPDATE_TASK_STATUS'; payload: number }
  | { type: 'SET_TASKS'; payload: Task[] };

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const TaskContext = createContext<{ state: TaskState; dispatch: React.Dispatch<TaskAction> } | undefined>(
  undefined
);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, status: 'Completed' } : task
        ),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
