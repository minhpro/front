class FormatNumber {
  getTotalPage(total, limit) {
    return parseInt(total / limit + 1);
  }
  getSTT(i, page, limit) {
    return (page - 1) * limit + i + 1;
  }
}

const formatNumber = new FormatNumber();

export default formatNumber;
