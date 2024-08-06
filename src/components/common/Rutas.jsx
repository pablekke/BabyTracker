import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../login/Login'
import { Registro } from '../login/Registro'


export const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={
          <p className='text-center'>Vaya, parece que la página que buscás no existe :/ </p>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
      </Routes>
    </BrowserRouter>
  )
}
