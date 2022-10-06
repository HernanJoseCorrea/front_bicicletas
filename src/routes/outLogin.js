import {Navigate, Outlet} from 'react-router-dom';

// function PrivateRoute () {
const OutLogin = () => {
  const auth = sessionStorage.getItem('token');
  // En caso de la persona buscar /login y ya esta logeado, sera redireccionado al home, 
  return(
    auth
    ? <Navigate to='/'/>
    : <Outlet />
  );
};

export default OutLogin;