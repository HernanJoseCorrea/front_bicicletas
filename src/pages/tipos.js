import {useState, useEffect} from 'react'
import {Row, Col, Table, Button, Form, Container} from 'react-bootstrap';
import Tipo from '../components/tipo'
import api from '../config/api';
import ToastBtstp from '../components/notification';

const Tipos = () => {
  const [tipo, setTipo] = useState('');
  const [tipos, setTipos] = useState([]);
  const [idTipo, setIdTipo] = useState(0);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const [isTrue, setIsTrue] = useState(false);


  useEffect(() => {
    const fetch = async() => {
      const tipos = await api.tipo.getTipo();
      if(tipos.success){
        const {rows} = tipos.res;
        setTipos(rows);
        setReload(false);
      }
    }
    fetch();

  }, [isTrue, show]);


  const handleSubmit = async(e) => {
    e.preventDefault();

    if(tipo === ""){
      return;
    }

    const tipos = await api.tipo.postTipo({Descripcion: tipo});
    if(tipos.success){
      setIsTrue(true);
      setTimeout(() =>{
        setIsTrue(false);
      }, 1000)
    }
  }

  const handleModal = (id) => {
    setIdTipo(id);
    setShow(true);
  }

  return(
    <Col>
    <ToastBtstp show={isTrue}/>
      <Row className="mx-0">
        <Col lg={4}>
          <Form onSubmit={handleSubmit}>
            <Col>
              <Form.Group>
                <Form.Label>Tipos</Form.Label>
                <Form.Control 
                  type="text" 
                  value={tipo}
                  placeholder="" 
                  onChange={(evet) => setTipo(evet.target.value)}
                  />
              </Form.Group>
              
              
              <Button type="submit" className="mt-3">Crear tipo</Button>
            </Col>
          </Form>
        </Col>

        <Col lg={4}>
          <Table responsive="lg" striped bordered hover>
            <thead>
              <tr>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody responsive="lg">
              {
                tipos.length
                ?
                  tipos.map((ele, i) => (
                    <tr key={i}>
                      <td>{ele.Descripcion}</td>
                      <td>{<Button onClick={() => handleModal(ele.IdTipo)}>Editar</Button>}</td>
                      <Tipo show={show} idt={idTipo} onHide={() => setShow(false)}/>
                    </tr>
                  ))
                
                :null
              }
            </tbody>
          </Table>
        </Col>
        
      </Row>
    </Col>
  );
}


export default Tipos;