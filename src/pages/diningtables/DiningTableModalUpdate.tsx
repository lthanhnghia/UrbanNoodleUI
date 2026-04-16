import { useState,useEffect } from "react";
import type { DiningTableRequest,DiningTable } from "../../types";


type Props = {
     diningtable: DiningTable | null;
     onSubmit: (data: any) => void;
};


const DiningTableModalUpdate= ({diningtable, onSubmit  }: Props) => {
     
     const [name, setName] = useState("");
     
    const handleSubmit = () => {
    const data: DiningTableRequest = {
             ...diningtable,
              name,
            };

    onSubmit(data); 
  };
  useEffect(() => {
      if (!diningtable) return;
  
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(diningtable.name);
      
    }, [diningtable]);

    return (
        <div className="modal fade " id="exampleModalUpdate" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm bàn ăn</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body  align-items-start">
                        <div className="mb-3">
                            <label className="form-label">Tên bàn ăn</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên bàn ăn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            hủy
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Cập nhật
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DiningTableModalUpdate;