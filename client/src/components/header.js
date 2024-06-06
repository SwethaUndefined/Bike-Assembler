import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api'; 
import "./header.css"

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const name = localStorage.getItem('username');
  const [username,setUsername] = useState(name);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token'); 
      localStorage.removeItem("username");
      const res = await logoutUser(username); 
      console.log(res,"res")
      message.success('Logged out successfully.');
      navigate('/bikes'); 
    } catch (error) {
      message.error('Failed to logout. Please try again.');
    }
  };



  return (
    <div className="header">
      {isLoggedIn && (
        <>
        <span> {username}</span> 
        <Button type='primary' className='logout' onClick={handleLogout}>Logout</Button>
      </>
      )}
    </div>
  );
};

export default Header;
