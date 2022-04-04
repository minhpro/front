import axiosClient from "./axiosClient";

class UnitApi {
  constructor() {
    this.api = "unit/";
  }
  search = (chapterId, subjectId, classId, keyword, page, limit) => {
    const url = `${this.api}search`;
    const body = {
      keyword: keyword,
      page: page || 1,
      limit: limit || 32,
      chapterId: chapterId,
      subjectId: subjectId,
      classId: classId,
    };
    return axiosClient.post(url, body);
  };
  delete = async (id, set) => {
    const url = `${this.api}delete`;
    const body = { id: id };

    return axiosClient.post(url, body);
  };
  add = (name, chapterId, requirements) => {
    const url = `${this.api}add`;
    const body = {
      name: name,
      chapterId: chapterId,
      requirements: requirements || [],
    };
    return axiosClient.post(url, body);
  };

  detail = (id) => {
    const url = `${this.api}detail`;
    const body = {
      id: id,
    };
    return axiosClient.post(url, body);
  };
}

const unitApi = new UnitApi();

export default unitApi;
