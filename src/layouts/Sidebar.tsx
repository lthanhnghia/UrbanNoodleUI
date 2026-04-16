import { LayoutDashboard, Utensils, Layers , Users, BarChart3, Table } from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

export default function Sidebar({ activeMenu, onMenuClick }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'orders', label: 'Quản lý đơn hàng', icon: BarChart3 },
    { id: 'tables', label: 'Quản lý bàn', icon: Table },
    { id: 'foods', label: 'Quản lý món ăn', icon: Utensils },
    { id: 'categories', label: 'Quản lý loại món', icon: Layers  },
    { id: 'employees', label: 'Quản lý nhân viên', icon: Users },
    
  ];

  return (
    <div className="bg-blue-600 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Nhà hàng</h1>
        <p className="text-sm text-blue-200 mt-1">Hệ thống quản lý</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onMenuClick(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-blue-500 border-l-4 border-white'
                  : 'hover:bg-blue-700'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
