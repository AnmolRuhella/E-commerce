import { ReactNode } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
