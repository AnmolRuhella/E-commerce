'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false); // Close mobile menu on navigate
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    setIsMenuOpen(false); 
     toast.success('Logged out sucessfully');
  };

  return (
    <header className="w-full bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center shadow-md relative">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-4">
        <Button
          onClick={() => handleNavigate('/dashboard')}
          className="text-white font-medium hover:text-blue-400 transition-colors bg-blue-900"
        >
          Home
        </Button>

        <Button
          onClick={() => handleNavigate('/profile')}
          className="text-white font-medium hover:text-blue-400 transition-colors bg-blue-900"
        >
          Profile
        </Button>

        <Button
          onClick={handleLogout}
          className="text-white font-medium hover:underline transition-colors"
          variant="destructive"
        >
          Logout
        </Button>
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg flex flex-col gap-2 p-2 z-50 md:hidden">
          <Button
            onClick={() => handleNavigate('/dashboard')}
            className="w-full text-left text-white font-medium hover:text-blue-400 bg-blue-900"
          >
            Home
          </Button>

          <Button
            onClick={() => handleNavigate('/profile')}
            className="w-full text-left text-white font-medium hover:text-blue-400 bg-blue-900"
          >
            Profile
          </Button>

          <Button
            onClick={handleLogout}
            className="w-full text-left text-white font-medium hover:underline"
            variant="destructive"
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}
