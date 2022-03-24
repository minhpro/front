import axiosClient from "./axiosClient";

class TestTypeApi {
  constructor() {
    this.api = "test-time/";
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
  add = (time) => {
    const url = `${this.api}add`;
    const body = { time: time };
    return axiosClient.post(url, body);
  };
}

const testTimeApi = new TestTypeApi();

export default testTimeApi;
