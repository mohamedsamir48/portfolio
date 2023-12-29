import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Intro from './../components/Intro';
// import Navbar from "../components/Navbar";
import Skills from './../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import Intro2 from './../components/Intro2';
// import Draggable from 'react-draggable';
import AOS from 'aos';

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const Home = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();
  const HomeRef = useRef();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container>
      <Navbar
        aboutRef={aboutRef}
        skillsRef={skillsRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
        HomeRef={HomeRef}
      />
      <Intro data-aos='fade-right' aboutRef={aboutRef} ref={HomeRef} />
      <Skills ref={skillsRef} />
      <About ref={aboutRef} contactRef={contactRef} />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
      <div className={`w-full h-[100vh] fixed  z-[1]`}>
        <div className={`w-full h-[100vh] relative  z-[1]`}>
          <Chat className={`z-[1000]`} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
