import { useState, useEffect } from 'react';
import EmployeeRequest from '../../services/EmployeeRequest';
import EmployeeModal from './EmployModal';
import type { Employee } from '../../types';
import AlertConfirm from '../../config/dialogs/Confirm';
import Alert from '../../config/dialogs/Alerts';
import EmployeeToolbar from './EmployeeToolbar';
import EmployeeTable from './EmployeeTable';
import EmployeeModalUpdate from './EmployModalUpdate';

const EmployeeManagement = () => {

  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    title: "",
    id: 0
  });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [formErrors, setFormErrors] = useState({
    phone: [] as string[],
    fullname: [] as string[],
    password: [] as string[],
    role: [] as string[],
  });
  const fetchEmployees = async ({
    lastId = 0,
    size = 3,
    search = searchTerm,
    isReset = false,
  }: any) => {
    if (isReset) {
      setEmployees([]);
      setHasMore(true);
    }

    setLoading(true);
    try {
      const res = await EmployeeRequest({
        method: "GET",
        path: "/api/account",
        params: {
          lastId,
          size,
          key: search,
        },
      });

      setEmployees(res.data);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error("Lỗi: " + err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees({});
  }, []);

  const handleScroll = async (lastId: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await EmployeeRequest({
        method: "GET",
        path: "/api/account",
        params: {
          lastId: lastId,
          size: 3,
          key: searchTerm
        }
      });
      setEmployees((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const hanldeFilterEmployee = async (filter: any) => {
    setSearchTerm(filter.searchTerm);

    await fetchEmployees({
      search: filter.searchTerm,
      isReset: true,
    });
  };


  const handleAddEmployee = async (datas: any) => {
    
    try {
      const res = await EmployeeRequest({
        method: "POST",
        path: "/api/account",
        data: datas
      });
      console.log("RES:", res.status);
      if (res.status === 200) {
        setAlert({
          type: "success",
          title: "Thêm mới thành công",
          id: Date.now()
        });
        setHasMore(true);
        setOpenCreateModal(false);     // 👈 đóng modal
        setResetKey(prev => prev + 1);
      }

    } catch (error: any) {
      const apiError = error.response?.data;
      const errors = apiError.errors;
      setFormErrors({
        phone: errors?.Phone || [],
        fullname: errors?.FullName || [],
        password: errors?.Password || [],
        role: errors?.Role || [],
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
  };




  const handleSelectEmployee = (emp: any) => {
    setSelectedEmployee(emp);
  };

  // 👉 nhận từ Modal
  const handleUpdateEmployee = async (data: any) => {
    try {
      const res = await EmployeeRequest({
        method: "PUT",
        path: `/api/account/${data.id}`,
        data: data
      });
      console.log("RES:", res.status);
      if (res.status === 200) {
        setAlert({
          type: "success",
          title: "Cập nhật thành công",
          id: Date.now()
        });
        setOpenUpdateModal(false);     // 👈 đóng modal
        setResetKey(prev => prev + 1);
        setEmployees((prev: any[]) =>
          prev.map((emp) =>
            emp.id === data.id
              ? {
                ...emp,
                fullname: data.fullname,
                phone: data.phone,
                role: data.role,
              }
              : emp
          )
        );
      }

    } catch (error: any) {
      const apiError = error.response?.data;
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }


  };

  const handleDeleteEmployee = async (data: Employee) => {
    const ok = await AlertConfirm.confirm({
      title: `Xóa nhân viên ${data.fullname}?`,
      text: "Hành động này không thể hoàn tác!",
    });

    try {
      if (ok) {
        const res = await EmployeeRequest({
          method: "DELETE",
          path: `/api/account/${data.id}`,
        });
        if (res.status === 200) {
          setAlert({
            type: "success",
            title: "Xóa nhân viên thành công",
            id: Date.now()
          });
          setEmployees((prev: Employee[]) =>
            prev.filter((e) => e.id !== data.id)
          );

        }
      }
    } catch (error: any) {
      const apiError = error.response?.data;
      
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
  };


  return (
    <div>

      <Alert type={alert.type} title={alert.title} id={alert.id} />
      <EmployeeToolbar onSubmit={hanldeFilterEmployee}
        onOpenCreate={() => setOpenCreateModal(true)}
      />

      <EmployeeTable
        employees={employees}
        onEdit={handleSelectEmployee}
        onDelete={handleDeleteEmployee}
        onLoadMore={handleScroll}
        onOpenUpdateModal={() => setOpenUpdateModal(true)}
      />

      <EmployeeModalUpdate
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        employee={selectedEmployee}
        onSubmit={handleUpdateEmployee}
      />
      <EmployeeModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={handleAddEmployee}
        resetKey={resetKey}
        errors={formErrors}
      />


    </div>
  );
}
export default EmployeeManagement;