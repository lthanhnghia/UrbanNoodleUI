import { User } from 'lucide-react';

interface TopbarProps {
  activeMenu: string;
}
const Topbar = ({ activeMenu }: TopbarProps) => {
  const titleMap: Record<string, string> = {
    dashboard: "Tổng quan",
    tables: "Quản lý bàn",
    foods: "Quản lý món ăn",
    categories: "Quản lý phân loại",
    employees: "Quản lý nhân viên",
    orders: "Quản lý đơn hàng"
  };
  return (
    <div className="bg-white shadow-sm h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {titleMap[activeMenu] || "Quản lý nhà hàng"}
          </h2>
        </div>

        <div className="flex items-center space-x-4">


          <div className="flex items-center space-x-2 pl-4 ">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Topbar;