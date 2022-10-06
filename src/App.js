import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Detalles from './pages/detalles';
import Carrito from './pages/carrito';
import Perfil from './pages/perfil';
import Compras from './pages/compras';

import PanelAdmin from './pages/admin';

import PrivateRoute from './routes/privateRoutes';
// import PrivateRouteAdmin from './routes/privateRouteAdmin';
import OutLogin from './routes/outLogin';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<PrivateRoute/>}>
            <Route path="/admin" element={<PanelAdmin/>}/>
          </Route>

          <Route path="/carrito" element={<PrivateRoute/>}>
            <Route path="/carrito" element={<Carrito/>}/>
          </Route>

          <Route path="/login" element={<OutLogin/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>

          <Route path="/cuenta" element={<PrivateRoute/>}>
            <Route path="/cuenta" element={<Perfil/>}/>
          </Route>

          <Route path="/" element={<Home/>}/>{/**contiene navbar */ }
          <Route path="/producto/:id" element={<Detalles/>}/>{/**contiene navbar */ }

          <Route path="/compras" element={<PrivateRoute/>}>
            <Route path="/compras" element={<Compras/>}/>
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
