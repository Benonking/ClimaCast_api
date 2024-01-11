
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';
// import { CiMenuFries } from 'react-icons/ci';
// import { TiWeatherDownpour } from 'react-icons/ti';

// const Navbar = () => {
//   const [click, setClick] = useState(false);

//   const handleClick = () => {
//     setClick(!click);
//   };

//   const content = (
//     <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition'>
//       <ul className='text-center text-x1 p-20'>
//         <Link spy={true} smooth={true} to="/Home">
//           <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Home</li>
//         </Link>
//         <a href="https://github.com/Benonking/ClimaCast" target="_blank" rel="noopener noreferrer">
//           <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>GitHub</li>
//         </a>
//         <Link spy={true} smooth={true} to='/About'>
//           <li className='hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>About</li>
//         </Link>
//       </ul>
//     </div>
//   );

//   return (
//     <nav>
//       <div className='h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1'>
//         <div className='flex items-center flex-1'>
//           <span className='text-2xl font-bold flex'><TiWeatherDownpour />ClimaCast</span>
//         </div>
//         <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
//           <div className='flex-10'>
//             <ul className='flex gap-8 mr-16 text-[18px]'>
//               <Link spy={true} smooth={true} to="/">
//                 <li className='hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>Home</li>
//               </Link>
//               <a href="https://github.com/your-username/your-repository" target="_blank" rel="noopener noreferrer">
//                 <li className='hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>GitHub</li>
//               </a>
//               <Link spy={true} smooth={true} to='/about'>
//                 <li className='hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>About</li>
//               </Link>
//             </ul>
//           </div>
//         </div>
//         <div>
//          {click && content}
//         </div>
//         <button className='block sm:hidden transition' onClick={handleClick} >
//           {click ? <FaTimes /> : <CiMenuFries />}
//         </button>
//       </div>
//     </nav>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import {FaTimes} from 'react-icons/fa';
import {CiMenuFries} from 'react-icons/ci' 
import { TiWeatherDownpour } from "react-icons/ti";
import About from './About';

const Navbar = () => {
	const [click, setClick] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleClick = () => {
    setClick(!click);
    setShowAbout(false); // Close the AboutComponent when clicking on other links
  };

  const handleAboutClick = () => {
    setClick(false); // Close the mobile menu when clicking on About
    setShowAbout(!showAbout); // Toggle the visibility of AboutComponent
  };
	const content = <>
 	<div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition'>
 		<ul className='text-center text-x1 p-20'>
 			<Link spy={true} smooth={true} to="Home">
 				<li my-4 py-4 border-b border-slate-800 hover: bg-slate-800 hover: rounded>Home</li>
 			</Link>
 			<a href="https://github.com/Benonking/ClimaCast" target="_blank" rel="noopener noreferrer">
           <li my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded>GitHub</li>
         </a>
 			<Link to='Documetation'>
 				<li my-4 py-4 border-b border-slate-800 hover: bg-slate-800 hover: rounded>GitHub</li>
 			</Link>
 			<Link spy={true} smooth={true} to='About' onClick={handleAboutClick}>
   <li className='hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>About</li> </Link>
 		</ul>
 	</div>
 	const githubLink = (
     <a href="https://github.com/your-username/your-repository" target="_blank" rel="noopener noreferrer">
       GitHub
     </a>
   );
 	</>
   return (
 	<nav>
 		<div className='h-10vh flex justify z-50 text-white lg:py-5 px-20 py-4 flex-1'>
 			<div className='flex items-center flex-1'>
 				<span className='text-2xl font-bold flex'><TiWeatherDownpour/>ClimaCast</span>
 			</div>
 			<div className='lg:flex md:flex lg: flex-1 items cemter justify-end font-normal hidden'>
 				<div className='flex-10'>
 					<ul className='flex gap-8 mr-16 text-[18px]'>
 						<Link spy={true} smooth={true} to="Home">
 							<li className='hover:text-fuchsia-600  transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>Home</li>
 						</Link>
              <a href="https://github.com/your-username/your-repository" target="_blank" rel="noopener noreferrer">
                <li className='hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>GitHub</li>
              </a>
 						<Link spy={true} smooth={true} to='About' onClick={handleAboutClick}>
 							<li className='hover:text-fuchsia-600  transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer'>About</li>
						</Link>
					</ul>
				</div>
			</div>
			<div>
				{click && content}
			</div>
			<button className='block sm:hidden transition' onClick={handleClick}>
				{click ? <FaTimes/> : <CiMenuFries/>}
			</button>
		</div>
	</nav>
  );
}

export default Navbar;