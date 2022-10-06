import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {
  FloatingLabel, 
  Form,
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  FormGroup
} from 'react-bootstrap'


import Registro from '../components/registro';

import api from '../config/api';

const Login = () => {
  
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState('');

  // Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState([]);

  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();



  const handelLogin = async(evet) => {
    evet.preventDefault();
    
    try{
      if(username === '' || password === ''){

      }

      setLoading(true);
      const data = await api.login.postLogin({ 
        Usuario: username,
        Contrasenna: password
      });

      const {success} = data;
      if(!success){
        const {message} = data;

        setMessage(message);
        setLoading(false);
      }else{
        const {res, token} = data;

        setMessage([]);
        setLoading(false);

        const user = JSON.stringify(res); // Parseamos a json
        sessionStorage.setItem('user', user); // Guardamos la info del usuario
        sessionStorage.setItem('token', token); // Guardamos el token el la session storage
        navigate('/'); // Redireccionamos al home
      }

      
    }catch(e){
      return 0;
    }
  }


  return(
    <Container className=''
    style={{
      marginTop: '135px',
      height: '100%',
      marginTop:'65px',
      display: 'flex',
      justifyContent: 'center',
      /* align-items por defecto tiene el valor `stretch` */
      alignItems: 'center',
    }}
    >
      <Row className=''>
        <Col xs={6} md='5' className='justify-content-end'
          style={{
            width: '350px',
            borderRadius:"1px",
            border: "0px solid",
            borderColor:"black",
            boxShadow: "0px 0px 2px",
            textAlign: "center",
            // fontWeight: "bold",
            // fontSize: "15px"
          }}
        >
          <Col className="mb-3">
            {
              message.length
              ? <ListGroup.Item variant="danger">Usuario o contraseña invalidos.</ListGroup.Item>
              : null
            }
            {
              state 
              ?  <ListGroup.Item variant='danger'>{state}</ListGroup.Item>    
              : null
            }
          </Col>
          <Form onSubmit={handelLogin}>
            <h3>Iniciar sesion</h3>
              <Form.Group
                  className='mb-3 mt-5'>
                <Form.Label>Usuario (correo)</Form.Label>
                <Form.Control 
                  type="email" 
                  value={username}
                  placeholder="" 
                  onChange={(evet) => setUsername(evet.target.value)}
                  />
              </Form.Group>

              <Form.Group
                  className='mb-3 mt-3'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password}
                  placeholder="" 
                  onChange={(evet) => setPassword(evet.target.value)}
                />
              </Form.Group>
              
            <div className="d-grid gap-2 mt-5">
              {
                loading
                  ? <Button variant='primary' size='' disabled >Cargando...</Button>
                  : <Button variant='primary' type='submit' size=''>Iniciar sesión</Button>
              }
              <p style={{textAlign: 'center'}}>
                o
              </p>
              <Button variant='secondary' size='' disabled={modalShow} onClick={() => setModalShow(true)}
                className='mb-3'
              >Registrate</Button>              
            </div>
          </Form>
        </Col>
        <Registro show={modalShow} onHide={() => setModalShow(false)}/>
      </Row>
    </Container>
  );
}

export default Login;