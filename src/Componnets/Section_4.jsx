import React from 'react'
import myImage0 from '../assets/Project1.jpg'
import myImage1 from '../assets/Project2.jpg'
import myImage2 from '../assets/Project3.jpg'
import { FaGithub } from "react-icons/fa6";

const Section_4 = () => {
    return (
        <div>
            <section className="sec-4" id="projects">
                <div className="featured-projects">
                    <h2>Featured Projects</h2>
                    <div className="projects-container">
                        {/* <!-- Project 1 --> */}
                        <div className="project-card">
                            <img src={myImage0} alt="Project 1 screenshot" />
                            <h3>Project Title 1</h3>
                            <p>A brief description of the project goes here.</p>
                            <div className="project-links">
                                <a
                                    href="https://github.com/EKAhmad1398"
                                    className="project-btn" target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                    View Project
                                </a>
                                <a href="#" className="project-btn">
                                    Live Demo
                                </a>
                            </div>
                        </div>
                        {/* <!-- Project 2 --> */}
                        <div className="project-card">
                            <img src={myImage1} alt="Project 2 screenshot" />
                            <h3>Project Title 2</h3>
                            <p>A brief description of the project goes here.</p>
                            <div className="project-links">
                                 <a
                                    href="https://github.com/EKAhmad1398"
                                    className="project-btn" target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                    View Project
                                </a>
                                <a href="#" className="project-btn">
                                    Live Demo
                                </a>
                            </div>
                        </div>
                        {/* <!-- Project 3 --> */}
                        <div className="project-card">
                            <img src={myImage2} alt="Project 3 screenshot" />
                            <h3>Project Title 3</h3>
                            <p>A brief description of the project goes here.</p>
                            <div className="project-links">
                                 <a
                                    href="https://github.com/EKAhmad1398"
                                    className="project-btn" target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                    View Project
                                </a>
                                <a href="#" className="project-btn">
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Section_4
