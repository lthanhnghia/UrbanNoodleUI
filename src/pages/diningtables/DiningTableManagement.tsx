import { useEffect, useState } from 'react';
import DiningTableList from './DiningTableList';
import DiningTableToolbar from './DiningTableToolbar';
import DiningTableModal from './DiningTableModal';
import DiningTableModalUpdate from './DiningTableModalUpdate';
import type { SweetAlertIcon } from 'sweetalert2';
import AlertConfirm from '../../config/dialogs/Confirm';
import ApiRequest from '../../services/ApiRequest';
import Alert from '../../config/dialogs/Alerts';
import Loading from '../../config/load/Loading';
const DiningTableManagement = () => {
  const [selectedDingTable, setSelectedDingTable] = useState<any | null>(null);

  const [diningtable, setDiningtable] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
   const [openCreateModal, setOpenCreateModal] = useState(false);
   const [openUpdateModal, setOpenUpdateModal] = useState(false);
   const [resetKey, setResetKey] = useState(0);
const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState<{
    type: SweetAlertIcon | "";
    title: string;
    id: number;
  }>({
    type: "",
    title: "",
    id: 0
  });
  const [formErrors, setFormErrors] = useState({
    name: [] as string[],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiRequest({
          method: "GET",
          path: "/api/diningtable",
          params: {
            lastId: 0,
            size: 3,
            key: searchTerm,
            status: statusFilter,
          },
        });

        setDiningtable(res.data);
        setHasMore(res.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
       setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, statusFilter]);

 const handleScroll = async (lastId: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await ApiRequest({
        method: "GET",
        path: "/api/diningtable",
        params: {
          lastId: lastId,
          size: 3,
          key: searchTerm,
          status: statusFilter,
        }
      });
      setDiningtable((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleFilter = (filter: any) => {
    
    setSearchTerm(filter.searchTerm);
    if (filter.statusFilter === "null") {
      setStatusFilter(null);
    } else {
      setStatusFilter(filter.statusFilter === "1");
    }

  }

  const handleCreateDiningTable = async (data: any) => {
    try {
      setLoad(true);
      const res = await ApiRequest({
        method: "POST",
        path: "/api/diningtable",
        data: data
      });
      if (res.status === 200) {
        setLoad(false);
        setAlert({
          type: "success",
          title: res.description,
          id: Date.now()
        });
        setHasMore(true);
        setOpenCreateModal(false);
        setResetKey(prev => prev + 1);
      }

    } catch (error: any) {
      setLoad(false);
      const apiError = error.response?.data;
      const errors = apiError.errors;
      setFormErrors({
        name: errors?.Name || [],
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
  }
  const handleUpdateDiningTable = async (data: any) => {
     setLoad(true);
    try {
      const res = await ApiRequest({
        method: "PUT",
        path: `/api/diningtable/${data.id}`,
        data: data
      });
      setLoad(false);
      if (res.status === 200) {
        setAlert({
          type: "success",
          title: "Cập nhật thành công",
          id: Date.now()
        });
        setOpenUpdateModal(false);     // 👈 đóng modal
        setResetKey(prev => prev + 1);
        setDiningtable((prev: any[]) =>
          prev.map((emp) =>
            emp.id === data.id
              ? {
                ...emp,
                name: data.name,
                description: data.description,
              }
              : emp
          )
        );
      }

    } catch (error: any) {
      setLoad(false);
      const apiError = error.response?.data;
      const errors = apiError.errors;
      setFormErrors({
        name: errors?.Name || []
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }

  }
  const handleDeleteDiningTable = async (data: any) => {
    const ok = await AlertConfirm.confirm({
      title: `Bạn muốn xóa  ${data.name}?`,
      text: "Hành động này không thể hoàn tác!",
    });

     try {
      if (ok) {
        setLoad(true);
        const res = await ApiRequest({
          method: "DELETE",
          path: `/api/diningtable/${data.id}`,
        });
        if (res.status === 200) {
          setLoad(false);
          setAlert({
            type: "success",
            title: "Xóa bàn ăn thành công",
            id: Date.now()
          });
          setDiningtable((prev: any[]) =>
            prev.filter((e) => e.id !== data.id)
          );

        }
      }
    } catch (error: any) {
      setLoad(false);
      const apiError = error.response?.data;

      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
  };
  const handleSelectDiningTale = (emp: any) => {
    setSelectedDingTable(emp);
  };
  return (
    <div >
      <Loading show={load} />

      <Alert type={alert.type} title={alert.title} id={alert.id} />
      <DiningTableToolbar onSubmit={handleFilter}  onOpenCreate={() => setOpenCreateModal(true)} />
      <DiningTableList diningtable={diningtable} onLoadMore={handleScroll} onEdit={handleSelectDiningTale}
        onDelete={handleDeleteDiningTable} 
         onOpenUpdateModal={() => setOpenUpdateModal(true)}/>
      <DiningTableModal onSubmit={handleCreateDiningTable} open={openCreateModal} onClose={() => setOpenCreateModal(false)} 
       resetKey={resetKey}
        errors={formErrors}  
      />
      <DiningTableModalUpdate diningtable={selectedDingTable} 
      onSubmit={handleUpdateDiningTable} open={openUpdateModal} 
      onClose={() => setOpenUpdateModal(false)} 
      errors={formErrors}
      />
    </div>
  )
}
export default DiningTableManagement;