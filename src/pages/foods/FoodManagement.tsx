import FoodTable from "./FoodTable";
import FoodToolbar from "./FoodToolbar";
import FoodModal from "./FoodModal";
import FoodModalUpdate from "./FoodModalUpdate";
import AlertConfirm from "../../config/dialogs/Confirm";
import type { Food } from "../../types";
import { useState } from "react";


const FoodManagement = () =>{
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const local = 'https://localhost:7274';
 const handleFilter = (filter:any) =>{
     console.log("Filter từ food: ",filter);
  }
  const handleAddFood = (data: any) => {
      console.log("DATA từ food:", data);
   };
  const handleUpdateFood = (data: any) => {
      console.log("DATA từ food update:", data);
   };
   const handleDeleteFood = async (data: any) => {
    const ok = await AlertConfirm.confirm({
      title: `Xóa món ăn  ${data.name}?`,
      text: "Hành động này không thể hoàn tác!",
    });

    if (ok) {
      console.log("đã xóa món ăn này: ", data.id)
    }
  };
   const handleSelectFood = (emp: Food) => {
       setSelectedFood(emp);
     };
  const [foods] = useState<Food[]>([
    {
      id: 1,
      name: 'mì cay',
      categoryId: 2,
      categoryName: 'lẩu thái',
      price: 55,
      image: local + '/images/foods/5f6c5158-bb3c-40b1-b09d-cbe0eb7e6f39.jpg'
    }
  ]);
 
    return(
      <div className="">
        <FoodToolbar onSubmit={handleFilter}/>
        <FoodTable food={foods} onEdit={handleSelectFood} onDelete={handleDeleteFood}/>
        <FoodModal onSubmit={handleAddFood}/>
        <FoodModalUpdate foods={selectedFood} onSubmit={handleUpdateFood}/>
      </div>
    )
}
export default FoodManagement;