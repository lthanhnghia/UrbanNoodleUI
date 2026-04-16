

const OrderTable = () =>{
    return(
        <div className="bg-white rounded-lg shadow overflow-hidden mt-5">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách đơn hàng</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-hover w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mã đơn hàng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bàn</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời gian</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              
                <tr >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium"></td>
                  <td className="px-6 py-4 text-sm text-gray-800"></td>
                  <td className="px-6 py-4 text-sm text-gray-800"></td>
                  <td className="px-6 py-4 text-sm text-gray-800"></td>
                  <td className="px-6 py-4">
                    <span>
                      
                    </span>
                  </td>
                </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    )
}
export default OrderTable;