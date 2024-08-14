const LS = window.localStorage;
export const PostUsuarioLocalStorage = ({ id, apiKey }) => {
  LS.setItem("iduser", id);
  LS.setItem("apiKey", apiKey);
};
export const GetUsuarioLocalStorage = () => {
  return {
    iduser: LS.getItem("iduser"),
    apiKey: LS.getItem("apiKey"),
  };
};
export const DeleteUsuarioLocalStorage = () => {
  LS.removeItem("iduser");
  LS.removeItem("apiKey");
  LS.clear();
};