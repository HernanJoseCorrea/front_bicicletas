import {useState, useEffect} from 'react'
import {Modal, Row, Col, Form, Button, Alert, Collapse} from 'react-bootstrap';

import api from '../config/api';
import ToastBtstp from '../components/notification';


const ProductoRegistro = (props) => {


  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [contenido, setContenido] = useState('');
  const [tipo, setTipo] = useState(0); // hasta el momento solo se envia 1
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [tipos, setTipos] = useState([]);

  const [isTrue, setIsTrue] = useState(false);
  const [activo, setActivo] = useState(0);

  const submitData = async(e) =>{
    e.preventDefault();

    if(
      nombre === "" ||
      cantidad === "" ||
      tipo === 0 ||
      url === "" ||
      descripcion === ""
    ){
      return;
    }

    const producto = await api.productos.updateProductos(props.idP,{
      Nombre: nombre,
      CantidadDisponible: parseInt(cantidad),
      Activo: activo,
      IdTipoFk: tipo,
      ImgUrl: url,
      Descripcion: descripcion
    });

    const {success} = producto;
    if(success){
      setIsTrue(true);
      setTimeout(() => {
        setIsTrue(false);
      }, 1000);
    }

  }

  useEffect(() => {
    const fetch = async() => {

      const productos = await api.productos.getProductoById(props.idP);
      if(productos.success){
        const {res} = productos;
        setNombre(res.Nombre);
        setCantidad(res.CantidadDisponible);
        setActivo(res.Activo);
        setTipo(res.Tipo.IdTipo)
        setUrl(res.ImgUrl);
        setDescripcion(res.Descripcion)
      }

      const tiposProductos = await api.tipo.getTipo();
      const {success, res} = tiposProductos;
      if(success){
        console.log(res.rows)
        setTipos(res.rows);
      }
    }

    fetch();
  },[]);

  return(
    <>
      <Modal
        {...props} // Entraria el show y el onHide
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <ToastBtstp show={isTrue}/>
          <h4 className="modal-title mb-3">Modificar</h4>
          <Form onSubmit={submitData}>

            <Row className='mb-3'>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=''
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder=''
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* <Row className='mb-3'>
              <Col>
                <Form.Select aria-label="Default select example" value={tipo} onChange={(e) => setTipo(e.target.value)} defaultValue={tipo}>
                  <option>Tipo</option>
                  {
                    tipos.map((ele, i) => (
                      <option key={i} value={ele.IdTipo}>{ele.Descripcion}</option>
                    ))
                  }
                </Form.Select>
              </Col>
            </Row> */}

            <Row className='mb-3'>
              <Col>
                <Form.Select aria-label="Default select example" value={activo} onChange={(e) => setActivo(e.target.value)} defaultValue={activo}>
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <Form.Group>
                  <Form.Label>Img</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=''
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder=""
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className=''>
              <Col>
                <Button type='submit'>Modificar</Button>
              </Col>
            </Row>
          </Form>
          
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductoRegistro;