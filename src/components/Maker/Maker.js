import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Nav from '../Navbar';
import ReactModal from 'react-modal';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button 
} from "@material-tailwind/react";
import {RiArrowDropDownLine} from "react-icons/ri"
import { useNavigate } from 'react-router-dom';

export const Maker = () => {
   const [posts, setPosts]= useState([]);
   const [sendEmailForm, setEmailForm]= useState(false);
   const [modalIsOpen, setIsOpen] = useState(false);
   const [jobId, setJobId]= useState("");
   const [user_id, setUserId]=useState("");
   const [recipientName, setRecipientName]= useState("");
   const[recipientEmail,setRecipientEmail]=useState("");
   const [selectedLocation, setSelectedLocation] = useState('');
   const [clothingType,setClothingType]= useState("");
   const [price, SetPrice]= useState("");

   const [message, setMessage]=useState("");
   const[toggle,setToggle]= useState(false);
   const initialCardStates = posts.map(() => false); 
   const [jobStates,setjobStates]=useState(initialCardStates)
   const labelClass= "block text-gray-700 text-sm font-bold mb-2";
   const inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
   const userType= localStorage.getItem("userType")
  const makerId= localStorage.getItem("user_id");
   useEffect(() => {
    axios.get("https://meyd-it.onrender.com/jobs")
   .then(res=>{
      console.log(res.data);
      setPosts(res.data)
  })
 }, []);

 const handleQuotation=(email,name,id,user_id)=>{
  setEmailForm(true);
  setIsOpen(true);
  setJobId(id);
  setUserId(user_id)
  setRecipientEmail(email);
  console.log(name)
  setRecipientName(name)
  
 }

 let navigate= useNavigate();

 useEffect(() => {
  userType==="customer"?  navigate('/consumer'):<></>
  
}, [])

 const addressOptions = [
  { label: "New South Wales", value: "New South Wales" },
  { label: "Victoria", value: "Victoria" },
  { label: "Queensland", value: "Queensland" },
  { label: "Western Australia", value: "Western Australia" },
  { label: "South Australia", value: "South Australia" },
  { label: "Northern Territory", value: "Northern Territory" },
  { label: "Tasmania", value: "Tasmania" },
  { label: "Australian Capital Territory", value: "Australian Capital Territory" },
  { label: "Other", value: "Other" }
];

const clothTypes = [
  "western",
  "ethnic",
  "blouse",
  "saree",
  "kurta",
  "sherwani",
  "lehenga",
  "jeans",
  "t-shirt",
  "jacket",
  "dress",
  "skirt",
  "trousers",
  "shirt",
  "coat",
  "salwar kameez",
  "anarkali",
];


 const handleMessage=(e)=>{
   setMessage(e.target.value)
 }
 const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height:"50%",
    width:"30%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
};

const handleFilter=(e)=>{
  e.preventDefault();
 axios.get("https://meyd-it.onrender.com/jobs/filter", {
    params: {
      address: selectedLocation,
      clothType: clothingType
    },
  })
  .then(response => {
    console.log(response.data)
    setPosts(response.data);                    
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

const handleLocationChange=(event)=>{
  setSelectedLocation(event.target.value);
  
}

const handleClothingTypeChange=(e)=>{
  setClothingType(e.target.value)
  console.log(clothingType)
}

const handleSendMessage=(e)=>{
  e.preventDefault(); 
  axios.post('https://meyd-it.onrender.com/quotations', {
    jobId: jobId,
    customerId: user_id,
    makerId:makerId,
    price,
    message,
  })
  .then(response => {
                      
    console.log(response.data);
    axios.put(`https://meyd-it.onrender.com/jobs/${jobId}`, {
      quotation_count: 1,
    })
      .then(response => {
        console.log(response.data);
        alert("Quotation sent succesfully");
      })
      .catch(error => {
        console.log(error);
      }); // or update state with the response data
  })
  .catch(error => {
    console.log(error);
  });

}

const handleToggle=(index)=>{
  // setToggle(!toggle)
  const newCardStates = [...jobStates];
  newCardStates[index] = !newCardStates[index];
  setjobStates(newCardStates);
}


  return (
    <>
    <div>
   <Nav/>
   <div>
    <form onSubmit={handleFilter} className=' flex flex-row justify-center gap-3 items-center p-12'>
      <label className={labelClass} >
        Location:
        <select value={selectedLocation} onChange={handleLocationChange} className={inputClass}>
            <option value="">Select a location</option>
            {addressOptions.map(location => (
              <option key={location.value} value={location.value}>{location.label}</option>
            ))}
          </select>
      </label>
      <label className={labelClass}>Types of clothing:
       <select name="clothing_type" value={clothingType} onChange={handleClothingTypeChange} className={inputClass}>
            <option value="">Select a clothing type</option>
            {clothTypes.map(types => (
              <option key={types} value={types}>{types}</option>
            ))}
          </select></label>
      <Button className='bg-primary' onClick={handleFilter}>Filter</Button>
    </form>
   </div>
    <div className="flex flex-row flex-wrap items-center justify-center" >
    {
      posts.map((post,index)=>{
        return(
          <Card className=" lg:w-1/3 m-10  ">
      <CardHeader color="white" className="relative h-56">
        <img
          src={post.image}
          alt="img-blur-shadow"
          className="h-full m-auto  "
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2 uppercase">
          {post.clothing_type}
        </Typography>
        <Typography >
        <span className='font-semibold'>Description</span> 
         : {post.description}
        </Typography>
      </CardBody>
      <div className='flex flex-row-reverse mx-4 cursor-pointer '><RiArrowDropDownLine className='text-40' onClick={()=>handleToggle(index)}/></div>
    { jobStates[index] &&  <CardFooter divider className="flex items-center justify-between py-3">
        <Typography  className="flex flex-col ">
        <span> <span className='font-semibold'> Name </span>: {post.fname} {post.lname}</span>
        <span> <span className='font-semibold'> Phone Number</span>: {post.phone}</span>
       <span>  <span className='font-semibold'>Email </span> :{post.email}</span>
       <span> <span className='font-semibold'>Budget</span> :{post.budget}</span>
       {/* <span> <span className='font-semibold'>Quotation Count</span> :{post.quotation_count}</span> */}
       </Typography>
        <Button className='bg-primary  text-white  w-32 py-2 px-1 rounded-lg ' onClick={()=>handleQuotation(post.email,post.fname,post.id,post.user_id)}>Send Quotation</Button>

      </CardFooter>}
    </Card>
    );
      })}

      
    
    </div>

   {sendEmailForm && (
    <ReactModal
     isOpen={modalIsOpen}
    onRequestClose={() => setIsOpen(false)}
    style={customStyles}>
  <div className='flex justify-center '>
  <form className='absolute  ' onSubmit={handleSendMessage}>
    <label for="message" className={labelClass}>Message:</label>
    <textarea  id="message" name="message" className={`resize-none ${inputClass}`} defaultValue="Budget is" required onChange={(e)=>handleMessage(e)} />
    <label for="price" className={labelClass}>Price:</label>
    <input id="price" name="price" className={inputClass} type='number' required onChange={(e)=>SetPrice(e.target.value)} />

  <button type="submit" className='bg-primary text-white font-bold py-2 px-4 rounded my-4' >Send Message</button>
</form>
</div>
</ReactModal>
   )
    }
    </div>
    </>
  )
}

// template id: template_im4noik
// service_id:service_5zmswh9
