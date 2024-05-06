'use client'

import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="bg-[#000]">
      <NavBar />
      <Hero/>
    </div>
  );
}
