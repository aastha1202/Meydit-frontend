import React from 'react'
import {BsFillFileEarmarkPostFill} from "react-icons/bs"
import {MdOutlineMailOutline} from "react-icons/md"
import {FaSearch} from "react-icons/fa"
const Work = () => {
    const workInfoData = [
        {
          image:<BsFillFileEarmarkPostFill className=''/>,
          title: "Consumer Job Posting",
          text: "Consumer posts a job by providing personal information, clothing details, and budget" 
        },
        {
          image: <FaSearch/>,
          title: "Maker job listing",
          text: "Maker lists available jobs, filters by clothing types, views job details, and sends a quote.",
        },
        {
          image: <MdOutlineMailOutline/>,
          title: "Notification",
          text: "Consumer compares quotes, selects a maker, and receives a confirmation email",
        },
      ];
  return (
    <div className='bg-primary z-20 relative flex flex-col p-6'>
     <h1 className=' text-center text-white text-40 font-bold'>How it Works</h1>
    <div className='flex lg:justify-evenly py-8 flex-col items-center  lg:flex-row'>
    {workInfoData.map((data)=>{
        return(
        <div className='bg-white mx-2 max-w-1/2 mb-4 lg:w-1/4 p-2 rounded-md hover:shadow-lg'>
        <div className=''>
        <div className='text-6xl  flex justify-center lg:m-4'>{data.image}</div>
        <div className='p-2'>
        <h2 className='text-center text-4xl text-primary font-semibold '>{data.title}</h2>
        
        <p className='text-center justify-items-center font-exo text-3xl px-2 py-4  text-gray-700'>{data.text}</p>
        </div>
        </div>
        </div>
        )
    })

    }
    
    </div>
    </div>
  )
}

export default Work