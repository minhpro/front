import axiosClient from "./axiosClient";

class UploadApi {
  constructor() {
    this.api = "file/";
  }
  upload = (data) => {
    const url = `${this.api}upload`;

    return axiosClient.post(url, data, {
      "Content-Type": "multipart/form-data",
    });
  };
}

const uploadApi = new UploadApi();

export default uploadApi;
