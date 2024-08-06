import { URL_API } from "./consts";
export const citiesApi = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${URL_API}/ciudades.php?idDepartamento=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return response;
};
