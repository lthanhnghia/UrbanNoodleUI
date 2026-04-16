import type { Employee } from "../../types";
import { useRef } from "react";


type Props = {
  employees: any[];
  onEdit: (emp: Employee) => void;
   onDelete: (e: Employee) => void;
    onLoadMore: (lastId: number) => void;
      onOpenUpdateModal: () => void;
};

const EmployeeTable = ({ employees, onEdit, onDelete,onLoadMore, onOpenUpdateModal }: Props) => {
    const tableRef = useRef<HTMLDivElement>(null);
const handleScroll = () => {
    const el = tableRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    // khi scroll gần chạm đáy (còn 50px)
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (employees.length > 0) {
        const lastId = employees[employees.length - 1].id;
        onLoadMore(lastId);
      }
    }
  };

  

  return (
    <div className="card">
      <div
        className="card-body"
       ref={tableRef}
        onScroll={handleScroll}
        style={{
          maxHeight: "180px",   // 👈 bắt buộc phải có
          overflowY: "auto"     // 👈 bật scroll
        }}
        
      >
        <table className="table">
          <thead>
            <tr>
              <th>Họ Tên</th>
              <th>Số điện thoại</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.fullname}</td>
                <td>{e.phone}</td>
                <td>
                   {e.role==='admin' ? 'Quản lý' : 'Nhân viên'}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${e.isdelete
                        ? 'bg-red-500'
                        : 'bg-green-500'
                      }`}
                  >
                    {e.isdelete ? 'Đã xóa' : 'Đang hoạt động'}
                  </span>

                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-primary"
                    
                    onClick={() => {
                      onEdit(e);
                      onOpenUpdateModal();
                    }}
                  >
                    Sửa
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(e)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

        
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EmployeeTable;