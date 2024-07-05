import Cookies from "universal-cookie";

function getCachedRole() {
  return new Cookies().get("role");
}

export default getCachedRole;
