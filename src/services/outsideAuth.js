import axiosObj from "./axiosConfig";
import {API} from "../constant/apiConstant";

const OutsideAuthApi = () => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  console.log(API)
  return {
    fetchData() {
      return axiosObj({
        url: API.noAuthUrls.endpoint,
        method: "GET",
        headers: { ...defaultHeaders },
      });
    },
  };
};

export default OutsideAuthApi;
