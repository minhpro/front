class FormatNumber {
  getTotalPage(total, limit) {
    return parseInt(total / limit + 1);
  }
  getSTT(i, page, limit) {
    return (page - 1) * limit + i + 1;
  }
  getMinTwoDigits(myNumber) {
    return myNumber.toString().length < 2 ? "0" + myNumber : myNumber;
  }
}

const formatNumber = new FormatNumber();

export default formatNumber;
