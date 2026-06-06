import type { Employee } from "../../types";
import { useState, useEffect } from "react";
type Props = {
  employee: Employee | null;
  onClose: () => void;
  onSubmit: (data: Employee) => void;
   open: boolean;
   errors: {
    phone?: string[];
    fullname?: string[];
    password?: string[];
    role?: string[];
  };
};

const EmployeeModalUpdate = ({ open,onClose,employee, onSubmit, errors }: Props) => {
    const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");
  const [localErrors, setLocalErrors] = useState({
    phone: [] as string[],
    fullname: [] as string[],
    password: [] as string[],
    role: [] as string[],
  });

  useEffect(() => {
    if (!employee) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFullName(employee.fullname);
    setPhone(employee.phone);
    setRole(employee.role);
  }, [employee]);
  const handleUpdate = () => {
    if (!employee) return;

    // Validation
    const newErrors = {
      phone: [] as string[],
      fullname: [] as string[],
      password: [] as string[],
      role: [] as string[],
    };
    if (!fullname.trim()) {
      newErrors.fullname = ["Họ và tên không được để trống"];
    }
    if (!phone.trim()) {
      newErrors.phone = ["Số điện thoại không được để trống"];
    }

    setLocalErrors(newErrors);

    if (newErrors.fullname.length > 0 || newErrors.phone.length > 0) {
      return;
    }

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
                  className={`form-control ${(localErrors.fullname?.length || errors.fullname?.length) ? "is-invalid" : ""}`}
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
              {(localErrors.fullname && localErrors.fullname.length > 0) && (
                <div className="invalid-feedback">
                  {localErrors.fullname[0]}
                </div>
              )}
              {(!localErrors.fullname || localErrors.fullname.length === 0) && errors.fullname && errors.fullname.length > 0 && (
                <div className="invalid-feedback">
                  {errors.fullname[0]}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className={`form-control ${(localErrors.phone?.length || errors.phone?.length) ? "is-invalid" : ""}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {(localErrors.phone && localErrors.phone.length > 0) && (
                  <div className="invalid-feedback">
                    {localErrors.phone[0]}
                  </div>
                )}
              {(!localErrors.phone || localErrors.phone.length === 0) && errors.phone && errors.phone.length > 0 && (
                  <div className="invalid-feedback">
                    {errors.phone[0]}
                  </div>
                )}
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