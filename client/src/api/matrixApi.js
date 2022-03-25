import axiosClient from "./axiosClient";

class MatrixApi {
  constructor() {
    this.api = "test-matrix/";
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
  delete = (id) => {
    const url = `${this.api}delete`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };

  add = (data) => {
    const url = `${this.api}add`;

    return axiosClient.post(url, data);
  };
}

const matrixApi = new MatrixApi();

export default matrixApi;
