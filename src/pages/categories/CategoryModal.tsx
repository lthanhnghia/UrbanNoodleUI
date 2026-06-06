import { useEffect, useState } from "react"

type Props = {
  onSubmit: (data: any) => void
  open: boolean;
  onClose: () => void;
  resetKey: number;
  errors: {
    name?: string[];
    description?: string[];
  };
}


const CategoryModal = ({ onSubmit, open, onClose, resetKey, errors }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientErrors, setClientErrors] = useState({
    name: "",
    description: "",
  });
  const validate = () => {
    const errors: any = {};

    if (!name.trim()) {
      errors.name = "Không được để trống tên phân loại";
    }else if (name.length <= 2) {
      errors.name = "Tên phân loại tối thiểu 2 ký tự";
    }

    if (!description.trim()) {
      errors.description = "Không được để trống mô tả";
    } else if (description.length <= 10) {
      errors.description = "Mô tả tối thiểu 10 ký tự";
    }


    setClientErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddCategory = () => {
    if (!validate()) return;
    const data = {
      name,
      description
    }
    onSubmit(data);
  }
  useEffect(() => {
    setName("");
    setDescription("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  if (!open) return null;
  return (
    <>
      {/* backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      {/* modal */}
      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5">Thêm Phân Loại</h1>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                 <label className="form-label">Họ và tên</label>
                <input
                  className={`form-control ${clientErrors.name || errors.name?.length ? "is-invalid" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên phân loại"
                />
                 {(clientErrors.name || errors.name?.[0]) && (
                  <div className="invalid-feedback">
                    {clientErrors.name || errors.name?.[0]}
                  </div>
                )}
              </div>
              
              <div className="mb-3">
              <textarea
                className={`form-control ${clientErrors.description || errors.description?.length ? "is-invalid" : ""}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả"
              />
               {(clientErrors.description || errors.description?.[0]) && (
                  <div className="invalid-feedback">
                    {clientErrors.description || errors.description?.[0]}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Hủy
              </button>
              <button className="btn btn-primary" onClick={handleAddCategory}>
                Thêm
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryModal