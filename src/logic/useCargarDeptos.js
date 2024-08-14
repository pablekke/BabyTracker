import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deptosApi } from "../services/deptosApi";
import { cargarDeptos } from "../redux/features/deptosSlice";

export const useCargarDeptos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      const response = await deptosApi();
      if (response.codigo === 200) {
        dispatch(cargarDeptos(response.departamentos));
      } else {
        console.error("Error al cargar los departamentos:", response.mensaje);
      }
    };
    initialize();
  }, [dispatch]);
};
