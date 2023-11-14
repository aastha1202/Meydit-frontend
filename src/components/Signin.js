import React, { useState } from 'react'
import logo from "../Assets/logo.jpg"
import axios from 'axios';
import Nav from './Navbar';
import { Link, useNavigate } from 'react-router-dom';



const Signin = () => {
  let navigate = useNavigate();
  const [phoneError, setPhoneError] = useState("");
  const [profileData, setProfileData]= useState({
    fname: "",
    lname:"",
    userType:"",
    email: "",
    password: "",
    phone:"",
    address:""
  });
  
  const addressOptions = [
    { label: "Andheri", value: "Andheri" },
    { label: "Bandra", value: "Bandra" },
    { label: "Colaba", value: "Colaba" },
    { label: "Dadar", value: "Dadar" },
    { label: "Juhu", value: "Juhu" },
    { label: "Malad", value: "Malad" },
    { label: "Powai", value: "Powai" },
    { label: "Santacruz", value: "Santacruz" },
    { label: "Vashi", value: "Vashi" },
    { label: "Worli", value: "Worli" },
  ];
  
  

  function handleChange(e){
    const newdata= {...profileData}
    newdata[e.target.name]= e.target.value
    setProfileData(newdata)
    console.log(newdata)
  }
  const handlePhoneChange = (e) => {
    const regex = /^\d{10}$/;
    if (!e.target.value.match(regex)) {
      setPhoneError("Please enter a valid phone no.");
    } else {
      setPhoneError("");
      const data={...profileData}
      data[e.target.name]=e.target.value
      setProfileData(data)
    }
  };


  const handleSelect = (e) => {
    const data= {...profileData};
    data[e.target.name]=e.target.value
    setProfileData(data);
    console.log(data)
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.post("https://meyd-it.onrender.com/user",{
      fname: profileData.fname,
      lname:profileData.lname,
      userType:profileData.userType,
      email:profileData.email,
      password:profileData.password,
      phone:profileData.phone,
      address:profileData.address
  })
  .then(res=>{
      console.log(res.data);
      navigate("/login")
  })
  }


  const labelClass= "block text-gray-700 text-sm font-bold mb-2";
  const inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

return (
  <div>
  <Nav/>
  <div className=' mt-20 max-w-1/4 m-auto'>
   <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
  <img src={logo} className='max-w-1/2 mx-auto' alt='logo'/>
   <label className={labelClass}>First Name:</label>
      <input className={inputClass} name="fname"  type='text'   onChange={handleChange} required/>
      <label className={labelClass} >Last Name:</label>
      <input className={inputClass} name="lname"  type='text'  onChange={handleChange} required />
          <label className={labelClass}>I am a:</label>
          <select name="userType"  className={inputClass} onChange={handleChange} required>
            <option value="">Select User Type</option>
            <option value="customer">Customer</option>
            <option value="maker">Maker</option>
          </select>
       
      <label className={labelClass} >Email address:</label>
      <input className={inputClass} name="email"  type='email'  onChange={handleChange} required />
      <label className={labelClass} >Password:</label>
      <input className={inputClass} name="password"  type='password'  onChange={handleChange} required/>
      <label className={labelClass} htmlFor="address-dropdown">Select an address:</label>
      <select id="address-dropdown" onChange={handleSelect} name="address" className={inputClass} required>
        <option  value="">-- Select an address --</option>
        {addressOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className={labelClass} >Phone Number:</label>
      {phoneError && <span style={{ color: "red" }}>{phoneError}</span>}
      <input className={inputClass} name="phone"  type='phone' onChange={handlePhoneChange} required />
      <p className='mt-2 '>Already have an account? <Link to="/login" className='text-primary'>Login </Link></p>

      <button className='bg-primary text-white font-bold py-2 px-4 rounded mt-2'>SIGN UP</button>
     
   </form>

  </div>
  </div>
)
}

export default Signin