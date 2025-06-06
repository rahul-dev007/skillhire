'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function RegisterPage() {
  const { setToken, setUser } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData();
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('role', 'user');
    if (image) form.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);

      if (res.status === 201 && res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        router.push('/login');
      } else {
        console.warn('⚠️ Unexpected response:', res.data);
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      console.error("❌ Registration error:", serverMessage || err.message);
      setError(serverMessage || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create Account</h2>

        {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}

        <div className="flex justify-center mb-4">
          <img
            src={image ? URL.createObjectURL(image) : '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback.png';
            }}
          />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute right-3 top-2.5 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
