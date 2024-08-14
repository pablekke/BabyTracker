import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import React from 'react';
import { Rutas } from './components/common/Rutas';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Rutas />
    </Provider>
  </React.StrictMode>,
)