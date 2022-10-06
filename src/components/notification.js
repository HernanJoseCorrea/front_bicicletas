import {Toast} from 'react-bootstrap';
import check from '../assets/icons8-comprobado.gif'

const ToastBtstp = (props) => {

  return(
    <>
      <Toast
      {...props}
      style={{
        marginTop: "60px",
        marginLeft: "83%",
        position: "absolute",
        width: "100px",
      }}>
        <Toast.Header 
          closeButton={false}>
          <strong className="me-auto">
            <img width="32" height="32" src={check}/>
          </strong>
        </Toast.Header>
      </Toast>
    </>
  );
}

export default ToastBtstp;