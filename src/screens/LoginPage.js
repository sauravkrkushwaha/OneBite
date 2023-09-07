import React from 'react';
import './css/LoginPage.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  let naviagte = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    if (!json.success) {
      alert('Enter Valid Credentials')
    }
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('authToken', json.authToken)
      // console.log(localStorage.getItem("authToken"))
      naviagte('/')
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div id='qwerty'>
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <br />
          <button type="submit" >LOGIN</button>
          <Link to='/signup'>SignUp Now</Link>
        </form>
      </div>
    </>

  );
}
export default LoginPage;
