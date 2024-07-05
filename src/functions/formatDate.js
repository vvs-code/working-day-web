import { format } from "date-fns";

function formatDate(date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}

export default formatDate;
