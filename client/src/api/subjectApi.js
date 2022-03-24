import axiosClient from "./axiosClient";

class SubjectApi {
  constructor() {
    this.api = "subject/";
  }
  search = (classId, keyword, page, limit) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword || "",
      page: page || 1,
      limit: limit || 32,
      classId: classId || null,
    };
    return axiosClient.post(url, body);
  };
  delete = (id) => {
    const url = `${this.api}delete`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };
  add = (name, classId, code) => {
    const url = `${this.api}add`;
    const body = { code: code, classId: classId, name: name };
    return axiosClient.post(url, body);
  };
}

const subjectApi = new SubjectApi();

export default subjectApi;
