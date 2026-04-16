export interface DiningTable {
  id: number;
  name: string;
  status: 'Trống' | 'Đang sử dụng';
}
export interface DiningTableRequest {
  name: string;
}
export interface Food {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  price: number;
  image: string;
}
export interface FoodRequest {
  id?: number;
  name: string;
  price: number;
  categoryId: number;
  fileImage: File | null;
}
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Employee {
  id: number;
  fullname: string;
  phone: string;
  status: 'Đang làm' | 'Nghỉ việc';
  role: string
}

export interface Order {
  id: number;
  orderCode: string;
  tableId: number;
  tableNumber: string;
  totalAmount: number;
  orderTime: string;
  status: 'Đang xử lý' | 'Hoàn thành' | 'Đã hủy';
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  foodId: number;
  foodName: string;
  quantity: number;
  price: number;
}

export interface DashboardStats {
  revenue: number;
  customerCount: number;
  orderCount: number;
  topFood: string;
}

export interface TopFood {
  name: string;
  orderCount: number;
  revenue: number;
}
