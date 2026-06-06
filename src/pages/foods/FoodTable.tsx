
import { useRef } from "react";
import {baseURL} from "../../services/Request";
type Props = {
  food : any[]
  onEdit: (emp: any) => void;
  onDelete: (emp: any) => void;
   onLoadMore: (lastId: number) => void;
    onOpenUpdateModal: () => void;
};

const FoodTable = ({food,onEdit,onDelete,onLoadMore,onOpenUpdateModal}:Props) =>{
const tableRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const el = tableRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;

        // khi scroll gần chạm đáy (còn 50px)
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if (food.length > 0) {
                const lastId = food[food.length - 1].id;
                onLoadMore(lastId);
            }
        }
    };
   return(
    <div className="card">
            <div className="card-body"
            ref={tableRef}
                onScroll={handleScroll}
                style={{
                    maxHeight: "180px",   // 👈 bắt buộc phải có
                    overflowY: "auto"     // 👈 bật scroll
                }}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên</th>
                            <th  scope="col">Loại món</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {food.map((fd) => (
                            <tr key={fd.id}>
                                <td>
                                    <img src={baseURL+fd.image}
                                        className="img-thumbnail food-image" alt="..."
                                        
                                    />
                                </td>
                                <td>{fd.name}</td>
                                <td >{fd.categoryName}</td>
                                <td>{Number(fd.price).toLocaleString("vi-VN")}</td>
                                <td className="">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        
                                        onClick={() => {
                                            onEdit(fd);
                                            onOpenUpdateModal();
                                        }}
                                    >
                                        Sửa
                                    </button>
                                    <button type="button" 
                                    className="btn btn-danger "
                                    style = {{marginLeft: "8px"}}
                                    onClick={() => onDelete(fd)}
                                      >
                                        xóa
                                        </button>
                                </td>
                            </tr>
                            
                        ))}

                    </tbody>
                </table>
                
            </div>
        </div>
   )




}
export default FoodTable;