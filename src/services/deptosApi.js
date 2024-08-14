import { get } from "./services";

export const deptosApi = async () => {
  const params = {
      url: "/departamentos.php",
      user: null
  };

  const deptos = await get(params);
  return deptos;
};