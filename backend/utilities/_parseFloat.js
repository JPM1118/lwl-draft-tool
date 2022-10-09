module.exports = (array) => {
  array.forEach((obj) => {
    const entries = Object.entries(obj);
    for (const entry of entries) {
      if (!isNaN(entry[1])) {
        obj[entry[0]] = parseFloat(entry[1]);
      }
    }
  });
  return array;
};
