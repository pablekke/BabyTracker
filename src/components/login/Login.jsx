import { useState } from "react";
import { loginApi } from "../../services/loginApi";
import Form from 'react-bootstrap/Form';
import { mostrarErrorToast } from '../common/Toast';
import { PostUsuarioLocalStorage } from "../../logic/localStorage";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
	const [formLogin, setFormLogin] = useState({ user: "pablekke", password: "pablekke" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { user, password } = formLogin;
		if (!user || !password) {
			mostrarErrorToast('Rellene todos los campos');
			return;
		}

		try {
			const response = await loginApi({ user, password });
			PostUsuarioLocalStorage(response);

			navigate('/');
		} catch (ex) {
			mostrarErrorToast(ex.message);
		}
	}
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormLogin({ ...formLogin, [name]: value })
	}
	return (
		<div className="login-container">
			<form onSubmit={handleSubmit} className="w-50">
				<h1>Log in</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Usuario</Form.Label>
					<Form.Control
						type="text"
						placeholder="user"
						name="user"
						onChange={handleChange}
						value={formLogin.user}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="******"
						name="password"
						onChange={handleChange}
						value={formLogin.password}
					/>
				</Form.Group>
				<button className="w-100" type="submit">Ingresar</button>
				<p className="text-center">¿No tenés cuenta? <Link to='/registro'>Registrate acá</Link></p>
			</form>
		</div>
	)
}
