'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
        await axios.post('/api/auth/register', { email, userName, password });
        alert('Registration successful! You can now log in.');
        setIsSignup(false);
        setUserName('');
        setEmail('');
        setPassword('');
      } else {
        const response = await axios.post('/api/auth/login', { email, password });
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4 py-8 sm:py-0">
      <Card className="w-full max-w-sm sm:max-w-md border-gray-700 bg-gray-900 text-white shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isSignup ? 'Sign Up' : 'Login'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <p className="text-sm text-red-400 text-center font-medium">{error}</p>
            )}

            {isSignup && (
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-3">
            <Button type="submit" className="w-full bg-blue-900">
              {isSignup ? 'Register' : 'Login'}
            </Button>

            <p className="text-sm text-gray-300 text-center">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-400 hover:underline font-medium"
              >
                {isSignup ? 'Login' : 'Register'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
