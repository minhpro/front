import axiosClient from "./axiosClient";

class ScoreCalculationTypeApi {
  constructor() {
    this.api = "score-calculation-type/";
  }
  all = () => {
    const url = `${this.api}all`;
    return axiosClient.post(url);
  };
}

const scoreCalculationTypeApi = new ScoreCalculationTypeApi();

export default scoreCalculationTypeApi;
