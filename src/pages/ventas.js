import { useState, useEffect } from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import api from '../config/api';



const Ventas = () => {

  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetch = async() => {
      const ventas = await api.ventas.getVentas();
      if(ventas.success){
        const {rows} = ventas.res;
        setVentas(rows);
      }
    }

    fetch();

  },[]);

  return(
    <>
    <Row className="mx-0">
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Codigo</th>
                    <th>Cantidad</th>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Primer Nombre</th>
                    <th>Primer apellido</th>
                    <th>Telefono</th>
                    <th>Calle</th>
                    <th>Carrera</th>
                    <th>Nombre calle</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.length
                    ? ventas.map((ele, i) => (
                        <tr key={i}>
                          <td>{ele.Fecha}</td>
                          <td>{ele.Codigo}</td>
                          <td>{ele.InformacionVenta.Cantidad}</td>
                          <td>{ele.InformacionVenta.Producto.Nombre}</td>
                          <td>{ele.Persona.Documento}</td>
                          <td>{ele.Persona.PrimerNombre}</td>
                          <td>{ele.Persona.PrimerApellido}</td>
                          <td>{ele.Persona.Telefono?ele.Persona.Telefono.Numero:'Vacio'}</td>
                          <td>
                            {ele.Persona.Direccione?ele.Persona.Direccione.Carrera:'Vacio'}
                          </td>
                          <td>{ele.Persona.Direccione?ele.Persona.Direccione.Calle:'Vacio'}</td>
                          <td>
                            {ele.Persona.Direccione?ele.Persona.Direccione.NombreCalle:'Vacio'}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
    </>
  );
}

export default Ventas;