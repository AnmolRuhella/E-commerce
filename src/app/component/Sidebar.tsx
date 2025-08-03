'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false); // Close sidebar on navigation
  };

  // Optional: Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white shadow-lg border-r border-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-10 text-center">Ecommerce</h2>

        <nav className="flex flex-col gap-4">
          <Button
            onClick={() => handleNavigate('/dashboard')}
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 bg-blue-900"
          >
            Dashboard
          </Button>
          <Button
            onClick={() => handleNavigate('/product')}
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 bg-blue-900"
          >
            Products
          </Button>
          <Button
            onClick={() => handleNavigate('/setting')}
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 bg-blue-900"
          >
            Settings
          </Button>
        </nav>
      </aside>

      {/* Sidebar drawer for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <aside
            className="absolute top-0 left-0 w-64 h-full bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white shadow-lg border-r border-gray-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-10 text-center">Ecommerce</h2>

            <nav className="flex flex-col gap-4">
              <Button
                onClick={() => handleNavigate('/dashboard')}
                className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 bg-blue-900"
              >
                Dashboard
              </Button>
              <Button
                onClick={() => handleNavigate('/product')}
                className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 bg-blue-900"
              >
                Products
              </Button>
              <Button
                onClick={() => handleNavigate('/setting')}
                className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 bg-blue-900"
              >
                Settings
              </Button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
