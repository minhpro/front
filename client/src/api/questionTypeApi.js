import axiosClient from "./axiosClient";

class QuestionTypeApi {
  constructor() {
    this.api = "question-type/";
  }
  search = (keyword, page, limit) => {
    const url = `${this.api}search`;
    const body = { keyword: keyword, page: page || 1, limit: limit || 32 };
    return axiosClient.post(url, body);
  };
  delete = (id) => {
    const url = `${this.api}delete`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };
  add = (name, description, code) => {
    const url = `${this.api}add`;
    const body = { name: name, description: description, code };
    return axiosClient.post(url, body);
  };

  detail = (id) => {
    const url = `${this.api}detail`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };
  update = (id, name, description, code) => {
    const url = `${this.api}update`;
    const body = { id: id, name: name, description: description, code };
    return axiosClient.post(url, body);
  };
}

const questionTypeApi = new QuestionTypeApi();

export default questionTypeApi;
