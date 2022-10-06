import {useState, useEffect} from 'react'
import {Modal, Row, Col, Form, Button, Alert, Collapse} from 'react-bootstrap';

import NavBarBtstp from '../shared/navBarBtstp';

import api from '../config/api';
import getFecha from '../utils/fecha';
import ToastBtstp from '../components/notification';

const InventarioRegistro = (props) => {

  const [fecha, setFecha] = useState('');
  const [numeroCompra, setNumeroCompra] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState(0); // hasta el momento solo se envia 1
  const [precio, setPrecio] = useState('');
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [tipos, setTipos] = useState([]);

  const [isTrue, setIsTrue] = useState(false);



  const submitData = async(e) => {
    e.preventDefault();

    if(
      numeroCompra === "" ||
      nombre === "" ||
      cantidad === "" ||
      tipo === 0 ||
      precio === 0 ||
      url === "" ||
      descripcion === ""
    ){
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    try{
      const inventario = await api.inventario.postInventario({
        Fecha: getFecha(),
        NumeroCompra: numeroCompra,
        IdPersonaFk: user.IdPersona
      });

      if(inventario.success){
        const productos = await api.productos.postProducto({
          Nombre: nombre,
          CantidadDisponible: parseInt(cantidad),
          IdTipoFk: tipo,
          ImgUrl: url,
          Descripcion: descripcion
        });

        if(productos.success){
          const {IdInventarioEntrada} = inventario.res;
          const {IdProducto} = productos.res;
          await api.detalleInventario.postDetalleInventario({
            Precio: parseInt(precio),
            IdInventarioEntradaFk: IdInventarioEntrada,
            IdProductoFk: IdProducto
          });
          setIsTrue(true);
          setTimeout(() => {
            setIsTrue(false);
          }, 1000);
        }
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    const fetch = async() => {
      const tiposProductos = await api.tipo.getTipo();
      const {success, res} = tiposProductos;
      if(success){
        setTipos(res.rows);
      }
    }

    fetch();
  },[]);

  return (
    <>
      <Modal
        {...props} // Entraria el show y el onHide
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <ToastBtstp show={isTrue}/>
          <h4 className="modal-title mb-3">Añadir inventario</h4>
          <Form onSubmit={submitData}>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Numero de compra</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={numeroCompra}
                    onChange={(e) => setNumeroCompra(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option>Tipo</option>
                  {tipos.map((ele, i) => (
                    <option key={i} value={ele.IdTipo}>
                      {ele.Descripcion}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Img</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
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

            <Row className="">
              <Col>
                <Button type="submit">Añadir</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InventarioRegistro;