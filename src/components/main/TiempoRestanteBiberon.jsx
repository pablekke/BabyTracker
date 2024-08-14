import PropTypes from 'prop-types';
import { TiempoRestante } from "./TiempoRestante";

export const TiempoRestanteBiberon = ({ ultimoBiberon }) => {
    const valorUltimoBiberon = ultimoBiberon || '';

    return (
        <TiempoRestante
            ultimoEvento={valorUltimoBiberon}
            horasLimite={4}
            titulo="Tiempo restante para el próximo biberón: "
        />
    );
};

TiempoRestanteBiberon.propTypes = {
    ultimoBiberon: PropTypes.string
};