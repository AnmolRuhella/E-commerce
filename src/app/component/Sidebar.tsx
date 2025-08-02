'use client';

import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r p-6">
      <h2 className="text-xl font-bold mb-8 text-black">Ecommerce</h2>
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => handleNavigate('/dashboard')}
          className="text-left text-black font-medium hover:text-blue-600 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigate('/product')}
          className="text-left text-black font-medium hover:text-blue-600 transition"
        >
          Products
        </button>
        <button
          onClick={() => handleNavigate('/setting')}
          className="text-left text-black font-medium hover:text-blue-600 transition"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
}
