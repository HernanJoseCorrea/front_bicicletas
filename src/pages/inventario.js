import {useState ,useEffect} from 'react';

import {Row, Col, Table, ListGroup, Button} from 'react-bootstrap';

import api from '../config/api';
import NavBarBtstp from '../shared/navBarBtstp';

import InventarioRegistro from '../components/inventario';

const Inventario = () => {

  const [inventarioTodo, setInventarioTodo] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetch = async() => {
      const inventario = await api.inventario.getInventario();
      const {success, res} = inventario;
      if(success){
        const {rows} = res;
        console.log(rows);
        setInventarioTodo(rows);
      }
    }

    fetch();
  }, [modalShow]);

  return (
    <>
      <Row
        className="mx-0"
        style={{
          marginTop: "",
        }}
      >
        <Col>
          <Row className="mb-3">
            <Col lg='auto'>
              <Button onClick={() => setModalShow(true)}>Añadir al inventario</Button>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Codigo</th>
                    <th>Documento</th>
                    <th>Primer nombre</th>
                    <th>Primer apellido</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {inventarioTodo.length
                    ? inventarioTodo.map((ele, i) => (
                        <tr key={i}>
                          <td>{ele.Fecha}</td>
                          <td>{ele.NumeroCompra}</td>
                          <td>{ele.Persona.Documento}</td>
                          <td>{ele.Persona.PrimerNombre}</td>
                          <td>{ele.Persona.PrimerApellido}</td>
                          <td>{ele.DetalleInventario.Producto.Nombre}</td>
                          <td>{ele.DetalleInventario.Producto.Tipo.Descripcion}</td>
                          <td>{ele.DetalleInventario.Precio}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
      <NavBarBtstp />
      <InventarioRegistro show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Inventario;