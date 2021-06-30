import axios from 'axios';
import {API} from '../constant/apiConstant';

const axiosObj = (info) => {
  const {url, method, headers, data} = info;
  const AxiosInstance = axios.create({
    baseURL: API.baseUrls[API.currentEnv],
    headers,
  });
  // AxiosInstance.defaults.timeout = 20000;

  AxiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (e) => {
      Promise.reject(e);
    },
  );

  AxiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({message: error});
    },
  );

  return AxiosInstance({url, method, headers, data});
};

export default axiosObj;
