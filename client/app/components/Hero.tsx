'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
const Hero = () => {
    const router = useRouter();
    const app = useRef(null);

    const handleClick = () => {
        router.push('/text-to-video');
    };

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
            <h1 className="flex mt-8 pt-9 text-white text-4xl sm:leading-none leading-[1.1] sm:text-6xl xl:text-[89px] tracking-[-0.89px] text-center font-extralight">
                <br />
                <span className="flex flex-col items-center">
                    <div className="flex flex-col gap-[2vw]">
                        <div className="h1 ">Revolutionize Your World</div>
                        <div className="h1  flex gap-[2vw] justify-center">
                            <span className="">with</span>
                            <span className=" entrance">ClipCraft AI</span>
                        </div>
                    </div>
                </span>
            </h1>
            <div className="h1 pt-6 font-sans text-base text-[#F5F5F5] px-4 font-medium leading-normal lg:text-lg md:w-11/12 lg:w-full text-center lg:max-w-[800px] ">Transform text into captivating videos across various genres with ClipCraft AI.</div>
            <div className="h1 pt-6 font-sans text-base text-[#F5F5F5] px-4  font-medium leading-normal lg:text-lg md:w-11/12 lg:w-full text-center lg:max-w-[800px] mx-auto">At ClipCraft AI, we use advanced AI and audiovisual tools to turn your text into stunning videos. {"It's"} the perfect solution for content creators and businesses looking for easy, dynamic storytelling.</div>
            <div className='pt-6 flex gap-[2vw] sm:gap-[1vw]'>
                <button onClick={handleClick} className='h1 px-6 py-2 flex items-center glow-on-hover text-xs sm:text-sm md:text-base '> Get Started →</button>
            </div>
        </div>
    );
};

export default Hero;
