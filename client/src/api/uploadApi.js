import axiosClient from "./axiosClient";

class UploadApi {
  uploadImage = (data) => {
    const url = "/coedu/api/video/create";

    return axiosClient.post(url, data, {
      "Content-Type": "multipart/form-data",
    });
  };
}

const uploadApi = new UploadApi();

export default uploadApi;
