import React from 'react';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <main className="pb-24 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}