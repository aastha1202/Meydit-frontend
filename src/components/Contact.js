import { Button } from '@material-tailwind/react';
import React from 'react'
import {BsFillTelephoneFill} from "react-icons/bs";
import {MdOutlineMailOutline} from "react-icons/md"
import {AiFillHome,AiFillFacebook,AiFillInstagram,AiOutlineTwitter,AiFillLinkedin} from "react-icons/ai"


const Contact = () => {
  const labelClass= "block text-white text-sm font-bold mb-2";
  const inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div className='bg-primary'>
    <h3 className=' text-40 font-bold text-white text-center py-4'>Contact Us</h3>
    <div className='flex flex-col-reverse px-6 py-10 md:flex-row-reverse md:px-32 md:py-10 justify-center'>
      <form className='pl-10 '>
        <label className={labelClass}>Full Name:</label>
        <input className={inputClass} type='text'/>
        <label className={labelClass}>Email:</label>
        <input className={inputClass} type='email'/>
        <label className={labelClass}>Message:</label>
        <textarea className={`resize-none ${inputClass}` } rows='5' cols='50'  />
        <Button color='white'>Submit</Button>
      </form>
      <div className='text-white flex flex-col justify-evenly mx-10'>
      <div className='flex gap-2 '><BsFillTelephoneFill/>7899023745</div>
      <div className='flex gap-2 '><MdOutlineMailOutline/>make@meyd.it</div>
      <div className='flex gap-2 '><AiFillHome/>PO Box 3446 Tamarama NSW 2026</div>
      <div className='flex gap-4'>
        <AiFillInstagram className='text-4xl'/>
        <AiFillFacebook className='text-4xl'/>
        <AiOutlineTwitter className='text-4xl'/>
        <AiFillLinkedin className='text-4xl'/>
      </div>

      </div>
      </div>
    </div>
  )
}

export default Contact