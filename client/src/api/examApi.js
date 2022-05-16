import axiosClient from "./axiosClient";

class ExamApi {
  constructor() {
    this.api = "test/";
  }
  search = (
    keyword,
    testTypeId,
    testMatrixId,
    classId,
    subjectId,
    page,
    limit
  ) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword,
      testTypeId,
      testMatrixId,
      classId,
      subjectId,
      page: page || 1,
      limit: limit || 32,
    };
    return axiosClient.post(url, body);
  };


  search2 = (
      testMatrixId,
      keyword,
      page,
      limit
  ) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword,
      testMatrixId,
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
  detail = (id) => {
    const url = `${this.api}detail`;
    return axiosClient.post(url, { id: id });
  };
  gen = (id) => {
    const url = `${this.api}generate-question-for-matrix`;
    const body = { testMatrixId: id };
    return axiosClient.post(url, body);
  };
}

const examApi = new ExamApi();

export default examApi;
