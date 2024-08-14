import { useSelector } from "react-redux";
import { Evento } from "./Evento";
import { FiltroEventos } from "./FiltroEventos";
import { Row } from "react-bootstrap";
import { useState } from "react";
import { fechaActual } from "../../logic/library";
import { format } from "date-fns";

export const Eventos = () => {
    const eventos = useSelector((state) => state.eventosSlice.eventos);
    const categorias = useSelector((state) => state.categoriasSlice.categorias);

    const [filtro, setFiltro] = useState("todos");

    const handleFilterChange = (event) => {
        setFiltro(event.target.value);
    };

    const eventosFiltrados = eventos?.filter(e => {
        const fechaEvento = format(new Date(e.fecha), 'yyyy-MM-dd');
        switch (filtro) {
            case "anteriores":
                return fechaActual > fechaEvento;
            case "hoy":
                return fechaEvento === fechaActual;
            default:
                return true;
        }
    });

    return (
        <section className="fondo1 mt-2 rounded-2 p-2 eventos">
            <div className="sticky-top fondo1">
                <h2 className="text-center degrade-text">Eventos</h2>
                <FiltroEventos filtro={filtro} onChange={handleFilterChange} />
            </div>
            <Row className="cards-container">
                {eventosFiltrados?.map(e => (
                    <Evento key={e.id} e={e} categorias={categorias} />
                ))}
            </Row>
        </section>
    );
};