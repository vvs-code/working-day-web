import Cookies from "universal-cookie";

export async function TestFunction() {
  const cookies = new Cookies();
  // const token = cookies.get("auth_token");
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + cookies.get("auth_token"),
    },
    // credentials: false,
    crossDomain: true,
  };
  const response = await fetch(
    `http://vm.trenin17.online:8080/v1/employee/info?employee_id=cadebc7c66b14028b9125593ade2a8c6`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  //return data.message === "Logged in successful";
}
