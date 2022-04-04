class FormatNumber {
  getTotalPage(total, limit) {
    return parseInt(total / limit + 1);
  }
}

const formatNumber = new FormatNumber();

export default formatNumber;
