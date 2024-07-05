function notifFilter(notif = [], show_types = []) {
  let filtered = [];
  notif.forEach((element) => {
    if (show_types.includes(element.type)) {
      filtered.push(element);
    }
  });
  return filtered;
}

export default notifFilter;
