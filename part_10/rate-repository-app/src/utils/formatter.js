const shortenNumber = (value) => {
  if (typeof value === "number") {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
  }
  return value.toString();
};

export { shortenNumber };
