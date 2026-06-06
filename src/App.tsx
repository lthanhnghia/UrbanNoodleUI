
import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/overview/OverviewPage';
import DiningTableManagement from './pages/diningtables/DiningTableManagement';
import FoodManagement from './pages/foods/FoodManagement';
import CategoryManagement from './pages/categories/CategoryManagement';
import EmployeeManagement from './pages/employees/EmployeeManagement';
import OrderManagement from './pages/order/OrderManagement';
function App() {
   const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderPage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'tables':
        return <DiningTableManagement />;
      case 'foods':
        return <FoodManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'employees':
        return <EmployeeManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/admin" element={
          <MainLayout activeMenu={activeMenu} onMenuClick={setActiveMenu}>
            {renderPage()}
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
