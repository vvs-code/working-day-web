import Cookies from "universal-cookie";

export async function Login(login, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    // credentials: false,
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  };
  const response = await fetch(
    `http://vm.trenin17.online:8080/v1/authorize`,
    requestOptions
  );
  const data = await response.json();
  const cookies = new Cookies();
  cookies.set("auth_token", data["token"]);
  cookies.set("role", data["role"]);
  // return data.message === "Logged in successful";
}
