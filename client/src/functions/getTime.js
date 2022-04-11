class GetTime {
  toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    console.log(datum);
    return datum / 1000;
  }
}

const getTime = new GetTime();

export default getTime;
