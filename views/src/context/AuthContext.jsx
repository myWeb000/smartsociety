import { createContext, useContext, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize with Admin or last logged-in role
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('society_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      const user = data.data;
      localStorage.setItem('society_token', data.token);
      localStorage.setItem('society_user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('society_user');
    localStorage.removeItem('society_token');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
