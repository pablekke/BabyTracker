import { URL_API } from "./consts";
export const registroApi = (data) => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "usuario": data.user,
  "password": data.password,
  "idDepartamento": data.depto,
  "idCiudad": data.city
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${URL_API}/usuarios.php`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
