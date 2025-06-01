'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 👇 Make API request to backend
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error('API Error:', err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">SkillHire - Freelance Marketplace</h1>
      <p className="text-lg text-gray-700">Backend says: {message || 'Loading...'}</p>
     <h1 className="text-4xl font-bold text-green-500">✅ Tailwind is working!</h1>
    </main>
  );
}
