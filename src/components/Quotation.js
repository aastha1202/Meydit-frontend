import React, { useState } from 'react'
import Nav from './Navbar'
import { useEffect } from 'react'
import axios from "axios"
import { Button, Card } from '@material-tailwind/react'

const Quotation = () => {
    const [posts, setPosts]= useState([]);
    const [quotation, setQuotation]= useState([]);
    const [acceptStatus, setAcceptStatus]= useState(false);
    
    
    const user_id= localStorage.getItem("user_id")
    useEffect(() => {
        axios.get("https://meyd-it.onrender.com/quotations",{
            params: {
              customer_id:user_id
              },
        })
        .then(response => {                  
          setQuotation(response.data) 
          console.log(quotation);
         
          })
          .catch(error => {
            console.log(error);
          });
         
          
      
    }, [])
    useEffect(() => {
      const makerIds= quotation.map(q=> q.maker_id);
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

  const handleStatus=(quotation_id, status)=>{
     axios.put(`https://meyd-it.onrender.com/quotations/${quotation_id}/${status}`)
      .then(response => {
        console.log(response.data);
        setQuotation(quotation.map(q => q.id === quotation_id ? { ...q, status } : q));
      })
      .catch(error => {
        console.log(error);
      });

  }
    
  return (
    <div>
    <Nav/>
  <div>
  <h1 className='text-center font-bold text-primary text-4xl mt-10 uppercase'> Your quotation requests </h1>

  {quotation.map((quotation)=>{
    const maker = posts.find((p) => p.id === quotation.maker_id);
          return (
            <div key={quotation.id}>
            <Card className='m-2 p-10 w-3/5 mx-auto'>
              {maker && ( 
                <div>
                 <span className='font-semibold'>Maker's Name</span>: {maker.fname} {maker.lname}
                </div>  
              )}
              <div><span className='font-semibold'>Quotation Status</span>: {quotation.status}</div>
              <div><span className='font-semibold'>Message</span>: {quotation.message}</div>
              <div><span className='font-semibold'>Price</span>: {quotation.price}</div>
              <div className='flex gap-6'>
              {(quotation.status === 'pending' ) && (
            <Button className='bg-primary' onClick={() => handleStatus(quotation.id, 'accepted')} disabled={acceptStatus}>
              Accept
            </Button>
          )}
          {(quotation.status === 'pending') && (
            <Button className='bg-primary' onClick={() => handleStatus(quotation.id, 'rejected')} disabled={acceptStatus}>
              Reject
            </Button>
          )}
          {quotation.status === 'accepted' && <Button className='bg-primary '>Accepted</Button>}
          {quotation.status === 'rejected' && <Button className='bg-primary'>Rejected</Button>}

              </div>
              </Card>
            
             
            </div>
          );
  })

  }
 
  </div>
    </div>
  )
}

export default Quotation