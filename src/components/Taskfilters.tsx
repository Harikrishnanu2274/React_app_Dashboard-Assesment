// /src/components/TaskFilters.tsx
import React from 'react';

export const TaskFilters: React.FC<{ onFilter: (status: 'Pending' | 'Completed') => void }> = ({ onFilter }) => {
  return (
    <select onChange={(e) => onFilter(e.target.value as 'Pending' | 'Completed')}>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  );
};
