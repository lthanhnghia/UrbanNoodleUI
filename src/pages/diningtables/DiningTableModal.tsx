import { useEffect, useState } from "react";



type Props = {
    onSubmit: (data: any) => void;
    open: boolean;
    onClose: () => void;
    resetKey: number;
    errors: {
        name?: string[];
        description?: string[];
    };
};


const DiningTableModal = ({ onSubmit, open, onClose, resetKey, errors }: Props) => {

    const [name, setName] = useState("");
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

        setClientErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const handleSubmit = () => {
        if (!validate()) return;
        const data = {
            name,
        };

        onSubmit(data);
    };
    useEffect(() => {
        setName("");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetKey]);
    if (!open) return null;
    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show d-block " >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm bàn ăn</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body  align-items-start">
                            <div className="mb-3">
                                <label className="form-label">Tên bàn ăn</label>
                                <input
                                    type="text"
                                    className={`form-control ${clientErrors.name || errors.name?.length ? "is-invalid" : ""}`}
                                    placeholder="Nhập tên bàn ăn"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {(clientErrors.name || errors.name?.[0]) && (
                                    <div className="invalid-feedback">
                                        {clientErrors.name || errors.name?.[0]}
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                hủy
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DiningTableModal;