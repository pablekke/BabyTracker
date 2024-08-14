import { get } from "./services";

export const citiesApi = async (id) => {
  const params = {
      url: `/ciudades.php?idDepartamento=${id}`,
      user: null
  };

  const deptos = await get(params);
  return deptos;
};