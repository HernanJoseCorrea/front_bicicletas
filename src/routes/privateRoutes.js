import {Navigate, Outlet} from 'react-router-dom';

// function PrivateRoute () {
const PrivateRoute = () => {
  const auth = sessionStorage.getItem('token');
  return(
    auth
    ? <Outlet />
    : <Navigate to='/login'/>
  );
};

export default PrivateRoute;