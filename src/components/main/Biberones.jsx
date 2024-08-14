import PropTypes from 'prop-types';
import { EstadisticasEventos } from './EstadisticasEventos';

export const Biberones = ({ totalBiberones, ultimoBiberon }) => {
    const valorUltimoBiberon = ultimoBiberon || '';

    return (
        <EstadisticasEventos
            totalEventos={totalBiberones}
            ultimoEvento={valorUltimoBiberon}
            singular="Biberón"
            plural="Biberones"
        />
    );
};

Biberones.propTypes = {
    totalBiberones: PropTypes.number.isRequired,
    ultimoBiberon: PropTypes.string
};