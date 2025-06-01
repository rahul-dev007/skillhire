'use client';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-xl">Welcome, {user?.username}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout} className="bg-red-500 text-white p-2 mt-4">
        Logout
      </button>
    </div>
  );
}

