import Cookies from "universal-cookie";

function getCachedLogin() {
  let cookies = new Cookies();
  return cookies.get("login");
}

export default getCachedLogin;
