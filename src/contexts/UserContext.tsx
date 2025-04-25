import React, { createContext, useState, ReactNode } from 'react';
import { UserContextType } from '../types/user.types';
import Header from '../components/Header';

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

  return (
   
    <UserContext.Provider value={{ username, setUsername }}>
      <Header/>
      {children}
    </UserContext.Provider>
  );
};