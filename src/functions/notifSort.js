function notifSort(notifs) {
  return notifs.toSorted((a, b) => {
    if (a.created < b.created) {
      return 1;
    } else if (a.created > b.created) {
      return -1;
    } else {
      return 0;
    }
  });
}

export default notifSort;
