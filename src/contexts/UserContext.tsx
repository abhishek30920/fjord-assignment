import React, { createContext, useState, ReactNode } from 'react';
import { UserContextType } from '../types/user.types';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

// Creating context with default values
export const UserContext = createContext<UserContextType>({
  username: '',
  setUsername: () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const location = useLocation();
  
  // Check if current route is dashboard
  const isDashboard = location.pathname === '/dashboard';

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {/* Only render Header if we're not on the dashboard */}
      {!isDashboard && <Header />}
      
      {/* Render the children components */}
      {children}
    </UserContext.Provider>
  );
};