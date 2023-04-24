import React from 'react'
import img1 from '../Assets/Testimonialimg1.jpg'
import img2 from '../Assets/Testimonialimg2.jpg'
import img3 from '../Assets/Testimonialimg3.jpg'

const Testimonial = () => {
    const testimonialData = [
        {
          image:img1,
          title: "Dimitra Daras",
          text: "All my customers now pretty much come via Meyd.IT. It saves so much of my time which is invaluable with the young baby." 
        },
        {
          image: img3,
          title: "Susan Hansen",
          text: "Meyd.IT helps conscious citizens who wear their values, be part of the solution, not the pollution that is fast fashion.",
        },
        {
          image: img2,
          title: "Jody Head",
          text: "Meyd.IT really helps clients find me. Lorraine was visiting Sydney on a cruise. We made couture blouse for her charity ball.",
        },
      ];
  return (
    <div className='mx-auto px-10 text-center lg:px-32 lg:py-10'>
    <h1 className='font-bold text-40  '>
    Testimonial
    </h1>
    <div className='flex flex-col lg:flex-row justify-center p-10'>
        {testimonialData.map((data)=>{
            return(
                <div className=' p-10'>
                <div className='flex justify-center'>
                <img src={data.image} className='w-32 rounded-full shadow-lg'/>
                </div>
                <h5 className='my-4 text-4xl md:tex-3xl text-primary font- font-semibold'>{data.title}</h5>
                <p class="mb-4 font-exo text-3xl" ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="inline-block h-6 w-6 pr-2"
        viewBox="0 0 24 24">
        <path
          d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
      </svg>
  {data.text}
    </p>
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default Testimonial