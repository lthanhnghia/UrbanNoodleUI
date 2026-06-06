import { useEffect, useState } from 'react';

import CategoryTable from './CategoryTable';
import CategoryToolbar from './CategoryToolbar';
import CategoryModal from './CategoryModal';
import CategoryModalUpdate from './CategoryModalUpdate';
import AlertConfirm from '../../config/dialogs/Confirm';
import Alert from '../../config/dialogs/Alerts';
import ApiRequest from '../../services/ApiRequest';
import type { SweetAlertIcon } from 'sweetalert2';
import Loading from '../../config/load/Loading';
import type { Category } from '../../types';
const CategoryManagement = () => {
  const [category, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    description: [] as string[],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiRequest({
          method: "GET",
          path: "/api/category",
          params: {
            lastId: 0,
            size: 3,
            key: searchTerm,
          },
        });

        setCategories(res.data);
        setHasMore(res.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);
  const handleScroll = async (lastId: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await ApiRequest({
        method: "GET",
        path: "/api/category",
        params: {
          lastId: lastId,
          size: 3,
          key: searchTerm
        }
      });
      setCategories((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filter: any) => {
    setSearchTerm(filter.searchTerm);
  }

  const hanldeAddCategory = async (data: any) => {
    try {
      setLoad(true);
      const res = await ApiRequest({
        method: "POST",
        path: "/api/category",
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
        description: errors?.Description || [],
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
  }

  const hanldeUpdateCategory = async (data: any) => {
    setLoad(true);
    try {
      const res = await ApiRequest({
        method: "PUT",
        path: `/api/category/${data.id}`,
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
        setCategories((prev: any[]) =>
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
        name: errors?.Name || [],
        description: errors?.Description || [],
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }

  }
  const handleSelectEmployee = (emp: any) => {
    setSelectedCategory(emp);
  };

  const handleDeleteCategory = async (ct: any) => {
    const ok = await AlertConfirm.confirm({
      title: `Xóa phân loại ${ct.name}?`,
      text: "Hành động này không thể hoàn tác!",
    });

    try {
      if (ok) {
        setLoad(true);
        const res = await ApiRequest({
          method: "DELETE",
          path: `/api/category/${ct.id}`,
        });
        if (res.status === 200) {
          setLoad(false);
          setAlert({
            type: "success",
            title: "Xóa phân loại thành công",
            id: Date.now()
          });
          setCategories((prev: Category[]) =>
            prev.filter((e) => e.id !== ct.id)
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
  return (
    <div>
      <Loading show={load} />

      <Alert type={alert.type} title={alert.title} id={alert.id} />
      <CategoryToolbar onSubmit={handleFilter}
        onOpenCreate={() => setOpenCreateModal(true)}
      />
      <CategoryTable category={category}
        onEdit={handleSelectEmployee}
        onDelete={handleDeleteCategory}
        onLoadMore={handleScroll}
        onOpenUpdateModal={() => setOpenUpdateModal(true)}
      />

      <CategoryModalUpdate category={selectedCategory}
        onSubmit={hanldeUpdateCategory}
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        errors={formErrors}
      />
      <CategoryModal
        onSubmit={hanldeAddCategory}
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        resetKey={resetKey}
        errors={formErrors}
      />
    </div>
  )
}
export default CategoryManagement;