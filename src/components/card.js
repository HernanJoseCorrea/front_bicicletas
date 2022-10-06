import {useState, useEffect} from 'react';
import {useNavigate, Navigate, useParams} from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll' 
import {Card, Button, OverlayTrigger, Badge, Row, Col} from 'react-bootstrap';

import api from '../config/api';

import propiedades from '../assets/icons8-mostrar-propiedad-32.png';
import editar from '../assets/icons8-edit-product-32.png';

import ProductoRegistro from './producto'

const CardBtstpImg = (props) => {
  
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const submitUrl = () => {
    navigate(`/producto/${props.element.IdProducto}`,{id: props.element.IdProducto});
    scroll.scrollToTop();
  };



  return(
    <>
        <Card style={{ width: '25rem', border: "0px solid", boxShadow: "0px 0px 2px", borderColor:"black",}}>

            <Card.Img variant="top" width='50%' height={250} src={props.element.ImgUrl} alt={props.element.url} />
            {/* <Card.ImgOverlay> */}
            {/* </Card.ImgOverlay> */}
            <Card.Body>
              <div className="d-flex justify-content-start">
                <strong><Badge bg="primary">{props.element.Nombre}</Badge></strong>
              </div>
              <strong>Tipo </strong>{props.element.Tipo.Descripcion} <br/>
              <strong>Precio</strong> {props.element.DetalleInventario.Precio} <br/>
              <div className="d-flex justify-content-end">
                {
                  user?
                    user.Administrador?
                      <Button variant="primary" onClick={(e) => setModalShow(true)}><img src={editar}/></Button>
                    :null
                  :null
                } 
                <Button variant="primary" onClick={submitUrl}><img src={propiedades}/></Button>
              </div>
            </Card.Body>
        </Card>
      <ProductoRegistro show={modalShow} onHide={() => setModalShow(false)} idP={props.element.IdProducto}/>
    </>
  );

  // return(
  //   <>
  //     {/* <OverlayTrigger
  //       placement="auto-start"
  //       delay={{ show: 250, hide: 100 }}
  //       overlay={
  //         <Card
  //           bg="dark"
  //           text="light"
  //           style={{ width: '15em' }}
  //         >
  //           <Card.Body>
  //             <Card.Title><strong>{props.element.nombre}</strong></Card.Title>
  //             <Card.Text>
  //               <strong>Ml</strong> {props.element.contenido_ml} <br/>
  //               <strong>Precio</strong> {props.element.Detalle_Inventario.precio} <br/>
                
  //             </Card.Text>
  //           </Card.Body>
  //           <Card.Footer>
  //             <strong><Badge bg="warning">{props.element.Tipo.descripcion}</Badge></strong>
  //           </Card.Footer>
  //         </Card>
  //       }
  //     > */}
  //       <Card style={{ width: '25rem', border: "0px solid", boxShadow: "0px 0px 2px", borderColor:"black",}}>

  //           <Card.Img variant="top" width='50%' height={290} src={props.element.url} alt={props.element.url} />
  //           <Card.ImgOverlay>
  //             <Row>
  //               <Col>
  //                 <div className="d-flex justify-content-start">
  //                   <strong><Badge bg="warning">{props.element.Tipo.descripcion}</Badge></strong>
  //                 </div>
  //               </Col>
  //               <Col>
  //                 <div className="d-flex justify-content-end">
  //                   {
  //                     user?
  //                       user.isAdmin?
  //                         <Button variant="info" onClick={(e) => setModalShow(true)}><img src={editar}/></Button>
  //                       :null
  //                     :null
  //                   } 
  //                   <Button variant="info" onClick={submitUrl}><img src={propiedades}/></Button>
  //                 </div>
  //               </Col>
  //             </Row>
  //           </Card.ImgOverlay>
  //           <Card.Body>
  //             <Card.Title><strong>{props.element.nombre}</strong></Card.Title>
  //             <Card.Text>
  //               <strong>Ml</strong> {props.element.contenido_ml} <br/>
  //               <strong>Precio</strong> {props.element.Detalle_Inventario.precio} <br/>
  //             </Card.Text>
  //           </Card.Body>
  //           <Card.Footer >
  //             <div className="d-flex justify-content-end">
  //               {
  //                 user?
  //                   user.isAdmin?
  //                     <Button variant="info" onClick={(e) => setModalShow(true)}><img src={editar}/></Button>
  //                   :null
  //                 :null
  //               } 
  //               <Button variant="info" onClick={submitUrl}><img src={propiedades}/></Button>
  //             </div>
  //           </Card.Footer>
  //       </Card>
  //     {/* </OverlayTrigger> */}
  //     <ProductoRegistro show={modalShow} onHide={() => setModalShow(false)} idP={props.element.idProducto}/>
  //   </>
  // );
}

export default CardBtstpImg;