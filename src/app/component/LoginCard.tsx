'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginCard() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await axios.post('/api/auth/register', {
          email,
          userName,
          password,
        });

        alert('Registration successful! You can now log in.');
        setIsSignup(false);
        setUserName('');
        setEmail('');
        setPassword('');
      } else {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });

        const token = response.data.authtoken;

        if (token) {
          localStorage.setItem('token', token);
          router.push('/dashboard');
        } else {
          setError('Login failed: Token not received');
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Something went wrong');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md mx-auto mt-20 border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        {isSignup ? 'Sign Up' : 'Login'}
      </h2>

      {error && (
        <p className="mb-4 text-red-600 text-sm text-center font-medium">
          {error}
        </p>
      )}

      {isSignup && (
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {isSignup ? 'Register' : 'Login'}
      </button>

      <p className="text-center mt-5 text-sm font-medium text-black">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 hover:underline font-semibold"
        >
          {isSignup ? 'Login' : 'Register'}
        </button>
      </p>
    </form>
  );
}
