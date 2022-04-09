import axios from "axios";
import querySting from "query-string";
import * as contants from "assets/contants";

import { getLocalToken } from "utils/token/getLocalToken";

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem("token");
  return accessToken;
}
function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem("refresh_token");
  return refreshToken;
}

const axiosClient = axios.create({
  baseURL: `${contants.ApiUrl.apiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => querySting.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...

  if (getLocalToken()) {
    config.headers.common["Authorization"] = `Bearer ${getLocalToken()}`;
  }

  config.headers["Access-Control-Allow-Origin"] = "*";
  // config.headers["Access-Control-Allow-Methods"] =
  //   "GET, PUT, POST, DELETE, OPTIONS";
  const token = getLocalAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
