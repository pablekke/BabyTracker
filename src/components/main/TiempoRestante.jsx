import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { tiempoExcedido, tiempoRestante as calcularTiempoRestanteTexto } from '../../logic/library';

export const TiempoRestante = ({ ultimoEvento, horasLimite, titulo }) => {
    const [tiempoRestante, setTiempoRestante] = useState('');
    useEffect(() => {
        const calcularTiempoRestante = () => {
            const ahora = moment();
            const tiempoPasado = ahora.diff(ultimoEvento, 'minutes');
            const tiempoLimite = horasLimite * 60; // convertir horas en minutos
            const minutosRestantes = tiempoLimite - tiempoPasado;
            if (minutosRestantes >= 0) {
                setTiempoRestante(calcularTiempoRestanteTexto(minutosRestantes));
            } else {
                setTiempoRestante(tiempoExcedido(minutosRestantes));
            }
        };

        calcularTiempoRestante();

        const interval = setInterval(() => {
            calcularTiempoRestante();
        }, 1000);

        return () => clearInterval(interval);
    }, [ultimoEvento, horasLimite]);

    const estilo = {
        color: tiempoRestante.startsWith('-') ? 'red' : 'green',
    };

    return (
        <aside className='fondo1 p-1 m-2 d-flex flex-wrap justify-content-center align-content-center'>
            {!ultimoEvento ? '¡Agrega tu primer Biberón!' : (
                <>
                <h3 className='degrade-text d-flex flex-wrap align-content-center'>{titulo}</h3>
                <p style={estilo} className='tiempo-restante mx-2'>{tiempoRestante}</p>
            </>
            )
            }
        </aside>
    );
};

TiempoRestante.propTypes = {
    ultimoEvento: PropTypes.string.isRequired,
    horasLimite: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
}