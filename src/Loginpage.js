import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosInstance } from "./axiosinstance";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const history = useHistory();
  const successnotify = () => toast.success(" Logged in Succesfully ");
  const failnotify = (err) => toast.error(err);
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const onlogin = (e) => {
    e.preventDefault();

    setUser({ email: "", password: "" });
    console.log(user);

    axiosInstance
      .post(`api/token/`, user)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res);
        history.push("/");

        successnotify();
      })
      .catch((err) => {
        console.error(err.response.status);
        if (err.response.status === 400) {
          failnotify("Please Input Valid data");
        } else {
          failnotify("Server Error");
        }
      });
    history.push("/login");
  };

  return (
    <>
      <div className="outer">
        <div className="inner">
          <form>
            <h3>Log in</h3>

            <div className="form-group">
              <label>Email</label>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password Here"
                onChange={handleChange}
                value={user.password}
                name="password"
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block btn-sm"
              style={{ marginTop: "10px" }}
              onClick={onlogin}
            >
              Sign in
            </button>
            <Link to='/register'><button  
              className="btn btn-dark btn-lg btn-block btn-sm"
              style={{ marginTop: "10px", marginLeft:"10px" }}
            >
              Registration
            </button></Link>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login;
