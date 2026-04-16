import type { Category } from "../../types";

type Props = {
  category: Category[];
  onEdit: (data:any) => void;
  onDelete: (data:any) => void
};

const CategoryTable = ({ category,onEdit,onDelete}: Props) => {
   
     
    return (
        <div className="card">
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tên loại</th>
                            <th scope="col">Mô tả</th>
                           
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {category.map((ct) => (
                            <tr key={ct.id}>
                                <td>{ct.name}</td>
                                <td>{ct.description}</td>
                                <td className="flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModalUpdate"
                                       onClick={()=> onEdit(ct)}
                                    >
                                        Sửa
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                      
                                      onClick={()=> onDelete(ct)}
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
export default CategoryTable;