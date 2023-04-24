import { useState, useEffect,  } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import logo from "../Assets/logo.jpg"
import whiteLogo from "../Assets/white_logo.png"
import { Link, useNavigate ,} from "react-router-dom";
 
export default function Nav() {
  let navigate = useNavigate();
  let[isAuthenticated, setIsAuthenticated]= useState()
  isAuthenticated = !!localStorage.getItem('token');
  const [openNav, setOpenNav] = useState(false);
  const userType = localStorage.getItem('userType');
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate("/");
  }
  
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    
     { !isAuthenticated && <>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#work" className="flex items-center">
         How it works 
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#testimonial" className="flex items-center">
          Testimonial
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#contact" className="flex items-center">
          Contact
        </a>
      </Typography>
      </>}
      {isAuthenticated && (
        <>
        <Typography as="li"variant="small" color="white" className="p-1 font-normal">
           <Link to="/" className="flex items-center">
         Home
        </Link>
      </Typography>
          <Typography as="li"variant="small" color="white" className="p-1 font-normal">
           <Link to="/profile" className="flex items-center">
          Profile
        </Link>
      </Typography>
      
      </>
        )}
      {isAuthenticated && userType === 'maker' && (<><Typography as="li"variant="small" color="white" className="p-1 font-normal">
           <Link to="/maker" className="flex items-center">
           View jobs
        </Link>
      </Typography>
      <Typography as="li"variant="small" color="white" className="p-1 font-normal">
           <Link to="/maker/quotation" className="flex items-center" >  View request</Link>
      </Typography>
      </>
      )}
      {isAuthenticated && userType === 'customer' && (<><Typography as="li"variant="small" color="white" className="p-1 font-normal">
           <Link to="/consumer" className="flex items-center" >  Post a new job</Link>
      </Typography>
      <Typography as="li"variant="small" color="white" className="p-1 font-normal">
           <Link to="/quotation" className="flex items-center" >  View request</Link>
      </Typography></>)}

    </ul>
  );
 
  return (
    <Navbar className="rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-primary border-none">
      <div className="container mx-auto flex items-center justify-between text-blue-900">
        <Typography
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <Link to="/"> <img src={whiteLogo} className="max-w-2/5" alt="logo"></img></Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {
          isAuthenticated ? (
            <Button variant="gradient" size="sm" className="hidden lg:inline-block mr-3" color="white" onClick={handleLogout}>
          <Link >Log out</Link>
        </Button>
          ):
          (<div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block mr-3" color="white">
          <Link to="/login">Log in</Link>
        </Button>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block" color="white">
        <Link to="/signin">Sign in</Link>
        </Button>
        </div>
          )
        }
        
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          { isAuthenticated ? (
            <Button variant="gradient" size="sm" className=" mr-3 text-primary" color="white" onClick={handleLogout}>
          <Link >Log out</Link>
        </Button>
          ):
          (<div className="flex w-40 gap-4 flex-col">
        <Button variant="gradient" size="sm" className=" mr-3 text-primary" color="white">
          <Link to="/login">Log in</Link>
        </Button>
        <Button variant="gradient" size="sm" className="text-primary" color="white">
        <Link to="/signin">Sign in</Link>
        </Button>
        </div>)
          }
        </div>
      </MobileNav>
    </Navbar>
  );
}