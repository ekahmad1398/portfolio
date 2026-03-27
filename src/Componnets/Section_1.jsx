import React from 'react'
import { RiScrollToBottomFill } from "react-icons/ri";


const Section_1 = () => {
  return (
    <div>
      <section className="sec-1" id="home">
        <div className="container">
            <h1>Hi, I'm <span className="myname">Ahmad Shah</span></h1>
            <p>A Creative Web Developer</p>
            <a className="btn-1" href="#projects">View Work</a>
            <a className="btn-2" href="#contact">Contact Me</a>
        </div>

        <div className="btn">
            <a href="#about" className="scroll-down"> <RiScrollToBottomFill /></a>
        </div>
    </section>
    </div>
  )
}

export default Section_1
