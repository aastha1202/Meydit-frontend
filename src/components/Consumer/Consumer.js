import React, { useEffect } from 'react'
import axios from "axios"; 
import { useState } from 'react';
import Nav from '../Navbar';
import { useNavigate } from "react-router-dom";
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



const Consumer = () => {
    const userType= localStorage.getItem("userType")
    const labelClass= "block text-gray-700 text-sm font-bold mb-2";
    const inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const fname= localStorage.getItem('fname');
    const lname=localStorage.getItem('lname');
    const phone=localStorage.getItem("phone");
    const email=localStorage.getItem("email");
    const address=localStorage.getItem("address");
    const user_id=localStorage.getItem("user_id");
    

    let navigate = useNavigate();

    
    const [data, setData]= useState({});
    const [previewSource, setPreviewSource] = useState("");
    const [fileInputState, setFileInputState] = useState([]);
    const[clothImage, setImage]=useState("");

    function handleChange(e){
        const newdata= {...data}
        newdata[e.target.name]= e.target.value
        setData(newdata)
        console.log(newdata)
    }

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

    useEffect(() => {
      userType==="maker"?  navigate('/maker'):<></>
      
    }, [])
    

    const handleFileInputChange = (files) => {
        setFileInputState(files[0]);
        previewFile(files[0]);
      };

      const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
        };
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", fileInputState);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name",process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)

        // axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'http://localhost:3000/consumer';
        
        console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
      const response=  await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        console.log('Cloudinary Response:', response.data);

        const imageUrl = response.data.secure_url;
        setImage(imageUrl);
        console.log(clothImage)
              axios.post("https://meyd-it.onrender.com/jobs",{
                fname: fname,
                lname:lname,
                phone:phone,
                email:email,
                clothing_type:data.clothing_type,
                description:data.description,
                budget:data.budget,
                image:clothImage,
                address:address,
                user_id:user_id
              })
              .then(res=>{
                  console.log(res.data);
                  alert("You have posted your job");
              })
              .catch(err => {
                console.log(err);
              });
          
        // const file = fileInputState;
        // const storagePath = ref(storage,`images/${file.name}`);
        // const uploadTask = uploadBytesResumable(storagePath,file);
        // uploadTask.on(
        //   "state_changed",
        //   (snapshot) => {
        //     // progress function
        //     const progress = Math.round(
        //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     );
        //     console.log("Upload is " + progress + "% done");
        //   },
        //   (error) => {
        //     // error function
        //     console.log(error);
        //   },
        //   ()=>{
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //       const imageUrl = downloadURL;
        //       setImage(imageUrl);
        //       axios.post("https://meyd-it.onrender.com/jobs",{
        //         fname: fname,
        //         lname:lname,
        //         phone:phone,
        //         email:email,
        //         clothing_type:data.clothing_type,
        //         description:data.description,
        //         budget:data.budget,
        //         image:imageUrl,
        //         address:address,
        //         user_id:user_id
        //       })
        //       .then(res=>{
        //           console.log(res.data);
        //           alert("You have posted your job");
        //       })
        //       .catch(err => {
        //         console.log(err);
        //       });
        //     });
        //   });
      };
        // .then(res => {
        //   const imageUrl = res.data.url;
        //   setImage(imageUrl);
        //   axios.post("https://meyd-it.onrender.com/jobs",{
        //     fname: fname,
        //     lname:lname,
        //     phone:phone,
        //     email:email,
        //     clothing_type:data.clothing_type,
        //     description:data.description,
        //     budget:data.budget,
        //     image:imageUrl,
        //     address:address,
        //     user_id:user_id
        //   })
        //   .then(res=>{
        //       console.log(res.data);
        //       alert("You have posted your job");
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      

      

  return (
    <>
     
    <div>
   <Nav/>
    <h1 className='text-center font-bold uppercase text-primary text-4xl mt-10'>Post Your Job</h1>
   <div className='flex  justify-center mt-10'>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e)=> handleSubmit(e)}>
       <label className={labelClass}>Types of clothing:
       <select name="clothing_type" onChange={handleChange} className={inputClass} required>
            <option value="">Select a clothing type</option>
            {clothTypes.map(types => (
              <option key={types} value={types}>{types}</option>
            ))}
          </select></label>

       <label for="description" className={labelClass}>Description:</label>
       <textarea className={`resize-none ${inputClass}`} name='description' rows='5' col="20" onChange={handleChange} required></textarea>
       {previewSource && (
        <div className='flex justify-center my-2'><img src={previewSource}  alt="Uploaded Image Preview" width="300" /></div>
        
      )}
       <label className={labelClass}>Upload your cloth image: 
       <input type="file" name="myImage" className={inputClass} accept="image/png, image/gif, image/jpeg" onChange={(e)=>handleFileInputChange(e.target.files)} required/>
       </label>
       <label className={labelClass}>Budget:
       <input type='number' name='budget' className={inputClass}  onChange={handleChange} required/>
       </label>
       <button className='bg-primary text-white font-bold py-2 px-4 rounded'>Post a job </button>
    </form>
   </div>
   </div> 
    
    </>
 )}
      


export default Consumer