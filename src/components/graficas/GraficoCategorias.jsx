import { useSelector } from 'react-redux';
import { Grafico } from './Grafico';

export const GraficoCategorias = () => {
    const eventos = useSelector((state) => state.eventosSlice.eventos);
    const categorias = useSelector((state) => state.categoriasSlice.categorias);
    if(eventos.length === 0){
        return <p className='text-center my-3'>¡Agrega tu primer evento para poder ver sus gráficas!</p>
    }

    // Crear un mapa de id a tipo de categoría
    const mapaCategorias = categorias.reduce((acc, categoria) => {
        acc[categoria.id] = categoria.tipo;
        return acc;
    }, {});

    // Contar eventos por categoría
    const conteoCategorias = eventos.reduce((acc, evento) => {
        const nombreCategoria = mapaCategorias[evento.idCategoria];
        if (nombreCategoria) {
            if (acc[nombreCategoria]) {
                acc[nombreCategoria]++;
            } else {
                acc[nombreCategoria] = 1;
            }
        }
        return acc;
    }, {});

    const categoriasKeys = Object.keys(conteoCategorias);
    const cantidades = categoriasKeys.map(categoria => conteoCategorias[categoria]);

    const opciones = {
        chart: {
            type: 'pie',
            height: 350
        },
        labels: categoriasKeys,
        dataLabels: {
            enabled: true
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%'
                }
            }
        },
        fill: {
            opacity: 1
        }
    };
    return (
        <Grafico
            opciones={opciones}
            series={cantidades}
            tipo="pie"
        />
    );
};
