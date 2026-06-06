import { useRef } from "react";

type Props = {
  diningtable: any[];
   onLoadMore: (lastId: number) => void;
  onEdit: (emp: any) => void;
  onDelete: (emp: any) => void;
   onOpenUpdateModal: () => void;
};


const DiningTableList = ({ diningtable,onLoadMore,onEdit,onDelete,onOpenUpdateModal}: Props) =>{
    const tableRef = useRef<HTMLDivElement>(null);
      const handleScroll = () => {
        const el = tableRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;

        // khi scroll gần chạm đáy (còn 50px)
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if (diningtable.length > 0) {
                const lastId = diningtable[diningtable.length - 1].id;
                onLoadMore(lastId);
            }
        }
    };

    return (
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
                            <th scope="col">Tên bàn</th>
                            <th scope="col">Trạng thái</th>
                           
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {diningtable.map((dt) => (
                            <tr key={dt.id}>
                                <td>{dt.name}</td>
                                <td>{dt.status}</td>
                                <td className="flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                       onClick={() => {
                                         onEdit(dt);
                                         onOpenUpdateModal();
                                       }}
                                    >
                                        Sửa
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                       onClick={() => onDelete(dt)}
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
export default DiningTableList