'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      <nav className="flex gap-6">
        <button
          onClick={() => handleNavigate('/dashboard')}
          className="text-black font-medium hover:text-blue-600 transition"
        >
          Home
        </button>
        <button
          onClick={() => handleNavigate('/profile')}
          className="text-black font-medium hover:text-blue-600 transition"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-red-600 font-medium hover:underline transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
