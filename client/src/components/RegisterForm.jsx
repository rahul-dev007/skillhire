'use client';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('✅ Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white space-y-4">
      <h2 className="text-2xl font-semibold text-center">Register</h2>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required
          className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required
          className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required
          className="w-full p-2 border rounded" />
        <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}
