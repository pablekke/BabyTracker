import { get } from "./services";

export const getCategorias = async (user) => {
    const params = {
        url: '/categorias.php',
        user: user
    };
    return await get(params);
};