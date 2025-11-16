import React from 'react'
import { Link } from 'react-router-dom'



const Header = () => {
  const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
    margin: '0 10px',
  };

    
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#040404ff',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
    
      <h2 style={{ margin: 0 }}>Logo</h2>

  
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/signup" style={linkStyle}>
          Sign Up
        </Link>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
      </div>
    </header>

  )
}

export default Header
