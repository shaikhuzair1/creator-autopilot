import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return { isCollapsed, toggleCollapse };
};