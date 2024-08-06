import { URL_API } from "./consts";
export const deptosApi = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await fetch(`${URL_API}/departamentos.php`, requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};