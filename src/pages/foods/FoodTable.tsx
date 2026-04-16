import type { Food } from "../../types";

type Props = {
  food : Food[]
  onEdit: (emp: any) => void;
  onDelete: (emp: any) => void;
};

const FoodTable = ({food,onEdit,onDelete}:Props) =>{
      

   return(
    <div className="card">
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Loại món</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {food.map((fd) => (
                            <tr key={fd.id}>
                                <td>
                                    <img src={fd.image}
                                        className="img-thumbnail food-image" alt="..."
                                        
                                    />
                                </td>
                                <td>{fd.name}</td>
                                <td>{fd.categoryName}</td>
                                <td>{fd.price}</td>
                                <td className="">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModalUpdate"
                                        onClick={() => onEdit(fd)}
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