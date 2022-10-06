import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Row, Col, Table, ListGroup, Button, Container, Card} from 'react-bootstrap';

import NavBarBtstp from '../shared/navBarBtstp';

import api from '../config/api';

const Carrito = () => {

  const [carrito, setCarrito] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async() => {
      const carrito = await api.carrito.getCarritoById();
      const {success, res} = carrito;
      if(success){
        const {rows} = res;
        setCarrito(rows);
      }
    }

    fetch();

  }, []);

  const submitUrl = (id) => {
    navigate(`/producto/${id}`,{id: id});
  };

  return(
    <Container>
      <Row className='mx-0' style={{
        marginTop: '65px',
      }}>
        <Col>
          <Row>
            <h1 className="mb-3">Carrito</h1>
          </Row>
          <Row className=''>
            {
              carrito.length?
              <Col>
                {
                  carrito.map((ele, i) => (
                    <Card key={i} className="mb-3">
                      <Card.Body>
                        <Card.Text>
                          <Row style={{
                            fontSize: "25px"
                          }}>
                            <Col lg={2}>
                              <img width={150} height={150} src={ele.Producto.ImgUrl}/>
                            </Col>
                            <Col>
                              <strong>Nombre:</strong> {ele.Producto.Nombre} <br/>
                              <strong>Precio:</strong> {ele.Producto.DetalleInventario.Precio} <br/>

                              <strong>Cantidad disponible:</strong> {ele.Producto.CantidadDisponible} <br/>
                            </Col>
                            <Col>
                              <Button variant="primary" onClick={() => submitUrl(ele.Producto.IdProducto)}>Mirar producto</Button>
                            </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                }
              </Col>
              : <h4>
                Carrito vacio
              </h4>
            }
          </Row>
        </Col>
      </Row>
      <NavBarBtstp/>
    </Container>
  );
}

export default Carrito;