import {useState, useEffect} from 'react';
import {Row, Col, Table, ListGroup, Container, CardGroup, Card, Button} from 'react-bootstrap';

import NavBarBtstp from '../shared/navBarBtstp';

import api from '../config/api';

const Compras = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetch = async() => {
      const data = await api.ventas.getVentasByIdUser();
      const {success, res} = data;
      if(success){
        setVentas(res);
      }
    }

    fetch();
  }, []);

  return(
    <Container>
      <Row className='mx-0'>
        <Col style={{marginTop: '65px'}}>
          <Row className='mb-3'>
            <h1>Compras</h1>
          </Row>
          <Row className='' style={{
            fontSize: "25px"
          }}>
            {
              ventas.length?
                <Col>
                  {
                    ventas.map((ele, i) => (
                      <Card key={i} className="mb-3">
                        <Card.Body>
                          <Card.Text>
                            <Row className=''>
                              <Col lg={2}>
                                <img width={150} height={150} src={ele.InformacionVenta.Producto.ImgUrl}/>
                              </Col>
                              <Col>
                                <strong>Nombre:</strong> {ele.InformacionVenta.Producto.Nombre} <br/>
                                <strong>Tipo:</strong> {ele.InformacionVenta.Producto.Tipo.Descripcion} <br/>
                                <strong>Compras:</strong> {ele.InformacionVenta.Cantidad} <br/>
                                <strong>Precio:</strong> {ele.InformacionVenta.Producto.DetalleInventario.Precio}
                              </Col>
                              {/* <Col>
                                <Button variant="primary">Mirar producto</Button>
                              </Col> */}
                            </Row>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  }
                </Col>
              : <h4>
                No se han registrado compras
              </h4>
            }
          </Row>
        </Col>
      </Row>
      <NavBarBtstp/>
    </Container>
  );
}

export default Compras;