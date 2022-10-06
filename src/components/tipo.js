import {useState, useEffect} from 'react'
import {Modal, Row, Col, Form, Button, Alert, Collapse} from 'react-bootstrap';

import api from '../config/api';
import ToastBtstp from '../components/notification';

const Tipo = (props) => {

  const [tipo, setTipo] = useState('');
  const [isTrue, setIsTrue] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(props.idt);
    const tipos = await api.tipo.updateTipo(props.idt,{Descripcion: tipo});
    if(tipos.success){
      setIsTrue(true);
      setTimeout(() =>{
        setIsTrue(false);
      }, 1000)
      setTipo("");
    }
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
        <Modal.Header>
          
          <ToastBtstp show={isTrue}/>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Col>
              <Row className='mb-3'>
                <Col>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    type='text'
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className='mx-0'>
                <Button type='submit' variant="secondary">Editar</Button>
              </Row>
            </Col>
          </Form>
          
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Tipo;