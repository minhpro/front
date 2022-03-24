import axiosClient from "./axiosClient";

class OtherConfigApi {
  constructor() {
    this.api = "config/other/";
  }
  all = () => {
    const url = `${this.api}get`;
    const body = {};
    return axiosClient.get(url);
  };
  updateDuration = (testingDuration) => {
    const url = `${this.api}update`;
    const body = {
      testingDuration: testingDuration,
    };
    return axiosClient.post(url, body);
  };
  updateRate = (questionDuplicationRate) => {
    const url = `${this.api}update`;
    const body = {
      questionDuplicationRate: questionDuplicationRate,
    };
    return axiosClient.post(url, body);
  };
  update = (testingDuration, questionDuplicationRate) => {
    const url = `${this.api}update`;
    const body = {
      testingDuration: testingDuration,
      questionDuplicationRate: questionDuplicationRate,
    };
    return axiosClient.post(url, body);
  };
}

const otherConfigApi = new OtherConfigApi();

export default otherConfigApi;
