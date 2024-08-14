import { useSelector } from 'react-redux';
import { Grafico } from './Grafico';
import moment from 'moment';

export const GraficoComidas = () => {
    const eventos = useSelector((state) => state.eventosSlice.eventos);
    if(eventos.length === 0){
        return <p className='text-center my-3'>¡Agrega tu primer comida para poder ver sus gráficas!</p>
    }
    const eventosComida = eventos.filter(evento => evento.idCategoria === 31);
    const hoy = moment().endOf('day');
    const haceUnaSemana = moment().subtract(7, 'days').startOf('day');

    // Crear un mapa de fechas a conteos de comidas
    const conteoPorDia = {};
    for (let i = 0; i <= 7; i++) { // Cambié a <= 7 para incluir el día de hoy
        const fecha = haceUnaSemana.clone().add(i, 'days').format('YYYY-MM-DD');
        conteoPorDia[fecha] = 0;
    }

    // Contar las comidas por día
    eventosComida.forEach(evento => {
        const fechaEvento = moment(evento.fecha);
        if (fechaEvento.isBetween(haceUnaSemana, hoy, null, '[]')) {
            const fecha = fechaEvento.format('YYYY-MM-DD');
            conteoPorDia[fecha] = (conteoPorDia[fecha] || 0) + 1;
        }
    });

    // Preparar datos para el gráfico
    const fechas = Object.keys(conteoPorDia);
    const cantidades = fechas.map(fecha => conteoPorDia[fecha]);

    // Configuración del gráfico
    const opciones = {
        chart: {
            type: 'bar',
            height: 300
        },
        colors: '#767dfb',
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '80%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: fechas,
            labels: {
                style: {
                    colors: 'black'
                },
                rotate: -45
            }
        },
        yaxis: {
            title: {
                text: 'Cantidad de Comidas'
            },
            labels: {
                formatter: (value) => Math.floor(value),
            },
            tickAmount: 5
        },
        fill: {
            opacity: 1
        }
    };

    const series = [{
        name: 'Comidas',
        data: cantidades
    }];

    return (
        <Grafico
            opciones={opciones}
            seriesObject={series}
            tipo="bar"
        />
    );
};