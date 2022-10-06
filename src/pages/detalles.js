import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { Row, Col, Badge, CardGroup, Form, FormGroup, Button, Nav, NavItem, Container, Tab, Tabs} from 'react-bootstrap';

import CardBtstpImg from '../components/card';
import NavBarBtstp from '../shared/navBarBtstp';
import ToastBtstp from '../components/notification';

import api from '../config/api';
import getFecha from '../utils/fecha';

import añadirCarrito from '../assets/icons8-añadir-cesta-32.png';
import comprar from '../assets/icons8-comprar-por-dinero-32.png'

const Detalles = () => {
  const [idProducto, setIdProducto] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [ml, setMl] = useState(0);
  const [tipo, setTipo] = useState('');
  const [precio, setPrecio] = useState(0);
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [isTrue, setIsTrue] = useState(false);
  const [tab, setTab] = useState('descripcion');

  const [show, setShow] = useState(false);

  const [cantidadAnadida, setCantidadAnadida] = useState(1);


  const [] = useState();

  const navigate = useNavigate();
  const params = useParams();
  const {id} = params;

  useEffect(() =>{

    const fetch = async() =>{
      
      const data = await api.productos.getProductoById(id);
      console.log(data);
      const {success, res} = data;
      if(success)
        setNombre(res.Nombre);
        setCantidad(res.CantidadDisponible);
        setTipo(res.Tipo.Descripcion);
        setPrecio(res.DetalleInventario.Precio);
        setUrl(res.ImgUrl);
        setDescripcion(res.Descripcion);
    }

    fetch();
    
  }, [id, isTrue]);// Cambiara cuando el id de entrada es diferente al anterior


  const submitComprar = async(e) => {
    e.preventDefault();

    const auth = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if(auth == null){
      navigate('/login');
    }else{

      const random = (min, max) =>{
        var num = Math.floor((Math.random() * (max - 1 + min)) + min);
        return num;
      }

      let randomIndex = '';

      for (let i = 0; i <= 8; i++) {
        // obtengo el aleatorio entre 2 y 9
        randomIndex += String(random(2, 7));
        // incremento las apariciones de este valor
      }
      
      // Se hace el post a gestion de ventas
      const data = await api.ventas.postVenta({
        Fecha: getFecha(),
        Codigo: String(randomIndex), // El codigo debe ser unico
        IdPersonaFk: user.IdPersona,
        Cantidad: cantidadAnadida,
        IdProductoFk: id
      });

      const {success, message} = data;
      if(success){

        const data = await api.productos.updateProductoDescontarCant(id, {
          Cantidad: cantidadAnadida
        });
        const {success} = data;
        if(success){
          setIsTrue(true);
          setTimeout(() => {
            setIsTrue(false);
          }, 1000);
        }
      }else{
        console.log("ha habido un error");
      }
    }
  }

  const submitCarrito = async() => {

    const auth = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if(auth == null){
      navigate('/login');
    }else{
      const carrito = await api.carrito.postCarrito({
        IdProductoFk: id,
        IdPersonaFk: user.IdPersona
      });
      const {success} = carrito;
      if(success){
        setIsTrue(true);
        setTimeout(() => {
          setIsTrue(false);
        }, 1000);
      }
    }
  }


  return(
    <Container>
      <ToastBtstp show={isTrue}/>
    <Row className="mx-0 mt-5">
      <div style={{
        width:"98.5%", 
        height:"450px", 
        border:"0px solid black",
        borderColor:"grey", 
        marginTop:"30px",
        marginLeft: "10px",
        marginRight: "10px",
        boxShadow: "0px 0px 1px"
      }}>
        <Row>
          <Col lg="auto">
            <img
            style={{
              marginLeft:"15px",
              marginTop:"15px",
              width:"450px",
              height:"400px",
              borderRadius:"1px",
              border: "0px solid",
              borderColor:"black",
              boxShadow: "0px 0px 0px"
            }}
            src={url}/>
          </Col>
          <Col>
            <Row>
              <Col lg="auto">
                <h1 style={{marginTop:"15px"}}>
                  <strong>{nombre}</strong>
                </h1>
              </Col>
              <Col className="mt-3">
                <h6 style={{marginTop:"", fontSize:"25px", color:'blue'}}>
                <strong>${precio}</strong>
                </h6>
              </Col>
            </Row>
            <Row >
              <div style={{marginTop:"35px", fontSize:"20px"}}>
                <Col lg={4} className=''>
                  <h6>
                    {/* Cantidad <Badge bg="primary">1</Badge> */}
                    <Badge>{cantidad}</Badge> disponibles
                  </h6> 
                </Col>
                <Col lg={1} className="mb-5">
                  <FormGroup>
                    <Form.Control
                      disabled={cantidad == 0? true:false}
                      placeholder=""
                      aria-label=""
                      defaultValue={1}
                      min={1}
                      max={cantidad}
                      type='number'
                      value={cantidadAnadida}
                      onChange={(e) => setCantidadAnadida(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </div>
            </Row>
            <Row>
              <Col lg="auto">
                <Button 
                  disabled={cantidad == 0? true:false}
                  onClick={submitComprar}
                >
                  <img src={comprar}/>
                  Comprar ahora</Button>
              </Col>
              <Col>
                <Button 
                  disabled={false}
                  onClick={submitCarrito}
                >
                  <img src={añadirCarrito}/>{' '}
                  Añadir a la canasta</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Row>
    <Row className="mx-0 mt-5 mb-5">
          <Tabs
            id="controlled-tab-example"
            activeKey={tab}
            onSelect={(k) => setTab(k)}
            className="mb-3"
          >
            <Tab eventKey="descripcion" title="Descripcion">
              <Col>
                <p>
                  <strong>Nombre</strong> {nombre} <br/>
                  <strong>Precio</strong> {precio} <br/>
                  <strong>Tipo</strong> {tipo} <br/>
                </p>
                <p>
                  <strong>Informe general</strong> <br/> {descripcion}
                </p>
              </Col>
            </Tab>
          </Tabs>
    </Row>
    <NavBarBtstp/>
    </Container>
  );
}

export default Detalles;