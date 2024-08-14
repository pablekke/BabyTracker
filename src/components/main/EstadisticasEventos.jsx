import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { calcularTiempoDesdeUltimoEvento } from '../../logic/library';
import { useEffect, useState } from 'react';

export const EstadisticasEventos = ({ totalEventos, ultimoEvento, singular, plural }) => {
    const [tiempoUltimoEvento, setTiempoUltimoEvento] = useState('');

    useEffect(() => {
        if (ultimoEvento) {
            setTiempoUltimoEvento(calcularTiempoDesdeUltimoEvento(ultimoEvento));
            const interval = setInterval(() => {
                setTiempoUltimoEvento(calcularTiempoDesdeUltimoEvento(ultimoEvento));
            }, 60000);
            return () => clearInterval(interval);
        } else {
            setTiempoUltimoEvento('No hay eventos recientes.');
        }
    }, [ultimoEvento]);

    const textoSingular = `Último ${singular.toLowerCase()} hace ${tiempoUltimoEvento}`;

    return (
        <Row className='p-2 fondo1 justify-content-center mx-2 mb-2'>
            {!ultimoEvento ? <p className='text-center'>¡Agrega tu primer {singular}!</p> : (
                <>
                    <Col md={4}>
                        <h3 className='degrade-text text-center'>{`${plural} hoy: ${totalEventos}`}</h3>
                    </Col>
                    <Col md={8}>
                        <h3 className='degrade-text text-center'>{textoSingular}</h3>
                    </Col>
                </>
            )}
        </Row>
    );
};

EstadisticasEventos.propTypes = {
    totalEventos: PropTypes.number.isRequired,
    ultimoEvento: PropTypes.string.isRequired,
    singular: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
};