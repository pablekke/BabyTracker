import { get } from "./services";

export const citiesApi = async (id) => {
  return await get(`/ciudades.php?idDepartamento=${id}`);
};