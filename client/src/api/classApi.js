import axiosClient from "./axiosClient";

class ClassApi {
  constructor() {
    this.api = "class/";
  }
  search = (keyword, page, limit) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword || "",
      page: page || 1,
      limit: limit || 32,
    };
    return axiosClient.post(url, body);
  };
  delete = (id) => {
    const url = `${this.api}delete`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };
  add = (name) => {
    const url = `${this.api}add`;
    const body = { name: name };
    return axiosClient.post(url, body);
  };
}

const classApi = new ClassApi();

export default classApi;
