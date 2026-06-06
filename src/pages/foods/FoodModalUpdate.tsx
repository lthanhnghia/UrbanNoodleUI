
import { useState, useEffect } from "react";
type Props = {
    foods: any | null;
    onSubmit: (data: any) => void;
    onClose: () => void;
    open: boolean;
    categories: any[]
     errors: {
        name?: string[];
        price?: string[];
    };
}


const FoodModalUpdate = ({ foods, onClose, open, onSubmit, categories, errors }: Props) => {
    const [name, setName] = useState("");
    const [displayPrice, setDisplayPrice] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [categoryId, setCategoryId] = useState<number>(0);

    const [fileImage, setFileImage] = useState<File | null>(null);
     const [clientErrors, setClientErrors] = useState({
        name: "",
        price: "",
        fileImage: "",
    });
    const formatNumber = (value: string) => {
        const number = Number(value);
        return number.toLocaleString("vi-VN");
    };
     const validate = () => {

        const errors: any = {};

        if (!name.trim()) {
            errors.name = "Không được để trống tên món ăn";
        } else if (name.length <= 2) {
            errors.name = "Tên món ăn tối thiểu 2 ký tự";
        }
        if (price === null || price <= 0) {
            errors.price = "Đơn giá phải lớn hơn 0";
        }
    
        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = () => {
          if (!validate()) return;
        const data = {
            ...foods,
            name,
            price,
            categoryId,
            fileImage
        };


        onSubmit(data); // 🔥 gửi lên cha
    };
    useEffect(() => {
        if (!foods || categories.length === 0) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setName(foods.name);
        setPrice(foods.price);
        setDisplayPrice(formatNumber(String(foods.price)));
        const matchedCategory = categories.find(
            (c) => c.name === foods.categoryName
        );

        setCategoryId(matchedCategory?.id || 0);
    }, [foods, categories]);

    if (!open) return null;
    return (
        <>
            <div
                className="modal-backdrop fade show"
                onClick={onClose}
            ></div>
            <div className="modal fade show d-block" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cập nhật món ăn</h1>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body  align-items-start">
                            <div className="mb-3">
                                <label className="form-label">Tên món ăn</label>
                                <input
                                    type="text"
                                     className={`form-control ${clientErrors.name || errors.name?.length ? "is-invalid" : ""}`}
                                    placeholder="Nhập tên món ăn"
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
                                <label className="form-label">Đơn giá</label>
                                <input
                                    type="text"
                                   className={`form-control ${clientErrors.price || errors.price?.length ? "is-invalid" : ""}`}
                                    placeholder="Nhập đơn giá món ăn"
                                    value={displayPrice}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/\D/g, "");

                                        if (!raw) {
                                            setPrice(null);
                                            setDisplayPrice("");
                                            return;
                                        }

                                        const numericValue = Number(raw);

                                        setPrice(numericValue);
                                        setDisplayPrice(formatNumber(raw));
                                    }}
                                />
                                {(clientErrors.price || errors.price?.[0]) && (
                                    <div className="invalid-feedback">
                                        {clientErrors.price || errors.price?.[0]}
                                    </div>
                                )}

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại món ăn</label>
                                <select className="form-select"
                                    aria-label="Default select example"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                >
                                    {Array.isArray(categories) &&
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ảnh</label>
                                <input className="form-control form-control-sm"
                                    id="formFileSm" type="file"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFileImage(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                hủy
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit} >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FoodModalUpdate;
