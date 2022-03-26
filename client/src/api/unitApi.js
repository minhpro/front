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
  delete = async (id, set) => {
    const url = `${this.api}delete`;
    const body = { id: id };
    try {
      const res = await axiosClient.post(url, body);
      set(res);
      return res;
    } catch (error) {
      return error;
    }
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
