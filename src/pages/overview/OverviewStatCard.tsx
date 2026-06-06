import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

type Props = {
   totalAmount?: number;
   numberAccount?: number;
   numberOrder?: number;
   foodName?: string;
   totalSold?: number;
};

const StatCard = ({ totalAmount, numberAccount, numberOrder, foodName, totalSold }: Props) => {
 console.log(totalAmount);

  return (
    <div className="row g-4 mb-4 mt-3">

      {/* Doanh thu */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="bg-white rounded shadow p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="bg-primary p-3 rounded">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
          <h6 className="text-muted mb-1">Doanh thu</h6>
          <p className="">
            {totalAmount?.toLocaleString('vi-VN')} đ
          </p>
        </div>
      </div>

      {/* Nhân viên */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="bg-white rounded shadow p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="bg-success p-3 rounded">
              <Users className="text-white" size={24} />
            </div>
          </div>
          <h6 className="text-muted mb-1">Tổng số nhân viên</h6>
          <p className="">
            {numberAccount}
          </p>
        </div>
      </div>

      {/* Đơn hàng */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="bg-white rounded shadow p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="bg-warning p-3 rounded">
              <ShoppingBag className="text-white" size={24} />
            </div>
          </div>
          <h6 className="text-muted mb-1">Tổng số đơn hàng</h6>
          <p className="">
            {numberOrder}
          </p>
        </div>
      </div>

      {/* Top món */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="bg-white rounded shadow p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="bg-secondary p-3 rounded">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
          <h6 className="text-muted mb-1">Món ăn được đặt nhiều nhất</h6>
          <p className="">
            {foodName} ({totalSold} lần)
          </p>
        </div>
      </div>

    </div>
  )
}
export default StatCard;