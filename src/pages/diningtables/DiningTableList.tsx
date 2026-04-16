import type { DiningTable } from "../../types";

type Props = {
  diningtable: DiningTable[];
  onEdit: (emp: any) => void;
  onDelete: (emp: any) => void;
};


const DiningTableList = ({ diningtable,onEdit,onDelete}: Props) =>{
      

    return (
        <div className="card">
            <div className="card-body">
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
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModalUpdate"
                                       onClick={() => onEdit(dt)}
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