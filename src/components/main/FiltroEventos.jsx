import PropTypes from 'prop-types';

export const FiltroEventos = ({ filtro, onChange }) => {
    return (
        <form className="d-flex justify-content-center fondo2 rounded-2">
            <div>
                <input
                    type="radio"
                    id="todos"
                    name="fecha"
                    value="todos"
                    checked={filtro === "todos"}
                    onChange={onChange}
                />
                <label htmlFor="todos" className="m-1">Todos</label>
            </div>
            <div className="mx-2">
                <input
                    type="radio"
                    id="hoy"
                    name="fecha"
                    value="hoy"
                    checked={filtro === "hoy"}
                    onChange={onChange}
                />
                <label htmlFor="hoy" className="m-1">Hoy</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="anteriores"
                    name="fecha"
                    value="anteriores"
                    checked={filtro === "anteriores"}
                    onChange={onChange}
                />
                <label htmlFor="anteriores" className="m-1">Anteriores</label>
            </div>
        </form>
    );
};

FiltroEventos.propTypes = {
    filtro: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};