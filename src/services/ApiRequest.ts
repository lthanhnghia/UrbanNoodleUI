import {Request} from "./Request"

type RequestApi = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: any;
  params?: any;
};

const ApiRequest = async ({ method, path, data, params }: RequestApi) => {
  return Request({ method, path, data, params });
};

export default ApiRequest;