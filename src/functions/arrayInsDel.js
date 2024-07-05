function arrayInsDel(array, value) {
  if (array.includes(value)) {
    array.splice(array.indexOf(value), 1);
  } else {
    array.push(value);
  }
  return array;
}

export default arrayInsDel;
