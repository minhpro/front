import axiosClient from "./axiosClient";

class UserApi {
  constructor() {
    this.api = "user/";
  }
  search = (keyword, page, limit) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword,
      page: page || 1,
      limit: limit || 32,
    };
    return axiosClient.post(url, body);
  };
  login = async (username, password) => {
    const url = `${this.api}login`;
    const body = { username, password };
    return axiosClient.post(url, body);
  };
}

const userApi = new UserApi();

export default userApi;
