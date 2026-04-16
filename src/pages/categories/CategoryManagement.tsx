import { useState } from 'react';

import CategoryTable from './CategoryTable';
import type { Category } from '../../types';
import CategoryToolbar from './CategoryToolbar';
import CategoryModal from './CategoryModal';
import CategoryModalUpdate from './CategoryModalUpdate';
import AlertConfirm from '../../config/dialogs/Confirm';

const CategoryManagement = () => {
  const[category] = useState<Category[]>([
    {id:1,name: "Mì",description:"mì có các chế biến đa dạng"},
    {id:2,name: "Cơm",description:"Cơm món ăn quen thuộc"}
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const handleFilter = (filter:any) =>{
     console.log("Filter từ category: ",filter);
  }
  
  const hanldeAddCategory = (category:any) =>{
     console.log("Thêm category: ",category);
  }
  const hanldeUpdateCategory = (category:any) =>{
     console.log("Cập nhật category: ",category);
  }
   const handleSelectEmployee = (emp: any) => {
      setSelectedCategory(emp);
    };

     const handleDeleteCategory = async (ct: any) => {
  const ok = await AlertConfirm.confirm({
      title: `Xóa phân loại ${ct.name}?`,
  text: "Hành động này không thể hoàn tác!",
  });

  if (ok){
    console.log("đã xóa phân loại này: ",ct.id)
  } 
};
  return(
    <div>
      <CategoryToolbar onSubmit={handleFilter}/>
      <CategoryTable category={category}
         onEdit={handleSelectEmployee}
         onDelete={handleDeleteCategory}
      />
      
      <CategoryModalUpdate category={selectedCategory} onSubmit={hanldeUpdateCategory}/>
      <CategoryModal onSubmit={hanldeAddCategory}/>
    </div>
  )
}
export default CategoryManagement;