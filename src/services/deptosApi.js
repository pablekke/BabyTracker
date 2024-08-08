import { get } from "./services";

export const deptosApi = async () => {
  return await get("/departamentos.php");
};