import '../../App.css'
import { Login } from '../login/Login'
import { Registro } from '../login/Registro'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from '../main/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AgregarEvento } from "../main/AgregarEvento"
import { Eventos } from '../main/Eventos';
import { Toast } from './Toast';

export const Rutas = () => {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={
          <p className='d-block m-auto'>Vaya, parece que la página que buscás no existe :/ </p>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Eventos />} />
          <Route path='/agregarEvento' element={<AgregarEvento />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toast />
  </>
  )
}