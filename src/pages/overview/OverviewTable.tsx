
type Props = {
    topfoods: any[];
    
};

const OverviewTable = ({ topfoods }: Props) =>{
    return(
         <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Món ăn được đặt nhiều</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-hover w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên món</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số lần đặt</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {topfoods.map((food) => (
                <tr key={food.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{food.foodName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{food.totalOrders}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{food.revenue?.toLocaleString('vi-VN')} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}
export default OverviewTable;