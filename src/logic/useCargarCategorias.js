import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategorias } from "../services/categoriasApi";
import { cargarCategorias } from "../redux/features/categoriasSlice";

export const useCargarCategorias = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      const response = await getCategorias();
      if (response.codigo === 200) {
        dispatch(cargarCategorias(response.categorias));
      } else {
        console.error("Error al cargar las categorías:", response.mensaje);
      }
    };
    initialize();
  }, [dispatch]);
};
