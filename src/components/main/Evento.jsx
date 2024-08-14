import PropTypes from 'prop-types';
import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUrlImg } from "../../services/services";
import { format } from "date-fns";
import { removeEvento } from "../../services/eventsApi";
import { deleteEvento } from "../../redux/features/eventosSlice";
import { mostrarSuccessToast } from "../common/Toast";
import { GetUsuarioLocalStorage } from "../../logic/localStorage";

export const Evento = ({ e, categorias }) => {
    const dispatch = useDispatch();
    const categoria = categorias.find(c => c.id === e.idCategoria);
    if (!categoria) return null;

    const id = e.id;
    const detalle = e.detalle;
    const nombre = categoria.tipo;
    const src = getUrlImg(String(categoria.imagen));
    const fecha = format(new Date(e.fecha), 'dd/MM/yyyy hh:mm a');

    const handleRemove = async (id) => {
        const usuario = GetUsuarioLocalStorage();
        const response = await removeEvento(id, usuario);
        dispatch(deleteEvento(id));
        mostrarSuccessToast(response.mensaje);
    };

    return (
        <Col sm={12} md={10} lg={6} className='p-0'>
            <Card>
                <Card.Header className='pt-0'>
                    <div className="row">
                        <Card.Title className='col-10 m-0 d-flex justify-content-center'>
                            <img className='mx-2 rounded-circle' src={src} alt={nombre} />
                            <p className='m-0 d-inline-block m-auto'>{nombre}</p>
                        </Card.Title>
                        <div className='col-2 align-content-center'>
                            <button
                                onClick={() => handleRemove(id)}
                                className="btn-close m-0"
                                aria-label="Eliminar">
                            </button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className='d-flex justify-content-center'>
                        <p className='mb-1'>{fecha}</p>
                    </Card.Subtitle>
                    <Card.Text>{detalle}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

Evento.propTypes = {
    e: PropTypes.shape({
        id: PropTypes.number.isRequired,
        detalle: PropTypes.string,
        idCategoria: PropTypes.number.isRequired,
        fecha: PropTypes.string.isRequired,
    }).isRequired,
    categorias: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        tipo: PropTypes.string.isRequired,
        imagen: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    })).isRequired,
};