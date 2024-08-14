import { createSlice } from "@reduxjs/toolkit";
import { fechaActual, obtenerUltimoEvento } from "../../logic/library";
import { format } from "date-fns";

const initialState = {
  eventos: [],
  ultimoBiberon: '',
  ultimoPañal: '',
  totalBiberonesHoy: 0,
  totalPañalesHoy: 0,
};

const eventosSlice = createSlice({
  name: "eventosSlice",
  initialState,
  reducers: {
    loadEventos: (state, action) => {
      const eventos = action.payload;
      state.eventos = [...eventos];
      actualizarUltimosEventosYTotales(state);
    },
    addEvento: (state, action) => {
      const evento = action.payload;
      state.eventos.push(evento);
      actualizarUltimosEventosYTotales(state);
    },
    deleteEvento: (state, action) => {
      const id = action.payload;
      state.eventos = state.eventos.filter(e => e.id !== id);
      actualizarUltimosEventosYTotales(state);
    },
  },
});

export const { loadEventos, addEvento, deleteEvento } = eventosSlice.actions;
export default eventosSlice.reducer;

// Función para actualizar últimos eventos y totales
const actualizarUltimosEventosYTotales = (state) => {
  state.ultimoPañal = obtenerUltimoEvento(state.eventos, 33);
  state.ultimoBiberon = obtenerUltimoEvento(state.eventos, 35);
  state.totalPañalesHoy = calcularTotalEventosHoy(state.eventos, 33);
  state.totalBiberonesHoy = calcularTotalEventosHoy(state.eventos, 35);
};

// Función para calcular el total de eventos de hoy para una categoría
const calcularTotalEventosHoy = (eventos, idCategoria) => {
  const eventosHoy = eventos.filter(evento => format(evento.fecha, 'yyyy-MM-dd') === fechaActual);
  return eventosHoy.filter(evento => evento.idCategoria === idCategoria).length;
};