import { post, remove } from "./services";
import { get } from "./services";
import { GetUsuarioLocalStorage } from "../logic/localStorage";

export const getEventos = async (id) => {
    const params = {
        url: `/eventos.php?idUsuario=${id}`,
        headers: GetUsuarioLocalStorage()
    };
    return await get(params);
};

export const postEvento = async (data) => {
    const usuarioActual =  GetUsuarioLocalStorage();

    const body = JSON.stringify({
        "idCategoria": data.categoria,
        "idUsuario": usuarioActual.iduser,
        "detalle": data.detalles,
        "fecha": data.fecha
    });
    const params = {
        body: body,
        url: '/eventos.php',
        headers: GetUsuarioLocalStorage()
    };
    return await post(params);
};

export const removeEvento = async (id) => {
    const params = {
        url: `/eventos.php?idEvento=${id}`,
        headers: GetUsuarioLocalStorage()
    };
    return await remove(params);
};