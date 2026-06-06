import { useState, useEffect } from "react";

type Props = {
  category: any | null,
  onClose: () => void;
  open: boolean;
  onSubmit: (data: any) => void
  errors: {
    name?: string[];
    description?: string[];

  };
}

const CategoryModalUpdate = ({ category, onClose, open, onSubmit, errors }: Props) => {
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
    } else if (name.length <= 2) {
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

  useEffect(() => {
    if (!category) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(category.name);
    setDescription(category.description)
    setClientErrors({
      name: "",
      description: "",
    });

  }, [category])

  const handleUpdate = () => {
    if (!validate()) return;
    const data = {
      ...category,
      name,
      description
    }
    onSubmit(data)
  }
  if (!open) return null;
  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Cập nhật Phân Loại</h1>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Tên phân loại</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-control ${clientErrors.name || errors.name?.length ? "is-invalid" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {(clientErrors.name || errors.name?.[0]) && (
                  <div className="invalid-feedback">
                    {clientErrors.name || errors.name?.[0]}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-control ${clientErrors.description || errors.description?.length ? "is-invalid" : ""}`}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              <button className="btn btn-primary" onClick={handleUpdate}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>


      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>
    </>
  );

}
export default CategoryModalUpdate;