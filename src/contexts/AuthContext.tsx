"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IUser } from '@/interfaces/api/IUser';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUserVal = Cookies.get('user');
  const currentUser = currentUserVal ? JSON.parse(currentUserVal) : null;
  const currentToken: string | null  = Cookies.get('token') ?? null;

  const [user, setUser] = useState<IUser | null>(currentUser);
  const [token, setToken] = useState<string |  null>(currentToken);

  const login = (user: IUser, token: string) => {
    setUser(user);
    setToken(token);
    Cookies.set('user', JSON.stringify(user));
    Cookies.set('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('user');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
