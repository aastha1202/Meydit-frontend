import React, { useState } from 'react'
import Nav from './Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { Card } from '@material-tailwind/react'

const MakerQuotation = () => {
    const [quotation,setQuotation]= useState([])
    const [posts, setPosts]= useState([])
    const user_id= localStorage.getItem("user_id")
    useEffect(() => {
        axios.get(`https://meyd-it.onrender.com/maker/quotations/${user_id}`)
        .then(response => {                  
          console.log(response.data);
          setQuotation(response.data)
         
          console.log(quotation)
          })
          .catch(error => {
            console.log(error);
          });
         
          
      
    }, [])
    useEffect(() => {
        const makerIds = quotation.length > 0 ? quotation.map(q => q.customer_id) : [];
        axios.get("https://meyd-it.onrender.com/maker",{
          params:{
              maker_id:makerIds.join(','),
          }
        })
        .then(response => {    
         
          setPosts(response.data)
          console.log(posts)
         // or update state with the response data
        })
        .catch(error => {
          console.log(error);
        });
      }, [quotation]);

  return (
    <div>
        <Nav/>
        <h1 className='text-center font-lato text-4xl my-4 uppercase'> Your quotation requests </h1>
        {quotation.map((quotation)=>{
          console.log("price"+ quotation.price)
    const customer = posts.find((p) => p.id === quotation.customer_id);
          return (
            <div key={quotation.id}>
            <Card className='m-2 p-10'>
              {customer && ( 
                <div className='flex flex-col'>
                  <div><span className='font-semibold'>Customer Name</span>
                  : {customer.fname} {customer.lname}</div>
                  <div><span className='font-semibold'>Customer Email</span>
                  : {customer.email} </div>
                  <div><span className='font-semibold'>Customer Phone Number</span>
                  : {customer.phone} </div>
                </div>  
              )}
              <div><span className="font-semibold">Quotation Status</span>: {quotation.status}</div>
              <div><span className="font-semibold">Message</span>: {quotation.message}</div>
              <div><span className="font-semibold">Price</span>: {quotation.price}</div>
              </Card>
            
             
            </div>
          );
  })

  }
    </div>
  )
}

export default MakerQuotation