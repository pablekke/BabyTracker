import { Link, Outlet } from "react-router-dom"
export const Dashboard = () => {
    return (
        <>
            <Outlet/>
            <Link to="/agregarEvento">Agregar Evento</Link>
        </>
    )
}
