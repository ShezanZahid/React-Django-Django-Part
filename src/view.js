import { useState, useEffect} from "react";
import { Card,Container } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";

function Postview()  {
    const [post, setPost] = useState([]);
    const {id} = useParams();

    const loadpost =() => {
        axios.get('http://127.0.0.1:8000/generic/task/'+id)
        .then(res=>{
            setPost(res.data);
            console.log(res.data);
        })
        .catch(err=>{ 
          console.error(err);
        });
        console.log(post);
    }
    useEffect(() => {
        loadpost();
        console.log("loading post");
      }, []);

    return(
        <>
        <Container fluid="md" style={{ padding: "20px 0px" }}>
            <Card>
                <Card.Img variant="top" src={post.image} style={{ height:"500px",width:"100%",objectFit:"cover"}}/>
                
                <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.created_date}</Card.Subtitle>
                <Card.Text>
                    {post.details}
                </Card.Text>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}
export default Postview;