import PropTypes from 'prop-types';
import { EstadisticasEventos } from './EstadisticasEventos';

export const Pañales = ({totalPañales, ultimoPañal}) => {
    return (
        <EstadisticasEventos
            totalEventos={totalPañales}
            ultimoEvento={ultimoPañal}
            singular="Pañal"
            plural="Pañales"
        />
    );
};
Pañales.propTypes = {
    totalPañales: PropTypes.number.isRequired,
    ultimoPañal: PropTypes.string.isRequired, 
};