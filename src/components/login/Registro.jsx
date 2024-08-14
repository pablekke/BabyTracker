import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/loginApi";
import { citiesApi } from "../../services/citiesApi";
import { registroApi } from "../../services/registroApi";
import { Toast, mostrarErrorToast } from '../common/Toast';
import { useCargarDeptos } from '../../logic/useCargarDeptos';
import { PostUsuarioLocalStorage } from "../../logic/localStorage";

export const Registro = () => {
  useCargarDeptos();
  const navigate = useNavigate();
  const deptos = useSelector((state) => state.deptosSlice.deptos);
  const [ciudades, setCiudades] = useState([]);
  const [formRegistro, setFormRegistro] = useState({ user: "", password: "", depto: "", city: "" });

  useEffect(() => {
    const cargarCiudades = async (idDepto) => {
      const response = await citiesApi(idDepto);
      response.codigo === 200 ? setCiudades(response.ciudades) : setCiudades([]);
    };
    formRegistro.depto ? cargarCiudades(formRegistro.depto) : setCiudades([])
  }, [formRegistro.depto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, password, depto, city } = formRegistro;
    if (!user || !password || !depto || !city) {
      mostrarErrorToast('Rellene todos los campos');
      return;
    }
    try {
      await registroApi(formRegistro);
      const response = await loginApi({ user, password });
      PostUsuarioLocalStorage(response);
      navigate('/');
    } catch (ex) {
      mostrarErrorToast(ex.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegistro({ ...formRegistro, [name]: value });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="w-50">
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

        <Form.Group className="mb-3" controlId="formBasicDepto">
          <Form.Label>Departamento</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="depto"
            onChange={handleChange}
            value={formRegistro.depto}
          >
            <option value="">Seleccioná tu departamento</option>
            {deptos?.map((d) => (
              <option key={d.id} value={d.id}>{d.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>Ciudad</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="city"
            onChange={handleChange}
            value={formRegistro.city}
            disabled={!formRegistro.depto}
          >
            <option value="">Seleccioná tu ciudad</option>
            {ciudades.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <button className="w-100" type="submit">Registrarse</button>
        <p className="text-center">¿Ya tenés cuenta? <Link to='/login'>ingresá acá</Link></p>
      </form>
      <Toast />
    </div>
  );
};
