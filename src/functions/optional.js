function optional(val, ret = val, defval = "") {
  return val ? ret : defval;
}

export default optional;
