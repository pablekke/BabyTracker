import { format } from 'date-fns';

const fechaCompletaActual = new Date();
export const fechaActual = format(fechaCompletaActual, 'yyyy-MM-dd');