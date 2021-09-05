import { Table, Container, Button, Image, Row, Col, Card} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Moment from "moment";
import NewModal from "./Modal";
import { MyContext } from "./helperContext";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";
import { axiosInstance } from "./axiosinstance";
import Logout from "./logoutpage";
const ListPost = () => {
  const deleteNotify = () => toast.warn("Successfully Deleted");
  const { postlist1, setPostlist1 } = useContext(MyContext);
  const [postlist, setPostlist] = useState([]);
  const getPost = () => {
    axiosInstance
      .get("generic/tasklist/")
      .then((res) => {
        setPostlist(res.data);
        console.log(res.data);
        setPostlist1(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDelete = (id) => {
    axiosInstance
      .delete("generic/task/" + id)
      .then((res) => {
        console.log(res.data);
        getPost();
        deleteNotify();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getPost();
    console.log("runing");
  }, [postlist1]);

  return (
    <div>
      <ToastContainer> </ToastContainer>
      <Container fluid="md" style={{ padding: "20px 0px" }}>
        <Card style={{ padding: "20px" }}>
        <Row>
          <Col>
            
            <h2> All Posts </h2>
          </Col>
          <Col xs={5}> </Col>
          <Col>
          <Logout/>
            <Link to="/add">
              <Button style={{ width: "100%" }}> Add New Post </Button>
            </Link>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> # </th> <th> Title </th> <th> Post Type </th>
              <th> Details </th> <th> Image </th> <th> Created Date </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {postlist.map((post) => {
              const { id, title, details, post_type, created_date, image } =
                post;
              return (
                <tr key={id}>
                  <td> {id} </td> <td> {title} </td> <td> {post_type} </td>
                  <td> {details} </td>
                  <td>
                    <Image src={image} thumbnail fluid />
                  </td>
                  <td>
                    {Moment(created_date).format("DD MMM,YYYY hh:mm:ss")}
                  </td>
                  <td>
                    <Row>
                      <Col sm="12">
                        
                        <Link to={`/view/${id}`}>
                          
                          <Button
                            variant="success"
                            size="sm"
                            style={{ width: "100%", margin: "5px" }}
                          >
                            
                            View
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <DeleteModal
                          name="Delete"
                          title="Delete Confirmation"
                          onDeleteClick={() => onDelete(id)}
                          style={{ width: "100%" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <NewModal
                          name="Edit"
                          id={id}
                          title={title}
                          details={details}
                        />
                      </Col>
                    </Row>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
      </Container>
    </div>
  );
};

export default ListPost;
