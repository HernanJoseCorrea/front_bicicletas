import {useState, useEffect} from 'react';
import {Row, Col, ListGroup, CardGroup, Button, Container, Tab, Tabs} from 'react-bootstrap';

import CardBtstpImg from '../components/card';
import NavBarBtstp from '../shared/navBarBtstp';

import api from '../config/api';

import Inventario from './inventario';
import Clientes from './clientes';
import Ventas from './ventas';
import Tipos from './tipos';

const campos = [
  {name: "Inventario", url: "/inventario"},
  {name: "Productos agregados", url: "/productosAdd"},
  {name: "Clientes", url: "/clientes"}
];

const PanelAdmin = () => {
  const [productos, setProductos] = useState([]);

  const [tab, setTab] = useState('inventario');

  const user = JSON.parse(sessionStorage.getItem('user'));


  useEffect(() => {
    const fetch = async() => {
      const data = await api.productos.getProductosAdmin();
      const {success, res} = data;
      
      if(success){
        //console.log(res.rows[0])
        setProductos(res.rows);
      }
    }
    fetch();
  },[]);

  return(
    <Container>
      <Row className="mx-0" style={{marginTop: "65px"}}>
        <Col lg="" >
          <Row className="mb-3 mt-3">
            <h6>
              Panel administrador
            </h6>
          </Row>

          <Tabs
            id="controlled-tab-example"
            activeKey={tab}
            onSelect={(k) => setTab(k)}
            className="mb-3"
          >
            <Tab eventKey="inventario" title="Inventario">
              <Col>
                <Inventario/>
              </Col>
            </Tab>
            <Tab eventKey="productos" title="Productos">
              <Col>
                <Row lg={4} sm={2} className="mx-0 mb-5">
                  {
                    productos.length?
                      productos.map((ele, i) =>(
                        <CardGroup key={i} className="mt-3">
                          <CardBtstpImg element={ele}/>
                        </CardGroup>
                      )) // De lo contrario
                    : <h4>No se encuentran productos</h4>
                  }
                </Row>
              </Col>
            </Tab>

            <Tab eventKey="clientes" title="Clientes" >
              <Col>
                <Clientes/>
              </Col>
            </Tab>

            <Tab eventKey="ventas" title="Ventas" >
              <Col>
                <Ventas/>
              </Col>
            </Tab>

            <Tab eventKey="tipos" title="Tipos" >
              <Col>
                <Tipos/>
              </Col>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <NavBarBtstp/>
    </Container>
  );
}

export default PanelAdmin;