import type { Employee } from "../../types";
import { useState, useEffect } from "react";
type Props = {
  employee: Employee | null;
  onClose: () => void;
  onSubmit: (data: Employee) => void;
   open: boolean;
};

const EmployeeModalUpdate = ({ open,onClose,employee, onSubmit }: Props) => {
    const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    if (!employee) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFullName(employee.fullname);
    setPhone(employee.phone);
    setRole(employee.role);
  }, [employee]);
  const handleUpdate = () => {
    if (!employee) return;

    const data: Employee = {
      ...employee,
      fullname,
      phone,
      role,
    };

    onSubmit(data);
  };
  if (!open) return null;
    return (
    <div className="">
        <div
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          
          <div className="modal-header">
            <h1 className="modal-title fs-5">Cập nhật Nhân Viên</h1>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>


            <div className="mb-3">
              <label className="form-label">Chức vụ</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Quản lý</option>
                <option value="staff">Nhân viên</option>
              </select>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button className="btn btn-primary"   onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}
export default EmployeeModalUpdate;