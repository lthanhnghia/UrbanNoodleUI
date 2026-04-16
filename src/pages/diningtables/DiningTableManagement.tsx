import { useState } from 'react';
import DiningTableList from './DiningTableList';
import DiningTableToolbar from './DiningTableToolbar';
import DiningTableModal from './DiningTableModal';
import DiningTableModalUpdate from './DiningTableModalUpdate';
import type { DiningTable } from "../../types";
import AlertConfirm from '../../config/dialogs/Confirm';

const DiningTableManagement = () =>{
   const [selectedDingTable, setSelectedDingTable] = useState<any | null>(null);
    const[diningtable] = useState<DiningTable[]>([
       {id:1,name: "bàn 1",status:'Trống'},
       {id:2,name: "bàn 2",status:'Đang sử dụng'}
     ]);
   const handleFilter = (filter:any) =>{
     console.log("Filter từ diningtable: ",filter);
  }
   const handleCreateDiningTable = (data:any) =>{
     console.log("data create từ diningtable: ",data);
  }
  const handleUpdateDiningTable = (data:any) =>{
     console.log("data create từ diningtable: ",data);
  }
  const handleDeleteFood = async (data: any) => {
    const ok = await AlertConfirm.confirm({
      title: `Bạn muốn xóa  ${data.name}?`,
      text: "Hành động này không thể hoàn tác!",
    });

    if (ok) {
      console.log("đã xóa bàn ăn này: ", data.id)
    }
  };
    const handleSelectDiningTale = (emp: any) => {
          setSelectedDingTable(emp);
       };
     return (
        <div >
        <DiningTableToolbar onSubmit={handleFilter}/>
        <DiningTableList diningtable={diningtable} onEdit={handleSelectDiningTale}
        onDelete={handleDeleteFood}/>
        <DiningTableModal onSubmit={handleCreateDiningTable}/>
        <DiningTableModalUpdate diningtable={selectedDingTable} onSubmit={handleUpdateDiningTable}/>
        </div>
     )
}
export default DiningTableManagement;