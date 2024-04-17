'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
const Hero = () => {
    const texts = ['Government AI', 'Generative AI', 'Automotive AI'];
    const [textIndex, setTextIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((textIndex + 1) % texts.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [textIndex, texts.length]);
    const app = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            var tl = gsap.timeline()
            tl.from(".h1", {
                delay: 3,
                y: 100,
                opacity: 0,
                stagger: 0.3,
            })


        }, app);

        return () => ctx.revert();

    }, [])
    return (
        <div className='flex flex-col items-center mb-9 pb-9' ref={app}>
            <h1 className="flex mt-8 pt-9 text-white text-4xl font-light sm:leading-none leading-[1.1] sm:text-6xl xl:text-[89px] tracking-[-0.89px] text-center ">
                <br />
                <span className="flex flex-col items-center">
                    <div className="flex flex-col gap-[2vw]">
                        <div className='h1'>Revolutionize Your World</div>
                        <div className='h1 flex gap-[2vw] justify-center'>
                            <span>with</span>
                            <span className='entrance'>ClipCraft AI</span>

                        </div>
                    </div>
                </span>
            </h1>
            <div className="h1 pt-6 font-sans text-base text-[#F5F5F5] px-4 font-medium leading-normal lg:text-lg md:w-11/12 lg:w-full text-center lg:max-w-[800px] ">Unleashing the Power of AI to Transform Your Business</div>
            <div className="h1 pt-6 font-sans text-base text-[#F5F5F5] px-4  font-medium leading-normal lg:text-lg md:w-11/12 lg:w-full text-center lg:max-w-[800px] mx-auto">At ClipCraft AI, we merge cutting-edge AI techniques with sophisticated audiovisual processing to transform your text into captivating videos. Enter a realm of creativity and efficiency, tailored for content creators and businesses seeking dynamic storytelling solutions.</div>
            <div className='pt-6 flex gap-[2vw] sm:gap-[1vw]'>
                <button className='h1 px-4 flex items-center glow-on-hover text-xs sm:text-sm md:text-base '><a href="#services">Explore AI Solutions →</a></button>
                <button className='h1 px-4 flex items-center glow-on-hover text-xs sm:text-sm md:text-base '> <a href="#contactus">Get Started Today →</a></button>
            </div>
        </div>
    );
};

export default Hero;
