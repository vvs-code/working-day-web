function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export default getDaysInMonth;
