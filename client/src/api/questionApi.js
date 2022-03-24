import axiosClient from "./axiosClient";

class QuestionApi {
  constructor() {
    this.api = "question/";
  }
  search = (unitId, keyword, type, page, limit) => {
    const url = `${this.api}search`;
    const body = {
      unitId: unitId,
      keyword: keyword,
      page: page || 1,
      limit: limit || 32,
      type: type || null,
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

const questionApi = new QuestionApi();

export default questionApi;
