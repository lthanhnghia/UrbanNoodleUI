import type  { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface MainLayoutProps {
  children: ReactNode;
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

export default function MainLayout({ children, activeMenu, onMenuClick }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeMenu={activeMenu} onMenuClick={onMenuClick} />
      <Topbar activeMenu={activeMenu} />
      <main className="ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
