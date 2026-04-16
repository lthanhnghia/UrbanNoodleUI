import Request from "./Request"

type RequestApi = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: any;
  params?: any;
};

const EmployeeRequest = async ({ method, path, data, params }: RequestApi) => {
  return Request({ method, path, data, params });
};

export default EmployeeRequest;