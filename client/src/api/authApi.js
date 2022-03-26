import axiosClient from "./axiosClient";

class AuthApi {
  constructor() {
    this.api = "user/";
  }
  login = (username, password) => {
    const url = `${this.api}login`;
    const body = {
      username: username,
      password: password,
    };
    return axiosClient.post(url, body);
  };
}

const authApi = new AuthApi();

export default authApi;
