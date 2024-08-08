import { GetUsuarioLocalStorage } from "../logic/localStorage";
import { get } from "./services";

export const getCategorias = async () => {
    const params = {
        url: '/categorias.php',
        headers: GetUsuarioLocalStorage()
    };
    return await get(params);
};