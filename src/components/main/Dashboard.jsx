import { useState, useEffect } from "react";
import { Top } from "./Top";
import { Pañales } from "./Pañales";
import { Biberones } from "./Biberones";
import { Col, Row } from "react-bootstrap";
import { AgregarEvento } from "./AgregarEvento";
import { getEventos } from "../../services/eventsApi";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getCategorias } from "../../services/categoriasApi";
import { TiempoRestanteBiberon } from "./TiempoRestanteBiberon";
import { loadEventos } from "../../redux/features/eventosSlice";
import { GetUsuarioLocalStorage } from "../../logic/localStorage";
import { loadCategorias } from "../../redux/features/categoriasSlice";
import { GraficoCategorias } from "../graficas/GraficoCategorias";
import { GraficoComidas } from "../graficas/GraficoComidas";
import { SpinnerCustom } from "../common/SpinnerCustom";

export const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usuario = GetUsuarioLocalStorage();

    useEffect(() => {
        const inicializar = async () => {
            try {
                if (!usuario.iduser) {
                    navigate('/login');
                    return;
                }
                const responseEventos = await getEventos(usuario);
                dispatch(loadEventos(responseEventos?.eventos));

                const responseCategorias = await getCategorias(usuario);
                dispatch(loadCategorias(responseCategorias?.categorias));

                setIsLoading(false);
            } catch (e) {
                console.error('Error:', e);
                setIsLoading(false);
            }
        };
        inicializar();
    }, [dispatch, navigate, usuario]);

    const ultimoBiberon = useSelector((state) => state.eventosSlice.ultimoBiberon);
    const ultimoPañal = useSelector((state) => state.eventosSlice.ultimoPañal);
    const totalBiberones = useSelector((state) => state.eventosSlice.totalBiberonesHoy);
    const totalPañales = useSelector((state) => state.eventosSlice.totalPañalesHoy);

    if (isLoading) {
        return <SpinnerCustom />;
    }

    return (
        <section>
            <Top />
            <TiempoRestanteBiberon ultimoBiberon={ultimoBiberon} />
            <Row className="px-3">
                <Row className="mx-auto p-0">
                    <Col xs={12} md={7} className="px-0">
                        <Biberones totalBiberones={totalBiberones} ultimoBiberon={ultimoBiberon} />
                        <Pañales totalPañales={totalPañales} ultimoPañal={ultimoPañal} />
                        <Outlet />
                    </Col>
                    <Col xs={12} md={5} className="px-0">
                        <AgregarEvento />
                        <GraficoCategorias />
                        <GraficoComidas />
                    </Col>
                </Row>
            </Row>
        </section>
    );
};
