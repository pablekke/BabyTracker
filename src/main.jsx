import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import { Rutas } from './components/common/Rutas';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <Rutas />
    </Provider>
  </>,
)