import Swal from "sweetalert2";

const AlertConfirm  = {
    confirm: async (options: any) => {
    const {
      type = "warning",
      title,
      text,
      confirmButtonText = "OK",
      cancelButtonText = "Hủy",
    } = options;


        const result = await Swal.fire({
            icon: type,
            title: title,
            text: text,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        });

        return result.isConfirmed;
    },
};

export default AlertConfirm ;
