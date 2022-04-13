import { formatNumber } from "functions";

export class SecondFormat {
  constructor(second) {
    this.second = second;
  }

  getHour() {
    let data = Math.floor(this.second / 3600);
    return data;
  }
  getMinute() {
    let data = Math.floor((this.second - this.getHour() * 3600) / 60);
    return data;
  }

  getSecond() {
    let data = this.second - 3600 * this.getHour() - 60 * this.getMinute();

    return data;
  }
  getString() {
    let data = `${formatNumber.getMinTwoDigits(
      this.getHour()
    )} : ${formatNumber.getMinTwoDigits(
      this.getMinute()
    )} : ${formatNumber.getMinTwoDigits(this.getSecond())}`;
    return data;
  }
}
