import axiosClient from "./axiosClient";

class UnitApi {
  constructor() {
    this.api = "unit/";
  }
  search = (chapterId, keyword, page, limit) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword,
      page: page || 1,
      limit: limit || 32,
      chapterId: chapterId,
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

const unitApi = new UnitApi();

export default unitApi;
