import axiosClient from "./axiosClient";

class TestTypeApi {
  constructor() {
    this.api = "test-type/";
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
  add = (name, description) => {
    const url = `${this.api}add`;
    const body = { name: name, description: description };
    return axiosClient.post(url, body);
  };
}

const testTypeApi = new TestTypeApi();

export default testTypeApi;
