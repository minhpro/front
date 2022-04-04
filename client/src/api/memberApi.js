import axiosClient from "./axiosClient";

class MemberApi {
  constructor() {
    this.api = "member/";
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

  detail = (id) => {
    const url = `${this.api}detail`;
    const body = { id: id };
    return axiosClient.post(url, body);
  };
}

const memberApi = new MemberApi();

export default memberApi;
