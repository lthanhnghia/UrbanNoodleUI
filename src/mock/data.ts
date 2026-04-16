import type { Table, Food, Category, Employee, Order, DashboardStats, TopFood } from "../types";

export const mockCategories: Category[] = [
  { id: 1, name: 'Món chính', description: 'Các món ăn chính' },
  { id: 2, name: 'Món phụ', description: 'Các món ăn phụ' },
  { id: 3, name: 'Đồ uống', description: 'Các loại nước uống' },
  { id: 4, name: 'Tráng miệng', description: 'Món tráng miệng' },
];

export const mockFoods: Food[] = [
  { id: 1, name: 'Phở bò', categoryId: 1, categoryName: 'Món chính', price: 50000, description: 'Phở bò truyền thống', status: 'Còn món' },
  { id: 2, name: 'Bún chả', categoryId: 1, categoryName: 'Món chính', price: 45000, description: 'Bún chả Hà Nội', status: 'Còn món' },
  { id: 3, name: 'Cơm tấm', categoryId: 1, categoryName: 'Món chính', price: 40000, description: 'Cơm tấm sườn bì chả', status: 'Còn món' },
  { id: 4, name: 'Gỏi cuốn', categoryId: 2, categoryName: 'Món phụ', price: 30000, description: 'Gỏi cuốn tôm thịt', status: 'Còn món' },
  { id: 5, name: 'Chả giò', categoryId: 2, categoryName: 'Món phụ', price: 35000, description: 'Chả giò giòn', status: 'Hết món' },
  { id: 6, name: 'Nước chanh', categoryId: 3, categoryName: 'Đồ uống', price: 15000, description: 'Nước chanh tươi', status: 'Còn món' },
  { id: 7, name: 'Trà đá', categoryId: 3, categoryName: 'Đồ uống', price: 5000, description: 'Trà đá miễn phí', status: 'Còn món' },
  { id: 8, name: 'Chè ba màu', categoryId: 4, categoryName: 'Tráng miệng', price: 25000, description: 'Chè ba màu truyền thống', status: 'Còn món' },
];

export const mockTables: Table[] = [
  { id: 1, tableNumber: '01', tableName: 'Bàn 1', description: 'Bàn cho 4 người', status: 'Trống' },
  { id: 2, tableNumber: '02', tableName: 'Bàn 2', description: 'Bàn cho 4 người', status: 'Đang sử dụng' },
  { id: 3, tableNumber: '03', tableName: 'Bàn 3', description: 'Bàn cho 6 người', status: 'Đang sử dụng' },
  { id: 4, tableNumber: '04', tableName: 'Bàn 4', description: 'Bàn cho 2 người', status: 'Trống' },
  { id: 5, tableNumber: '05', tableName: 'Bàn 5', description: 'Bàn cho 4 người', status: 'Trống' },
  { id: 6, tableNumber: '06', tableName: 'Bàn 6', description: 'Bàn cho 8 người', status: 'Đang sử dụng' },
];

export const mockEmployees: Employee[] = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', position: 'Quản lý', status: 'Đang làm' },
  { id: 2, name: 'Trần Thị B', phone: '0902345678', position: 'Phục vụ', status: 'Đang làm' },
  { id: 3, name: 'Lê Văn C', phone: '0903456789', position: 'Đầu bếp', status: 'Đang làm' },
  { id: 4, name: 'Phạm Thị D', phone: '0904567890', position: 'Phục vụ', status: 'Đang làm' },
  { id: 5, name: 'Hoàng Văn E', phone: '0905678901', position: 'Thu ngân', status: 'Nghỉ việc' },
];

export const mockOrders: Order[] = [
  { id: 1, orderCode: 'ORD001', tableId: 2, tableNumber: '02', totalAmount: 145000, orderTime: '2024-01-15 12:30', status: 'Hoàn thành' },
  { id: 2, orderCode: 'ORD002', tableId: 3, tableNumber: '03', totalAmount: 230000, orderTime: '2024-01-15 13:00', status: 'Đang xử lý' },
  { id: 3, orderCode: 'ORD003', tableId: 6, tableNumber: '06', totalAmount: 320000, orderTime: '2024-01-15 13:15', status: 'Đang xử lý' },
  { id: 4, orderCode: 'ORD004', tableId: 1, tableNumber: '01', totalAmount: 95000, orderTime: '2024-01-15 14:00', status: 'Hoàn thành' },
  { id: 5, orderCode: 'ORD005', tableId: 4, tableNumber: '04', totalAmount: 120000, orderTime: '2024-01-15 14:30', status: 'Đã hủy' },
];

export const mockDashboardStats: DashboardStats = {
  revenue: 5280000,
  customerCount: 142,
  orderCount: 48,
  topFood: 'Phở bò',
};

export const mockTopFoods: TopFood[] = [
  { name: 'Phở bò', orderCount: 24, revenue: 1200000 },
  { name: 'Bún chả', orderCount: 18, revenue: 810000 },
  { name: 'Cơm tấm', orderCount: 15, revenue: 600000 },
  { name: 'Gỏi cuốn', orderCount: 12, revenue: 360000 },
  { name: 'Chả giò', orderCount: 10, revenue: 350000 },
];
