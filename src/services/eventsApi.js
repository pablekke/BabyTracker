import { post, remove } from "./services";
import { get } from "./services";

export const getEventos = async (user) => {
    const params = {
        url: `/eventos.php?idUsuario=${user.iduser}`,
        user: user
    };
    return await get(params);
};

export const postEvento = async (data, user) => {
    const body = JSON.stringify({
        "idCategoria": data.idCategoria,
        "idUsuario": user.iduser,
        "detalle": data.detalle,
        "fecha": data.fecha
    });
    const params = {
        body: body,
        url: '/eventos.php',
        user: user
    };
    return await post(params);
};

export const removeEvento = async (id, user) => {
    const params = {
        url: `/eventos.php?idEvento=${id}`,
        user: user
    };
    return await remove(params);
};