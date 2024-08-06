import { URL_API } from "./consts";
export const loginApi = async (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    usuario: data.user,
    password: data.password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${URL_API}/login.php`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || `Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
