import { useState } from "react";
import {  Link, useHistory } from "react-router-dom";
import { axiosInstance } from "./axiosinstance";
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({email: "", user_name: "", password: "" });
  const successnotify = () => toast.success("Successfully Registered ");
  const failnotify = (err) => toast.error(err);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const createUser = (e) => {
    e.preventDefault();

    setUser({ email: "", user_name: "", password: "" });
    console.log(user);

    axiosInstance
      .post(`api/user/register/`, user)
      .then((res) => {
        console.log(res.data);

        successnotify();

         
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
      history.push("/login");
  };
  return (
    <>
      <div className="outer">
        <div className="inner">
          <form onSubmit={createUser}>
            <h3> Register </h3>
            <div className="form-group">
              <label> Email </label>{" "}
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                onChange={handleChange}
                value={user.email}
                name="email"
           
              />
            </div>
            <div className="form-group">
              <label> Username </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                onChange={handleChange}
                value={user.user_name}
                name="user_name"
                required
              />
            </div>
            <div className="form-group">
              <label> Password </label>{" "}
              <input
                type="password"
                className="form-control"
                placeholder="Password Here"
                onChange={handleChange}
                value={user.password}
                name="password"
                required
              />
            </div>
            {/* <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" />
                                </div> */}
            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block btn-sm"
              style={{ marginTop: "10px" }}
            >
            
              Register
            </button>
            <p className="forgot-password text-right">
              Already registered <Link to='/login'>  log in ? </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};
export default Register;
