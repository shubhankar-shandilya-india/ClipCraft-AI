'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const app = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            var tl = gsap.timeline()

            tl.from(".image,.nav1,.nav2,.nav3,.nav4,.nav5,.bt1", {
                y: -100,
                duration: 1,
                delay: 0.5,
                opacity: 0,
                stagger: 0.2,
            });
            

        }, app);

        return () => ctx.revert();

    }, [])
    return (
        <div className='flex justify-between items-center w-full font-aeonik bg-[#000000bb] p-2 h-[70px] text-white' ref={app}>
            <a href="/" className=' w-[120px] '><img className='image' src="./pp.png" alt="Logo" /></a>

            <div className='sm:hidden cursor-pointer' onClick={toggleMenu}>
                <svg className='mx-6 w-8 h-8 fill-current' viewBox='0 0 24 24'>
                    <path
                        fillRule='evenodd'
                        d='M4 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm16 5H4a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2zm0 4H4a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2z'
                    />
                </svg>
            </div>

            <div className='hidden sm:flex justify-center gap-[3vw]'>
                <a className='nav1' href='/'>Home</a >
                <a className='nav2' href='/text-to-video'>Services</a >
                <a className='nav4' href='#aboutus'>About Us</a >
            </div>
            <div className='mx-6 hidden sm:flex gap-3'>
                <button  className='bt1 px-4 flex items-center glow-on-hover text-xs sm:text-sm md:text-base '>Register</button>
            </div>
            <div className={`sm:hidden   ${isMenuOpen ? 'flex flex-col bg-black p-3 absolute w-full top-20' : 'hidden'} gap-[10px]`}>
                <a onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-center' href='/'>Home</a>
                <a onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-center' href='#services'>Services</a>
                <a onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-center' href='#aboutus'>About Us</a>
                <a onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-center' href='#contactus'>Contact Us</a>
                <button  className='h-[8vh] glow-on-hover'>Register</button>
            </div>
            
        </div>
    );
};

export default NavBar;
