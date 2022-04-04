import axiosClient from "./axiosClient";

class GroupApi {
  constructor() {
    this.api = "group/";
  }
  userSearch = (keyword, page, limit) => {
    const url = `${this.api}user-group/search`;
    const body = {
      keyword: keyword,
      page: page || 1,
      limit: limit || 32,
    };
    return axiosClient.post(url, body);
  };
  memberSearch = async (keyword, page, limit) => {
    const url = `${this.api}member-group/search`;
    const body = {
      keyword: keyword,
      page: page || 1,
      limit: limit || 32,
    };
    return axiosClient.post(url, body);
  };
}

const groupApi = new GroupApi();

export default groupApi;
