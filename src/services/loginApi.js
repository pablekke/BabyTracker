import { URL_API } from "./consts";
export const loginApi = async (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    usuario: data.user,
    password: data.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${URL_API}/login.php`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return response;
};
