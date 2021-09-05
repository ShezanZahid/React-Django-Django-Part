import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import { useContext,useState,useEffect,useRef } from "react";
import axios from "axios";
import {MyContext} from './helperContext';
import { ToastContainer, toast } from 'react-toastify'
import { Link, useHistory  } from "react-router-dom";
import { axiosInstance } from "./axiosinstance";



const AddPost = () => {
  const history = useHistory();
  const uploadfile =useRef();
  const [posttype,setPosttype] = useState([]);
  const successnotify = () => toast.success("Post Successfully Added ");
  const failnotify = (err) => toast.error(err);
  const {postlist1,setPostlist1} = useContext(MyContext);
  const [post, setPost] = useState({ title: "", details: "",post_type:"",image:""});
  
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    console.log(post);

  };
  const onFileChange = (e) => {
    setPost({...post, image:e.target.files[0]})
    console.log(post);

  };
  const getPostType = () =>{
    axiosInstance.get('generic/postType/')
        .then(res=>{
          setPosttype(res.data);
          console.log(posttype);
        })
        .catch(err=>{console.error(err)});
}

      useEffect(()=>{
        getPostType()
        console.log('runing Post Type')
      },[])

  const createPost = (e) => {
    e.preventDefault();

    
    let formData =new FormData();
    formData.append("title",post.title)
    formData.append("details",post.details)
    formData.append("post_type",post.post_type)
    formData.append("image",post.image)
    console.log(post);
    setPost({ title: "", details: "",post_type:"",image:""});
    uploadfile.current.value = ""
    console.log(post);

    axiosInstance
      .post("generic/task/", formData)
      .then((res) => {
        console.log(res.data);
       
        successnotify();
        setPostlist1(true);
      
      })
      .catch((err) => {
        console.error(err.response.status);
        if(err.response.status === 400) {
          failnotify("Please Input Valid data");
        }
        else{
          failnotify("Server Error");
        }
        
      });
      history.push("/");
  };
  return (
    <>
      <Container fluid="md" style={{padding: "0px 0px"}}>
          <h2 style={{padding: "10px 0px"}} onClick={()=>getPostType()}>Add New Post</h2>
        <Card>
          <Card.Header>Add New Post</Card.Header>
          <Card.Body>
            <Form onSubmit={createPost }>
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
                    name="title"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid TItle.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                Post Type
                </Form.Label>
                <Col sm="10">
                  
                  <Form.Select  value={post.post_type} name="post_type"  onChange={handleChange}  >
                  <option  value="">Select a option</option>
                  {posttype.map((postT)=>{
                   
                    return(
                      <option key={postT.id} value={postT.id}>{postT.title}</option>
                    );
                    })}
                
                </Form.Select>
                  
                 
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
                    name="details"
                   
                    onChange={handleChange}
                  />
                  
                </Col>
              </Form.Group>
            
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload post Image</Form.Label>
                <Form.Control type="file" name="image" onChange={onFileChange} ref={uploadfile}/>
              </Form.Group>
              <Row>
                <Col sm="8"></Col>
                <Col sm="2">
                <Link to='/'><Button variant="danger" style={{ width:"100%" }}>Back</Button></Link></Col>
                <Col sm="2">
                    <Button type="submit" variant="primary" style={{width:"100%"}} >Submit</Button>
                </Col>
              </Row>
            </Form>
            <ToastContainer />
          </Card.Body>
        </Card>
      </Container>
      
    </>
  );
};

export default AddPost;
