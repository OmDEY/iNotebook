import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      history("/");
      props.showAlert("Account Created Successfully", "success")
    }else{
      props.showAlert("Invalid Details", "danger")
    }
  }
  
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter Your Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp"onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password"onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="cpassword"onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
