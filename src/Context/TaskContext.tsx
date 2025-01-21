import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();

        // Clean and replace placeholder data with meaningful values
        const cleanedTasks = data.map((task: any) => ({
          id: task.id,
          title: replacePlaceholderText(task.title), // Replace unwanted text in title
          description: "No description provided", // Default description
          priority: 'Low', // Default priority
          status: task.completed ? 'Completed' : 'Pending',
        }));

        // Dispatch cleaned tasks to the reducer
        dispatch({ type: 'SET_TASKS', payload: cleanedTasks });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Function to replace placeholder text with meaningful content
const replacePlaceholderText = (text: string): string => {
  const placeholderReplacements: Record<string, string> = {
    "delectus aut autem": "Complete Project A",
    "quis ut nam facilis et officia qui": "Finish documentation for Project B",
    "fugiat veniam minus": "Prepare the budget report",
    "et porro tempora": "Conduct meeting with team",
    "laboriosam mollitia et enim quasi adipisci quia provident illum": "Complete the testing phase",
    "qui ullam ratione quibusdam voluptatem quia omnis": "Implement feature X",
    "illo expedita consequatur quia in": "Resolve client issue #124",
    "quo adipisci enim quam ut ab": "Review project proposal",
    "molestiae perspiciatis ipsa": "Fix bug in user authentication",
    "illo est ratione doloremque quia maiores aut": "Prepare final presentation",
    "vero rerum temporibus dolor": "Write a report on sales data",
    // Add more replacements as needed...
  };

  return placeholderReplacements[text] || text; // Replace if found, else return original text
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
