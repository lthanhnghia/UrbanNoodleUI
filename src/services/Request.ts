import axios from "axios";
import { Cookies } from "react-cookie";

const baseURL = "https://localhost:7274";

type RequestOption = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: any;
  params?: any;
};

const Request = async ({ method, path, data, params }: RequestOption) => {
  const token = new Cookies().get("token");
 const isFormData = data instanceof FormData;
  try {
    const res = await axios({
      method,
      baseURL,
      url: path,
      data,
      params,
       headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!isFormData && { "Content-Type": "application/json" }) // 👈 chỉ set khi KHÔNG phải FormData
      }
    });

    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // 👈 cực quan trọng
  }
};

export default Request;