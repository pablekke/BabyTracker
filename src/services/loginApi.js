import { post } from "./services";
export const loginApi = async (data) => {

  const body = JSON.stringify({
    usuario: data.user,
    password: data.password,
  });
  const params = {
    body: body,
    url:'/login.php'
  };
  return await post(params);
};