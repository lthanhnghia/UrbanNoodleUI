import  { useEffect } from "react";
import Swal from "sweetalert2";
type AlertProps = {
  type: string;
  title: string;
  position?: "top" | "top-end" | "top-start" | "center" | "bottom";
  id:number
};

const Alert = ({ type, title, id, position = "top-end" }: AlertProps) => {
  useEffect(() => {
    if (!type || !title) return;

    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: type,
      title: title,
    });
  }, [id]); // 👈 chỉ cần id

  return null;
};


export default Alert;