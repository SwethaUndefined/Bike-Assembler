// import React, { useState,useEffect } from 'react';
// import { Input, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import {loginCheck,getSelectedBikesByUsername} from "../api";
// import "./login.css";

// const Login = () => {
  // const [formData, setFormData] = useState({ email: '', password: '' });
  // const [passwordVisible, setPasswordVisible] = useState(false);
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  //   const checkAssignedBikes = async () => {
  //     const username = localStorage.getItem('username');
  //     if (username) {
  //       try {
  //         const assignedBikes = await getSelectedBikesByUsername(username);
  //         if (assignedBikes.length > 0 && !assignedBikes.every(bike => bike.status === 'Completed')) {
  //           navigate('/assemble');
  //         }
  //         else {
  //           navigate(`/bikes`);
  //         }
  //       } catch (error) {
          
  //       }
  //     }
  //   };

    

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await loginCheck(formData);
  //     if (response.success) {
  //       localStorage.setItem('token', response.token); 
  //       localStorage.setItem('username', response.username); 
  //       message.success('Login Successful');
  //       checkAssignedBikes();
  //       navigate(`/bikes`);
  //     } else {
  //       if (response.error === 'Incorrect password. Please enter the correct password.') {
  //         message.error('Please enter the correct password.');
  //       } else if (response.error === 'Email not found. Please enter the correct email.') {
  //         message.error('Email not found. Please register to continue.');
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data.error) {
  //       message.error(error.response.data.error);
  //     } else {
  //       message.error('An error occurred. Please try again later.');
  //     }
  //   }
  // };
  

//   return (
//     <section className="login-main">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h1>Login</h1>
//           <div className="input-box">
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <i className="bx bxs-user"></i>
//           </div>
//           <div className="input-box">
//             <Input.Password
//               className="inputpassword"
//               type="password"
//               name="password"
//               placeholder="Password"
              // visibilityToggle={{
              //   visible: passwordVisible,
              //   onVisibleChange: setPasswordVisible,
              // }}
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <i className="bx bxs-lock-alt"></i>
//           </div>
//           <button type="submit" className="btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { useNavigate } from 'react-router-dom';
import {loginCheck,getSelectedBikesByUsername} from "../api";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkAssignedBikes = async () => {
    const username = localStorage.getItem('username');
    if (username) {
      try {
        const assignedBikes = await getSelectedBikesByUsername(username);
        if (assignedBikes.length > 0 && !assignedBikes.every(bike => bike.status === 'Completed')) {
          navigate('/assemble');
        } else {
          navigate(`/bikes`);
        }
      } catch (error) {
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await loginCheck(values);
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        message.success('Login Successful');
        checkAssignedBikes();
        navigate(`/bikes`);
      } else {
        if (response.error === 'Incorrect password. Please enter the correct password.') {
          message.error('Please enter the correct password.');
        } else if (response.error === 'Email not found. Please enter the correct email.') {
          message.error('Email not found. Please register to continue.');
        }
      }
    } catch (error) {
        message.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                className="login__input"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                className="login__input"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button  htmlType="submit" className="login__submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
