const LS = window.localStorage;
export const PostUsuarioLocalStorage = ({ id, apiKey }) => {
  LS.setItem("id", id);
  LS.setItem("apiKey", apiKey);
};
export const GetUsuarioLocalStorage = () => {
  return {
    id: LS.getItem("id"),
    apiKey: LS.getItem("apiKey"),
  };
};
export const DeleteUsuarioLocalStorage = () => {
  LS.removeItem("id");
  LS.removeItem("ApiKey");
  LS.clear();
};
