'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function LoginCard() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!email || !password || (isSignup && !userName)) {
      toast.error('Please fill all required fields.');
      return false;
    }
    if (!email.includes('@')) {
      toast.warning('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      toast.warning('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isSignup) {
        const response = await axios.post('/api/auth/register', {
          email,
          userName,
          password,
        });
        toast.success(response.data.message || 'Registered successfully');
        setIsSignup(false);
        setUserName('');
        setEmail('');
        setPassword('');
      } else {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });
        toast.success(response.data.message || 'Logged in successfully');
        const token = response.data.authtoken;

        if (token) {
          localStorage.setItem('token', token);
          router.push('/dashboard');
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || 'Something went wrong');
      } else {
        console.error('Unexpected error:', err);
        toast.error('Unexpected error occurred');
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

          <CardFooter className="flex flex-col gap-3 mt-4">
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
