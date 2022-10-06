import {useState, useEffect} from 'react';
import {Row, Col, Table} from 'react-bootstrap';

import api from '../config/api';


const Clientes = () => {
  const [clientesTodo, setClientesTodo] = useState([]);

  useEffect(() =>{
    const fetch = async() => {
      const clientes = await api.clientes.getClientes();
      const {success, res} = clientes;
      if(success){
        const{rows} = res;
        setClientesTodo(rows);
      }
    }

    fetch();
  },[]);

  return (
    <>
      <Row className='mx-0'>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Primer nombre</th>
                <th>Segundo nombre</th>
                <th>Primer apellido</th>
                <th>Segundo apellido</th>
                <th>Carrera</th>
                <th>Calle</th>
                <th>Nombre Calle</th>
              </tr>
            </thead>
            <tbody>
              {clientesTodo.length
                ? clientesTodo.map((ele, i) => (
                    <tr key={i}>
                      <td>{ele.Persona.Documento}</td>
                      <td>{ele.Persona.PrimerNombre}</td>
                      <td>{ele.Persona.SegundoNombre}</td>
                      <td>{ele.Persona.PrimerApellido}</td>
                      <td>{ele.Persona.SegundoApellido}</td>
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

export default Clientes;