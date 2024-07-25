function sortSignTooltipData(signs) {
  return signs.sort((a, b) => {
    if (a.signed < b.signed) {
      return 1;
    } else if (a.signed > b.signed) {
      return -1;
    } else {
      return 0;
    }
  });
}

export default sortSignTooltipData;
