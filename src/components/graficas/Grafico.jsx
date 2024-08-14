import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

export const Grafico = ({ opciones, series, seriesObject, tipo }) => {
    const serie = series ? series :seriesObject;
    return (
        <div className="grafico fondo1 d-flex justify-content-center mx-1 my-2">
            <Chart
                options={opciones}
                series={serie}
                type={tipo}
                height={350}
            />
        </div>
    );
};

Grafico.propTypes = {
    opciones: PropTypes.object.isRequired,
    series: PropTypes.arrayOf(PropTypes.number),
    seriesObject: PropTypes.arrayOf(PropTypes.object),
    tipo: PropTypes.string.isRequired
};