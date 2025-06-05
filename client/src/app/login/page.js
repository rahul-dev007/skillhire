'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6]">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link href="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
          <Link href="/register" className="hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
