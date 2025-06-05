'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);
  };

const register = async (name, email, password, profileImage) => {
  const res = await axios.post('http://localhost:5000/api/auth/register', {
    username: name,
    email,
    password,
    role: 'user',
    profileImage, // ✅ নতুন যোগ করা image URL
  });

  if (res.data.token && res.data.user) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);
  } else {
    console.warn("Registration successful but no token/user returned");
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
