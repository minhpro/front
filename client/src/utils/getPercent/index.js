export function getPercent(value, total) {
  const percent = ((total - value) * 100) / total;
  return percent;
}
