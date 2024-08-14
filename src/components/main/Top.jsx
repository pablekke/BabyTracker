import { useNavigate } from "react-router-dom"
import { DeleteUsuarioLocalStorage } from "../../logic/localStorage"
import { Reloj } from "../common/Reloj"

export const Top = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        DeleteUsuarioLocalStorage();
        navigate('/login');
    }

    return (
        <section className="top">
            <img src="src\img\duck.png" className="duck" />
            <h1 className="babyH1"> BabyTracker</h1>
            <Reloj />
            <a className="salir" onClick={handleClick}>Salir</a>
        </section>
    )
}