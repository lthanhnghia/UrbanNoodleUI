import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  resetKey: number;
  errors: {
    phone?: string[];
    fullname?: string[];
    password?: string[];
    role?: string[];
  };
};

const EmployeeModal = ({ open, onClose, onSubmit, resetKey, errors }: Props) => {
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");
  const [clientErrors, setClientErrors] = useState({
    fullName: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    setPassword("");
    setFullName("");
    setPhone("");
    setRole("admin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);
  const validate = () => {
    const errors: any = {};

    if (!fullName.trim()) {
      errors.fullName = "Không được để trống họ tên";
    }

    if (!phone.trim()) {
      errors.phone = "Không được để trống số điện thoại";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Số điện thoại phải 10 số";
    }

    if (!password.trim()) {
      errors.password = "Không được để trống mật khẩu";
    } else if (password.length < 6) {
      errors.password = "Mật khẩu tối thiểu 6 ký tự";
    }

    setClientErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data = {
      password,
      fullName,
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
              <h1 className="modal-title fs-5">Thêm Nhân Viên</h1>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  className={`form-control ${clientErrors.fullName || errors.fullname?.length ? "is-invalid" : ""}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {(clientErrors.fullName || errors.fullname?.[0]) && (
                  <div className="invalid-feedback">
                    {clientErrors.fullName || errors.fullname?.[0]}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className={`form-control ${clientErrors.phone || errors.phone?.length ? "is-invalid" : ""}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {(clientErrors.phone || errors.phone?.[0]) && (
                  <div className="invalid-feedback">
                    {clientErrors.phone || errors.phone?.[0]}
                  </div>
                )}

              </div>

              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className={`form-control ${clientErrors.password || errors.password?.length ? "is-invalid" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {(clientErrors.password || errors.password?.[0]) && (
                  <div className="invalid-feedback">
                    {clientErrors.password || errors.password?.[0]}
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
              <button className="btn btn-primary" onClick={handleSubmit}>
                Thêm
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;