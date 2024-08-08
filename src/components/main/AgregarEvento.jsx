import { useState } from "react";
import { mostrarErrorToast, mostrarSuccessToast } from "../common/Toast";
import { postEvento } from "../../services/eventsApi";
import { useCargarCategorias } from "../../logic/useCargarCategorias";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fechaActual } from "../../logic/library";

export const AgregarEvento = () => {
  useCargarCategorias();
  const navigate = useNavigate();
  const categorias = useSelector((state) => state.categoriasSlice.categorias);
  const [formData, setFormData] = useState({ categoria: "", fecha: "", hora: "", detalles: "" });
  const [camposVacios, setCamposVacios] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { categoria, fecha, hora } = formData;
    if (!categoria || !fecha || !hora) {
      mostrarErrorToast('Rellene todos los campos');
      return;
    }
    // Combina fecha y hora en el formato correcto
    const fechaCompleta = `${fecha} ${hora}:00`;
    try {
      await postEvento({ ...formData, fecha: fechaCompleta });
      mostrarSuccessToast('El evento se ha agregado correctamente');
      navigate('/');
    } catch (ex) {
      mostrarErrorToast(ex.message);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...formData, [name]: value };
    const { categoria, fecha, hora } = data;
    setFormData(data);
    categoria && fecha && hora ? setCamposVacios(false) : setCamposVacios(true);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicCategoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name='categoria'
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccioná una categoría</option>
          {categorias?.map((c) => (
            <option key={c.id} value={c.id}>{c.tipo}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFecha">
        <Form.Label>Fecha:</Form.Label>
        <Form.Control
          type="date"
          max={fechaActual}
          name='fecha'
          value={formData.fecha}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicHora">
        <Form.Label>Hora:</Form.Label>
        <Form.Control
          type="time"
          name='hora'
          value={formData.hora}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategoria">
        <Form.Label>Detalles:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          className="custom-textarea"
          name="detalles"
          value={formData.detalles}
          onChange={handleChange}
        />
      </Form.Group>
      <button type="submit" disabled={camposVacios}>Agregar Evento</button>
      <Link to="/">Regresar al menú principal</Link>
    </form>
  );
};
