import {useState} from  'react';
import {Navigate, useNavigate} from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Button, ButtonToolbar, ButtonGroup, Tooltip} from 'react-bootstrap';
import {Container, Row} from 'react-bootstrap';

import Registro from '../components/registro';

// Imagenes
import inicio from '../assets/icons8-página-principal-32.png';
import carrito from '../assets/icons8-carrito-2-32.png';
import editar from '../assets/icons8-configuración-del-administrador-32.png';
import menu from '../assets/icons8-hombre-menú-de-usuario-32.png'


const NavBarBtstp = () => {

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const submitUrl = (url) => {
    navigate(url);
  }

  const outLogin = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  }

  const auth = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));

  return(
      // <Navbar collapseOnSelect fixed="top"  bg="danger" variant="danger">
      // <Container>
      //   <Navbar.Collapse id="responsive-navbar-nav">
      //     <Nav className="me-auto">
      //       <Nav.Link href="/"><img src={inicio}/></Nav.Link>
      //     {
      //       auth? // Si hay token muestra el carrito y perfil
      //         // <Nav.Link href="/carrito"><img src={carrito}/></Nav.Link>
      //         <NavDropdown
      //             id="nav-dropdown-dark-example"
      //             title={<img src={perfil}/>}
      //             menuVariant="dark"
      //             drop=''
      //           >
      //             <NavDropdown.Item href="/cuenta">Cuenta</NavDropdown.Item>
      //             {
      //               user.isAdmin?
      //                 <NavDropdown.Item href="/admin">Panel admin</NavDropdown.Item>
      //               : null
      //             }
      //             <NavDropdown.Item href="/compras">Compras</NavDropdown.Item>
      //             <NavDropdown.Divider />
      //             <NavDropdown.Item onClick={outLogin}>Salir</NavDropdown.Item>
      //           </NavDropdown>
      //       : // De lo contrario el inicio de sesion
      //         <Nav.Link href="/login">LOGIN</Nav.Link>
      //     }
      //     </Nav>
      //   </Navbar.Collapse>
      // </Container>

    // </Navbar>

    <Navbar collapseOnSelect fixed="top"  bg="primary" variant="">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Link href="/">{<img src={inicio}/>}</Nav.Link>
        {
          auth?
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/carrito">{<img src={carrito}/>}</Nav.Link>
              { user.Administrador  
                ? <Nav.Link href="/admin">{<img src={editar}/>}</Nav.Link>
                : null
              }
                <NavDropdown title={<img src={menu}/>} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/cuenta">Cuenta</NavDropdown.Item>
                  <NavDropdown.Item href="/compras">Compras</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={outLogin}>Salir</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          :
          <Navbar.Collapse className="justify-content-end">
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="me-2" aria-label="Second group">
                <Button variant="secondary" href="/login">Login</Button>
              </ButtonGroup>
              <ButtonGroup aria-label="Third group">
                <Button variant="secondary" onClick={() => setModalShow(true)}>Registrarse</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Navbar.Collapse>
        }
      </Container>
      <Registro show={modalShow} onHide={() => setModalShow(false)}/>
    </Navbar>
  );
}

export default NavBarBtstp;