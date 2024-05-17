import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="container">
        <div className="form-container" >
         
          <div className="register-page" >
            <img
              src="https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Logo"
              
            />

            <Form layout="vertical" onFinish={submitHandler} >
              <h1>Login Form</h1>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/register">Don't have an Account ? SignUP</Link>
                <button className="btn btn-primary">Login</button>
                {loading && <Spinner />}
              </div>
            </Form>
          </div>
          </div>
      </div>
    </>
  );
};

export default Login;
