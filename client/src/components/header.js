import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./header.css"
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div className="header">
      <Button type='primary' className='logout' onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Header;
