import type { FoodRequest,Food } from "../../types"
import { useState, useEffect } from "react";
type Props = {
    foods: Food | null;
    onSubmit: (data: any) => void;
}


const FoodModalUpdate = ({ foods, onSubmit }: Props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(0);
   
     const [fileImage, setFileImage] = useState<File | null>(null);
    const handleSubmit = () => {
    const data: FoodRequest = {
         ...foods,
          name,
          price,
          categoryId,
          fileImage
        };
    

    onSubmit(data); // 🔥 gửi lên cha
  };
    useEffect(() => {
    if (!foods) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(foods.name);
    setPrice(foods.price)
    setCategoryId(foods.categoryId);
   
    
  }, [foods]);

   return (
        <div className="modal fade " id="exampleModalUpdate" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Cập nhật món ăn</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body  align-items-start">
                        <div className="mb-3">
                            <label className="form-label">Tên món ăn</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên món ăn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Đơn giá</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Nhập đơn giá món ăn"
                                value={price}
                                onChange={(e) => setPrice(e.target.valueAsNumber)}
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Loại món ăn</label>
                            <select className="form-select"
                                aria-label="Default select example"
                                value={categoryId}
                               onChange={(e) => setCategoryId(Number(e.target.value))}
                            >
                                <option value={1}>mì cay</option>
                                <option value={2}>lẩu thái</option>
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
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            hủy
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit} >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FoodModalUpdate;
