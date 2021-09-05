import {
    Row,
    Col,
    Form,
    Modal,
    Button,
    Container,
  } from "react-bootstrap";
import { useState,useContext  } from "react";
import axios from "axios";
import {MyContext} from './helperContext';
import {  toast } from 'react-toastify'
import { useForm } from "react-hook-form";

  
function NewModal(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const successnotify = () => toast.success(" Post Successfully Updated ");
    const failnotify = (err) => toast.error(err);
    const {postlist1,setPostlist1} = useContext(MyContext);
    const [show, setShow] = useState(false);
    const [post, setPost] = useState({ title: props.title, details: props.details});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        console.log();
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });

      };

   
    const onUpdate =(id)=>{
        axios.get('http://127.0.0.1:8000/generic/task/'+id)
       
        .then(res=>{
            setPost(res.data);
            
            console.log(res.data);
        })
        .catch(err=>{ 
          console.error(err);
        });
        console.log(post);



        axios.put('http://127.0.0.1:8000/generic/task/'+id+'/', post)
        .then(res=>{console.log(res.data)
          successnotify();
        })
        .catch(err=>{
          if(err.response.status === 400) {
            failnotify("Please Input Valid data");
          }
          else{
            failnotify("Server Error");
          }
          console.error(err)});
          
        handleClose();
        setPostlist1(true);
    }

    
  
    return (
      <>
        <Button variant="primary" size="sm" onClick={handleShow} style={{ width:"100%",margin:"5px" }}>
          {props.name}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>

                <Form onSubmit={handleSubmit((data)=>{
               
                console.log(data)
              })}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Post Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={post.title}
                    type="text"
                    placeholder="Title"
                    //name="title"
                    {...register("title", { required: true, maxLength:10}  )}
                    onChange={handleChange}
                  />
                  {errors.title?.type === 'maxLength' && "Length Can not be more then 10 letter"}
                  {errors.title?.type === 'required' && "Required"}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Post Details
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={post.details}
                    as="textarea"
                    placeholder="Provide Post Details here"
                    style={{ height: "100px" }}
                    //name="details"
                    {...register("details", { required: true, maxLength:10}  )}
                    onChange={handleChange}
                  />
                  {errors.details?.type === 'maxLength' && "Length Can not be more then 10 letter"}
                  {errors.details?.type === 'required' && "Required"}
                </Col>
              </Form.Group>
              <Row>
                <Col sm="8"></Col>
                <Col sm="4">
                    <Button onClick={handleSubmit((data)=>{
                        onUpdate(props.id)
                        console.log(data)
                      })} variant="primary" style={{width:"100%"}} >Submit</Button>
                </Col>
              </Row>
            </Form>

          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
  
  export default NewModal;