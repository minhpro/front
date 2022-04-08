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
  add = (time, description) => {
    const url = `${this.api}add`;
    const body = { time: time, description: description };
    return axiosClient.post(url, body);
  };
  update = (id, time, description) => {
    const url = `${this.api}update`;
    const body = { id, time: time, description: description };
    return axiosClient.post(url, body);
  };
  detail = (id) => {
    const url = `${this.api}detail`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };
}

const testTimeApi = new TestTypeApi();

export default testTimeApi;
