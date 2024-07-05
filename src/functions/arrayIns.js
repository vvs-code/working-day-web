function arrayIns(array, value) {
  if (!array.includes(value)) {
    array.push(value);
  }
  return array;
}

export default arrayIns;
