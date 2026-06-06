import FoodTable from "./FoodTable";
import FoodToolbar from "./FoodToolbar";
import FoodModal from "./FoodModal";
import FoodModalUpdate from "./FoodModalUpdate";
import AlertConfirm from "../../config/dialogs/Confirm";
import type { Food } from "../../types";
import { useEffect, useState } from "react";
import ApiRequest from "../../services/ApiRequest";
import type { SweetAlertIcon } from "sweetalert2";
import Alert from "../../config/dialogs/Alerts";
import Loading from "../../config/load/Loading";

const FoodManagement = () => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [food, setFood] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    price: [] as string[],
    fileImage: [] as string[],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiRequest({
          method: "GET",
          path: "/api/food",
          params: {
            lastId: 0,
            size: 3,
            key: searchTerm,
          },
        });

        setFood(res.data);
        setHasMore(res.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const categoryRes = await ApiRequest({
        method: "GET",
        path: "/api/category/options",
      });
      setCategory(categoryRes);
    } catch (err) {
      console.error("Category error:", err);
    }
  };

  fetchCategories();
}, []);

  const handleScroll = async (lastId: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await ApiRequest({
        method: "GET",
        path: "/api/food",
        params: {
          lastId: lastId,
          size: 3,
          key: searchTerm
        }
      });
      setFood((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleFilter = (filter: any) => {
    console.log("Filter từ food: ", filter);
    setSearchTerm(filter.searchTerm);
  }
  const handleAddFood = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("categoryId", String(data.categoryId));

    if (data.fileImage) {
      formData.append("image", data.fileImage as File );
    }
    try {
      setLoad(true);
      const res = await ApiRequest({
        method: "POST",
        path: "/api/food",
        data: formData
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
        price: errors?.Price || [],
        fileImage: errors?.Image || [],
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
  };


  const handleUpdateFood = async (data: any) => {
    console.log("DATA từ food update:", data);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("categoryId", String(data.categoryId));

    if (data.fileImage) {
      formData.append("image", data.fileImage as File );
    }
     try {
      setLoad(true);
      const res = await ApiRequest({
        method: "PUT",
        path: `/api/food/${data.id}`,
        data: formData
      });
      if (res.status === 200) {
        setLoad(false);
        setAlert({
          type: "success",
          title: res.description,
          id: Date.now()
        });
        setHasMore(true);
        setOpenUpdateModal(false);
        setResetKey(prev => prev + 1);
        setFood((prev: any[]) =>
          prev.map((emp) =>
            emp.id === data.id
              ? {
                ...emp,
                name: data.name,
               price: data.price,
               categoryName: category.find((c) => c.id === data.categoryId)?.name || emp.categoryName,
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
        price: errors?.Price || [],
        fileImage: errors?.Image || [],
      });
      setAlert({
        type: "error",
        title: apiError.Description,
        id: Date.now()
      });
    }
   
  };
  const handleDeleteFood = async (data: any) => {
    const ok = await AlertConfirm.confirm({
      title: `Xóa món ăn  ${data.name}?`,
      text: "Hành động này không thể hoàn tác!",
    });

    try {
      if (ok) {
        setLoad(true);
        const res = await ApiRequest({
          method: "DELETE",
          path: `/api/food/${data.id}`,
        });
        if (res.status === 200) {
          setLoad(false);
          setAlert({
            type: "success",
            title: "Xóa món ăn thành công",
            id: Date.now()
          });
          setFood((prev: Food[]) =>
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
  const handleSelectFood = (emp: Food) => {
    setSelectedFood(emp);
  };


  return (
    <div className="">
      <Loading show={load} />

      <Alert type={alert.type} title={alert.title} id={alert.id} />
      <FoodToolbar onSubmit={handleFilter} 
       onOpenCreate={() => setOpenCreateModal(true)}
      />
      <FoodTable food={food} onEdit={handleSelectFood} onDelete={handleDeleteFood}
        onLoadMore={handleScroll}
         onOpenUpdateModal={() => setOpenUpdateModal(true)}
      />
      <FoodModal categories={category} onSubmit={handleAddFood} 
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        resetKey={resetKey}
        errors={formErrors}
      />
      <FoodModalUpdate foods={selectedFood} onSubmit={handleUpdateFood}
         open={openUpdateModal}
         onClose={() => setOpenUpdateModal(false)}
         categories={category}
          errors={formErrors}
      />
    </div>
  )
}
export default FoodManagement;