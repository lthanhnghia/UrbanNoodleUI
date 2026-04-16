import { useState,useEffect } from "react";
import type { Category } from "../../types";
type Props = {
    category : Category | null,
    onSubmit : (data:any) =>void
}

const CategoryModalUpdate = ({category,onSubmit}:Props) =>{
     const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
     if (!category) return;
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(category.name);
     setDescription(category.description)

    },[category])
    const handleUpdate = ()=>{
        const data = {
            ...category,
            name,
            description
        }
        onSubmit(data)
    }
    return (
        <div className="modal fade " id="exampleModalUpdate" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Cập nhật Phân Loại</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body  align-items-start">
                        <div className="mb-3">
                            <label className="form-label">Tên phân Loại</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên phân loại"
                             value={name}
                             onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mô tả</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1"
                             rows={3}
                            value={description}
                            onChange={(e) =>setDescription(e.target.value)}
                             >

                             </textarea>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            hủy
                        </button>
                        <button type="button" className="btn btn-primary" 
                         onClick={handleUpdate}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default CategoryModalUpdate;