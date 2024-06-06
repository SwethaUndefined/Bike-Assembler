import React, { useState } from 'react';
import { Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {loginCheck} from "../api";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCheck(formData);
      if (response.success) {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('username', response.username); 
        message.success('Login Successful');
        navigate(`/admindashboard`);
      } else {
        if (response.error === 'Incorrect password. Please enter the correct password.') {
          message.error('Please enter the correct password.');
        } else if (response.error === 'Email not found. Please enter the correct email.') {
          message.error('Email not found. Please register to continue.');
        }
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <section className="login-main">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <Input.Password
              className="inputpassword"
              type="password"
              name="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
