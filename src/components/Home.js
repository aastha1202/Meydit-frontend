import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Navbar'
import homebg from "../Assets/home-bg.png"
import banner from "../Assets/home-banner.png"
import { Button } from '@material-tailwind/react'
import Work from './Work'
import Testimonial from './Testimonial'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
    <Nav/>
    <div className="home-banner-container relative flex pt-3  ">
        <div className="home-bannerImage-container hidden lg:block absolute top-0 right-0 w-5/6 z-0 ">
          <img src={homebg} alt="" className=' w-1/2 right-0 absolute ' />
        </div>
        <div className="home-text-section flex flex-col w-10/12 mx-auto my-4  md:max-w-3/4  lg:max-w-1/2 md:m-32  ">
          <h1 className="primary-heading text-6xl font-sigmar  ">
          <span className='text-primary'>Fashion</span> made especially for <span className='text-primary'>you.</span>
          </h1>
          <p className="text-4xl font-exo  font-medium pt-10">
          Authentic, sustainable and stylish outfits require awesome creatives.Meyd.it helps source and manage slow fashion,that is made to measure and on demand.
          </p>
          <p className='text-4xl font-exo font-hairline pt-6'>
          Find the best maker with the skills you need.
          </p>
          <Button className="bg-primary mt-5 lg:max-w-1/4 md:max-w-2/5">
          <Link to="/login">
            GET STARTED
          </Link>
          </Button>
        </div>
        <div className="home-image-section flex-1 z-10 hidden lg:block ">
          <img src={banner} alt=""  className=' absolute right-0 w-1/3 z-10 '/>
        </div>
      </div>
      <section id='work'>
      <Work/>
      </section>
      <section id='testimonial'>
      <Testimonial/>
      </section>
      <section id='contact'>
      <Contact/>
      </section>
      
     </div>
  )
}

export default Home