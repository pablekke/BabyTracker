import Form from 'react-bootstrap/Form';
import { PostUsuarioLocalStorage } from "../../logic/localStorage";
import { Toast, mostrarErrorToast } from '../common/Toast';
import { registroApi } from "../../services/registroApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Registro = () => {
  const navigate = useNavigate();
  //TODO: STORE DEPTOS APIDEPTOS
  const [formRegistro, setFormRegistro] = useState({ user: "", password: "", depto: null, city: null });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = formLogin.user;
    const password = formLogin.password;
    const depto = formLogin.depto;
    const city = formLogin.city;
    if (!user || !password || !depto || !city) {
      mostrarErrorToast('Rellene todos los campos');
    } else {
      try {
        await registroApi(formRegistro);
        const response = await loginApi({ user: user, password: password });
        PostUsuarioLocalStorage(response);
        navigate('/');
      } catch (ex) {
        mostrarErrorToast(ex.mensaje)
      }
    }
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormLogin({ ...formLogin, [name]: value })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="user"
            name="user"
            onChange={handleChange}
            value={formRegistro.user}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="password"
            onChange={handleChange}
            value={formRegistro.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Departamento</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
            value={formRegistro.password}
          >
            <option>Seleccioná tu departamento</option>
            deptos.map()
          </Form.Select>

        </Form.Group>
        <button className="w-100" type="submit">Registrarse</button>
        <p className="text-center">¿Ya tenés cuenta? <Link to='/login'>ingresá acá</Link></p>
      </form>
      <Toast />
    </>
  )
}