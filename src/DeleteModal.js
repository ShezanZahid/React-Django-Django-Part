import {
    Modal,
    Button,
  } from "react-bootstrap";
  import { useState } from "react";
function DeleteModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" size="sm" onClick={handleShow}  style={{ width:"100%", margin:"5px" }}>
          {props.name}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are You sure you whant to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={props.onDeleteClick}>
              Yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default DeleteModal; 