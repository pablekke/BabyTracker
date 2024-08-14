import moment from "moment";
import { useState } from "react";
import { postEvento } from "../../services/eventsApi";
import { useDispatch, useSelector } from "react-redux";
import { fechaActual, horaActual } from "../../logic/library";
import { addEvento } from "../../redux/features/eventosSlice";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { GetUsuarioLocalStorage } from "../../logic/localStorage";
import { mostrarErrorToast, mostrarSuccessToast } from "../common/Toast";

export const AgregarEvento = () => {
  const dispach = useDispatch();
  
  const categorias = useSelector((state) => state.categoriasSlice.categorias);
  const formVacio = { idCategoria: "", fecha: fechaActual, hora: horaActual, detalle: "" }
  const [formData, setFormData] = useState(formVacio);
  const [camposVacios, setCamposVacios] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { idCategoria, fecha, hora } = formData;
    if (!idCategoria || !fecha || !hora) {
      mostrarErrorToast('Rellene todos los campos');
      return;
    }

    const fechaCompleta = `${fecha} ${hora}:00`;
    if (moment(fechaCompleta).isAfter(moment())) {
      mostrarErrorToast('La fecha y hora no pueden ser mayores que la actual');
      return;
  }

    const evento = { ...formData, fecha: fechaCompleta }
    try {
      evento.idCategoria = Number(evento.idCategoria);
      const usuario = GetUsuarioLocalStorage();
      const response = await postEvento(evento, usuario);
      const idEvento = response.idEvento;
      const mensaje = response.mensaje;

      mostrarSuccessToast(mensaje);
      dispach(addEvento({ ...evento, id: idEvento }));
      setFormData(formVacio);
    } catch (ex) {
      mostrarErrorToast(ex.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...formData, [name]: value };
    const { idCategoria, fecha, hora } = data;
    setFormData(data);
    idCategoria && fecha && hora ? setCamposVacios(false) : setCamposVacios(true);
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Rellena los campos para crear un evento
    </Tooltip>
  );
  
  return (
    <section className="fondo1 mt-3 mt-md-0 p-3">
      <h2 className="text-center degrade-text">Agregar evento</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicidCategoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name='idCategoria'
            value={formData.idCategoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná una categoría</option>
            {categorias?.map((c) => (
              <option key={c.id} value={c.id}>{c.tipo}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                max={fechaActual}
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <Form.Label>Hora:</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDetalles">
          <Form.Label>Detalles:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="custom-textarea"
            name="detalle"
            value={formData.detalle}
            onChange={handleChange}
          />
        </Form.Group>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className="w-100" type="submit" disabled={camposVacios}>Agregar Evento</button>
        </OverlayTrigger>
      </form>
    </section >
  );
};