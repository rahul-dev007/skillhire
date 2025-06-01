'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error('Register failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 pr-10 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <button
              type="button"
              className="absolute top-3 right-3 text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-100 transition"
          >
            Register
          </button>
        </form>
        <p className="text-white mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="underline text-purple-100 hover:text-white">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
