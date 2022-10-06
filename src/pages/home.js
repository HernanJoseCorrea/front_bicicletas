import {useState, useEffect} from 'react';
import {Row, Col, CardGroup, FloatingLabel, Form, Button, Container, Carousel} from 'react-bootstrap';
import CardBtstpImg from '../components/card';


import NavBarBtstp from '../shared/navBarBtstp';

import api from '../config/api';

const Home = () => {

  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState('');


  useEffect(() => {
    const fetch = async() => {
      const data = await api.productos.getProductosActive();
      const {success, res} = data;
      
      if(success){
        setProductos(res.rows);
      }
    }
    fetch();
  },[]);


  return (
    <Container style={{ 
      marginTop: "65px" ,
      marginBottom: "100px"
    }}>
      {/* <Row className="mx-0 mt-5">
        <Form onSubmit={submitData}>
          <Col lg={5} style={{ marginTop: "25px" }}>
            <Form.Control
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              type="text"
              placeholder="Busqueda"
            />
          </Col>
          <Col lg="auto" className="" style={{ marginTop: "25px" }}>
            <Button size="">Buscar</Button>
          </Col>
        </Form>
      </Row> */}
      {/* <Row className="mx-0">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.detodoya.com/wp-content/uploads/2020/02/750.jpg"
              width='100%'
              height={350}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row> */}
      <Row lg={4} sm={2} className="mx-0" style={{marginTop: "65px" }}>
        {productos.length
          ? productos.map((ele, i) => (
              <CardGroup key={i} className="mt-3">
                <CardBtstpImg element={ele} />
              </CardGroup>
            )) // De lo contrario
          : 
          <h1>No se encontraron productos</h1>
        }
      </Row>
      <NavBarBtstp />
    </Container>
  );
}

export default Home;