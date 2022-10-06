import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {Modal, Row, Col, Form, Button, Alert, Collapse} from 'react-bootstrap';

import api from '../config/api';
import ToastBtstp from '../components/notification';

const Registro = (props) => {

  const [documento, setDocumento] = useState();
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState();

  const [resTipoDocumento, setResTipoDocumento] = useState([]);

  const [messageErrors, setMessageErrors] = useState([]);
  const [isTrue, setIsTrue] = useState(false);

  const navigate = useNavigate();
  const submitData = async(e) => {
    e.preventDefault();

    const data = await api.person.postPerson({
	      Documento: documento,
        PrimerNombre: primerNombre,
        SegundoNombre: segundoNombre,
        PrimerApellido: primerApellido,
        SegundoApellido: segundoApellido,
        Usuario: correo,
        Contrasenna: contrasenna
    });

    const {success, errors} = data;
    if(success){
      setIsTrue(success);
      setMessageErrors([]);

      setTimeout(() => {
        setIsTrue(false);
      }, 1000);


      setDocumento('');
      setPrimerNombre('');
      setSegundoNombre('');
      setPrimerApellido('');
      setSegundoApellido('');
      setCorreo('');
      setContrasenna('');

    }else{
      setMessageErrors(errors);
    }

  }

  const handleUrl = () => {
    navigate("/login");
  }

  return(
    <>
      <Modal
        {...props} // Entraria el show y el onHide
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen="lg-down"
      >
        <Modal.Body>
          <ToastBtstp show={isTrue}/>
          <h4 className="modal-title mb-3">Registro</h4>
          <Form onSubmit={submitData} style={{
            height: "450px",
            overflowY: "scroll"}}>
            <Col lg={11}>
              <Row className='mx-0'>
                {
                  messageErrors.length?
                    messageErrors.map((ele, i) => (
                      <Alert key={i} variant='danger'>{ele.message}</Alert>
                    ))
                  : null
                }
              </Row>
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Documento</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder=''
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Primer Nombre</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={primerNombre}
                      onChange={(e) => setPrimerNombre(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Segundo nombre</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={segundoNombre}
                      onChange={(e) => setSegundoNombre(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Primer apellido</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={primerApellido}
                      onChange={(e) => setPrimerApellido(e.target.value)}
                    />
                  </Form.Group>

                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Segundo apellido</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={segundoApellido}
                      onChange={(e) => setSegundoApellido(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Usuario (correo)</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder=''
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-5'>
                <Col>
                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder=''
                      value={contrasenna}
                      onChange={(e) => setContrasenna(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mx-0 mb-3'>
                <Button type='submit'>Registar</Button>
              </Row>
              <p style={{textAlign: 'center'}}>
                o
              </p>
              <Row className='mx-0'>
                <Button onClick={() => handleUrl()} variant="secondary">Inicia sesion</Button>
              </Row>
            </Col>
          </Form>
          
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Registro;