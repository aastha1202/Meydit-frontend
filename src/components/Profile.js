import { useState,useEffect } from 'react'
import React from 'react'
import Nav from './Navbar'
import Customer from "../Assets/customer.jpg"
import Maker from "../Assets/maker.jpg"
const Profile = () => {
    const [userProfile, setUserProfile] = useState({
      fname:"",
      lname:"",
      phone: "",
      email:"",
      userType:""
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType')
       const fname= localStorage.getItem('fname');
       const lname=localStorage.getItem('lname');
       const phone=localStorage.getItem("phone");
       const email=localStorage.getItem("email");
       const address=localStorage.getItem("address")
        setUserProfile({  
          fname:fname,
          lname:lname,
          phone:phone,
          email:email,
          userType:userType,
          address:address
        })

      }, []);

  return (
    
    <div>
    <Nav/>
    <div className='flex justify-center my-32'>
    <div className="flex flex-col rounded-lg bg-white shadow-md md:w-1/2 w-10/12 md:flex-row">
    <img className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
     src={ userProfile.userType === "customer" ? Customer: Maker}
    alt="" />
  
  <div className="flex flex-col justify-start p-10">
    <h5
      className="mb-2 text-4xl uppercase font-medium text-neutral-800 dark:text-neutral-50">
      {userProfile.userType}
    </h5>
    <p className=" flex flex-col mb-4 text-base text-neutral-600 ">
      <span className='font-semibold my-2'> Name : {userProfile.fname} {userProfile.lname}</span>
      <span className='font-semibold my-2'>Email: {userProfile.email}</span>
      <span className='font-semibold my-2'> Address: {userProfile.address}</span>
      <span className='font-semibold my-2'> Phone: {userProfile.phone}</span>


    </p>
  </div>
</div>
</div>
    </div>
  )
}

export default Profile


