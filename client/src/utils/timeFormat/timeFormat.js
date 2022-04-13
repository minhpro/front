export class TimeFormat {
  constructor(hour, minute, second) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  getSecond() {
    let data = this.hour * 3600 + this.minute * 60 + this.second;
    return data;
  }
  getString() {
    let data = `${this.hour}:${this.minute}:${this.second}`;
    return data;
  }
}
