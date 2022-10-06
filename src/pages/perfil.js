import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Row, Col, Form, Alert, Collapse, Button, ListGroup} from 'react-bootstrap';


import NavBarBtstp from '../shared/navBarBtstp';
import ToastBtstp from '../components/notification';

import api from '../config/api';





const Perfil = () => {

  
  const [documento, setDocumento] = useState();
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState();

  const [resTipoDocumento, setResTipoDocumento] = useState([]);

  const [carrera, setCarrera] = useState('');
  const [calle, setCalle] = useState('');
  const [nombreCalle, setNombreCalle] = useState('');

  const [messageErrors, setMessageErrors] = useState([]);
  const [isTrue, setIsTrue] = useState(false);

  const [isTrueTelefono, setIsTrueTelefono] = useState(false);
  const [isTrueDireccion, setIsTrueDireccion] = useState(false);

  const [numero, setNumero] = useState('');
  const [direccionEmpty, setDireccionEmpty] = useState(true);
  const [telefonoEmpty, setTelefonoEmpty] = useState(true);

  const [tab, setTab] = useState('/perfil');

  const user = JSON.parse(sessionStorage.getItem('user'));

  // const navigate = useNavigate();


  // const submitUrl = (link) => {
  //   navigate(link);
  //   setTab(link);
  // }
  useEffect(() => {
    const fetch = async() => {

      const persona = await api.person.getPersonaById();
      const {errors} = persona;
      if(persona.success){
        const {Documento, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido} = persona.res.rows[0];
        setDocumento(Documento);
        setPrimerNombre(PrimerNombre);
        setSegundoNombre(SegundoNombre);
        setPrimerApellido(PrimerApellido);
        setSegundoApellido(SegundoApellido);

      }else{
        setMessageErrors(errors);
      }

      const direccion = await api.direccion.getDireccionById();
      if(direccion.success){
        const {res} = direccion;
        if(res)
          setDireccionEmpty(false)
          setCarrera(res.Carrera);
          setCalle(res.Calle);
          setNombreCalle(res.NombreCalle);
      }

      const telefono = await api.telefono.getTelefonoById();
      if(telefono.success){
        const {res} = telefono;
        if(res)
        setTelefonoEmpty(false);
        setNumero(res.Numero);
      }

    }

    fetch();
  }, [ isTrue, isTrueDireccion, isTrueTelefono]);
    
  const submitData = async(e) => {
    e.preventDefault();

    const data = await api.person.updatePersonaById({
	      Documento: documento,
        PrimerNombre: primerNombre,
        SegundoNombre: segundoNombre,
        PrimerApellido: primerApellido,
        SegundoApellido: segundoApellido,
    });

    const {success, errors} = data;
    if(success){
      setIsTrue(success);
      setMessageErrors([]);

      setTimeout(() => {
        setIsTrue(false);
      }, 1000);

    }else{
      setMessageErrors(errors);
    }

  }

  const submitDireccion = async(e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const direccion = await api.direccion.postDireccion({
      Carrera: carrera,
      Calle: calle,
      NombreCalle: nombreCalle,
      IdPersonaFk: user.IdPersona
    });

    const {success} = direccion;
    if(success){
      setIsTrueDireccion(success);

      setTimeout(() => {
        setIsTrueDireccion(false);
      }, 1000);

    }
  }

  const submitUpdateDireccion = async(e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const direccion = await api.direccion.updateDireccionById({
      Carrera: carrera,
      Calle: calle,
      NombreCalle: nombreCalle,
    });

    const {success} = direccion;
    if(success){
      setIsTrueDireccion(success);

      setTimeout(() => {
        setIsTrueDireccion(false);
      }, 1000);

    }
  }

  const submitTelefono = async(e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const direccion = await api.telefono.postTelefono({
      Numero: numero,
      IdPersonaFk: user.IdPersona
    });

    const {success} = direccion;
    if(success){
      setIsTrueTelefono(success);

      setTimeout(() => {
        setIsTrueTelefono(false);
      }, 1000);

    }
  }

  const submitUpdateTelefono = async(e) => {
    e.preventDefault();

    const direccion = await api.telefono.updateTelefono({
      Numero: numero,
    });

    const {success} = direccion;
    if(success){
      setIsTrueTelefono(success);

      setTimeout(() => {
        setIsTrueTelefono(false);
      }, 1000);

    }
  }

  return(
    <Container>
      <ToastBtstp show={isTrue?isTrue:isTrueTelefono?isTrueTelefono:isTrueDireccion?isTrueDireccion: false}/>
      <Row className="mx-0 justify-content-start" style={{marginTop:"65px"}}>
        <Col lg={4}>
              
              <Row className='mb-3'>
                <h1>Cuenta</h1>
              </Row>
              <Row className='mb-5'>
                <Form onSubmit={submitData}>
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
                        <Form.Label>Primer nombre</Form.Label>
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

                  <Col className="mx-0">
                    <Button variant='primary' type='submit'>{!isTrue?'Guardar':"Cargando..."}</Button>
                  </Col>
                </Form>
              </Row>
          </Col>
          <Col>
                <Row className="mb-3">
                  <h1>
                    Direccion
                  </h1>
                </Row>
                <Row className="mb-5" >
                    <Form onSubmit={direccionEmpty? submitDireccion: submitUpdateDireccion}>
                      
                      <Row className='mb-3'>
                        <Col>
                          <Form.Group>
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                              type='text'
                              placeholder='Carrera'
                              value={carrera}
                              onChange={(e) => setCarrera(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col>
                          <Form.Group>
                            <Form.Label>Calle</Form.Label>
                            <Form.Control
                              type='text'
                              placeholder=''
                              value={calle}
                              onChange={(e) => setCalle(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='mb-3'>
                        <Col>
                          <Form.Group>
                            <Form.Label>Nombre de la calle</Form.Label>
                            <Form.Control
                              type='text'
                              placeholder=''
                              value={nombreCalle}
                              onChange={(e) => setNombreCalle(e.target.value)}
                              />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Col className="mx-0">
                        {
                          direccionEmpty
                          ? <Button variant='primary' type='submit'>{!isTrueDireccion?'Guardar':"Cargando..."}</Button>
                          : <Button variant='primary' type='submit'>{!isTrueDireccion?'Editar':"Editando..."}</Button>
                        }
                      </Col>
                    </Form>
                </Row>
          </Col>
          <Col>
                <Row className='mb-3'>
                  <h1>Telefono</h1>
                </Row>
                <Row className="mb-5" >
                    <Form onSubmit={telefonoEmpty? submitTelefono: submitUpdateTelefono}>
                      
                      <Row className='mb-3'>
                        <Col>
                          <Form.Group>
                            <Form.Label>Numero</Form.Label>
                            <Form.Control
                              type='number'
                              placeholder=''
                              value={numero}
                              onChange={(e) => setNumero(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Col className="mx-0">
                        {
                          telefonoEmpty
                          ? <Button variant='primary' type='submit'>{!isTrueTelefono?'Guardar':"Cargando..."}</Button>
                          : <Button variant='primary' type='submit'>{!isTrueTelefono?'Editar':"Editando..."}</Button>
                        }
                      </Col>
                    </Form>
                </Row>
              </Col>
            
      </Row>
      <NavBarBtstp/>
    </Container>
  );
}

export default Perfil;