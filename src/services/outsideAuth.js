import axiosObj from "./axiosConfig";
import { API } from "../constants/apiConstant";

const OutsideAuthApi = () => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  return {
    loginApi() {
      return axiosObj({
        url: API.noAuthUrls.loginUser,
        method: "GET",
        headers: { ...defaultHeaders },
      });
    },
  };
};

export default OutsideAuthApi;
