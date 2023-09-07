import React, { useState } from 'react';
import './css/SignUpPage.css';
import { Link } from 'react-router-dom';

function SignUpPage() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', geolocation: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/creatuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
    });
    const json = await response.json()
    console.log(json)
    if(!json.success){
      alert('Enter Valid Credentials')
    }

    // Assuming you'll handle the response here
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <br />

        <div>
          <label>Username:</label>
          <input type="text" name="name" value={credentials.name} onChange={onChange} />
        </div>
        <br />
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={onChange} />
        </div>
        <br />
        <div>
  <label>Password:</label>
  <input
    type="password"
    name="password"
    value={credentials.password}
    onChange={onChange}
  />
</div>

        <br />
        <div>
          <label>Address:</label>
          <input type="text" name="geolocation" value={credentials.geolocation} onChange={onChange} />
        </div>
        <br />
        <button type="submit">Submit</button>
        <Link to='/login' >Already a User</Link> 
      </form>
    </div>
  );
}

export default SignUpPage;
