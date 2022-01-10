import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  return (
    <div style={{ width: '40%', margin: 'auto', marginTop: '170' }}>
      <div style={{ float: 'left' }}>
        <Link to="/login">
          <Button variant="contained" color="primary" size="large">
            Login
          </Button>
        </Link>
      </div>
      <div style={{ float: 'right' }}>
        <Link to="/register">
          <Button variant="contained" color="primary" size="large">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
