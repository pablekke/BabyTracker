import { post } from "./services";

export const registroApi = async (data) => {

  const body = JSON.stringify({
    usuario: data.user,
    password: data.password,
    idDepartamento: data.depto,
    idCiudad: data.city,
  });
  const params = {
    body: body,
    url: '/usuarios.php'
  };
  return await post(params);
};