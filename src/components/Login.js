import {React, useState}from 'react'
import Nav from './Navbar'
import {Button} from "@material-tailwind/react";
import logo from "../Assets/logo.jpg"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
    const [auth, setAuth]= useState({
    email: "",
    password: "",  
  });

  function handleChange(e){
    const newdata= {...auth}
    newdata[e.target.name]= e.target.value
    setAuth(newdata)
    // console.log(newdata)
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // https://meyd-it.onrender.com/login
      const response = await axios.post('https://meydit.onrender.com/login', { email: auth.email, password: auth.password }, {
        headers: {
          Accept: 'application/json'
        }
      });
      const { token , id,usertype,fname,lname,email,phone,address  } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem("user_id",id);
      localStorage.setItem('userType', usertype);
      localStorage.setItem("fname", fname);
      localStorage.setItem("lname",lname)
      localStorage.setItem("email",email)
      localStorage.setItem("phone",phone)
      localStorage.setItem("address",address);
      console.log('User type:', usertype);
      console.log("fname: ", fname);
      if (usertype==="maker"){
        navigate("/maker");
      }
      else{
        navigate("/consumer");

      }
    } catch (error) {
      console.error(error);
      
    }
  }
  

    const labelClass= "block text-gray-700 text-sm font-bold mb-2";
    const inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div>
    <Nav/>
    <div className='flex justify-center mt-16 '>
     <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleLogin}>
    <img src={logo} className='max-w-1/2 mx-auto' alt='logo'/>
     <label className={labelClass}>Email address:</label>
        <input className={inputClass} name="email"  type='email' onChange={handleChange} required/>
        <label className={labelClass} >Password:</label>
        <input className={inputClass} name="password"  type='password'  onChange={handleChange} required/>
        <p className='mt-2 '>Don't have an account? <Link to="/signin" className='text-primary'>Sign In</Link></p>
        <div className='flex justify-center '>
        <button className='bg-primary  text-white font-bold py-2 px-4 rounded mt-2'>LOG IN</button>
        </div>

     </form>

    </div>
    </div>
  )
}

export default Login