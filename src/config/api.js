import login from './login';
import person from './personas';
import general from './general';
import productos from './productos';
import ventas from './gestionVentas';
import inventario from './inventario';
import detalleInventario from './detalleInventario';
import tipo from './tipo';
import direccion from './direccion';
import ciudad from './ciudad';
import clientes from './clientes';
import carrito from './carrito';
import telefono from './telefono';

const api = {
  login,
  person,
  general, 
  productos,
  ventas,
  inventario,
  detalleInventario,
  tipo,
  direccion,
  ciudad,
  clientes,
  carrito,
  telefono
}

export default api;