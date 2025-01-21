// /src/components/TaskSearchBar.tsx
import React from 'react';

export const TaskSearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};
