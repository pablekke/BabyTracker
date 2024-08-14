import { format } from 'date-fns';
import moment from 'moment';

const fechaCompletaActual = new Date();
export const fechaActual = format(fechaCompletaActual, 'yyyy-MM-dd');
export const horaActual = format(fechaCompletaActual, 'HH:mm');

export const calcularTiempoDesdeUltimoEvento = (ultimoEvento) => {
    if (!ultimoEvento) return 'No hay eventos recientes.';

    const horas = moment().diff(ultimoEvento, 'hours');
    const minutos = moment().diff(ultimoEvento, 'minutes') % 60;

    let resultado = '';
    if (horas > 0) {
        resultado += `${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    }
    if (minutos >= 0) {
        resultado += horas > 0 ? ` y ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}` : `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    }
    return resultado;
};
export const obtenerUltimoEvento = (eventos, idCategoria) => {
    const eventosFiltrados = eventos.filter(e => e.idCategoria === idCategoria);
    if (eventosFiltrados.length === 0) return null;

    // Ordenar por fecha descendente y devolver el más reciente
    return eventosFiltrados.reduce((ultimo, actual) => {
        const fechaUltimo = moment(ultimo.fecha, 'YYYY-MM-DD HH:mm');
        const fechaActual = moment(actual.fecha, 'YYYY-MM-DD HH:mm');
        return fechaActual.isAfter(fechaUltimo) ? actual : ultimo;
    }).fecha;
};

export const tiempoExcedido = (minutosRestantes) => {
    const minutosExcedidos = Math.abs(minutosRestantes);
    const horasExcedidas = Math.floor(minutosExcedidos / 60);
    const minutos = minutosExcedidos % 60;

    let resultado = '-';

    if (horasExcedidas > 0) {
        resultado += `${horasExcedidas} ${horasExcedidas === 1 ? 'hora' : 'horas'}`;
    }

    if (minutos > 0) {
        if (horasExcedidas > 0) {
            resultado += ` y ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
        } else {
            resultado += `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
        }
    }
    return resultado;
}

export const tiempoRestante = (minutosRestantes) => {
    let resultado = '';
    const horas = Math.floor(minutosRestantes / 60);
    const minutos = minutosRestantes % 60;

    if (horas > 0) {
        resultado += `${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    }

    if (minutos > 0) {
        if (horas > 0) {
            resultado += ` y ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
        } else {
            resultado += `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
        }
    }
    return resultado;
}