import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Aos from 'aos';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
`;
const TopTitle = styled.h1`
  font-size: 30px;
  margin-top: 50px;
`;

const Hr = styled.hr`
  background: black;
  width: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: start;
  justify-content: center;
  /* margin-top: 20px; */
`;

const CircleWrapper = styled.div`
  width: 150px;
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 200px;
  }
`;
const Title = styled.h1`
  font-size: 20px;
  align-self: center;
  justify-self: start;
  margin-top: 10px;
`;
const Desc = styled.p``;
const Skills = forwardRef((props, ref) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Container ref={ref}>
      <TopTitle>Skills</TopTitle>
      <Hr />
      <Wrapper>
        <CircleWrapper data-aos='fade-right' data-aos-duration='2000'>
          <CircularProgressbar
            value='99'
            // text={<img src='html&css&javascript.png' />}
            text='99%'
          />
          <Title>HTML/CSS/JavaScript</Title>
          <Desc>
            everyone have this skill, however, it's necessary for build web apps
          </Desc>
        </CircleWrapper>
        <CircleWrapper data-aos='fade-right' data-aos-duration='2000'>
          <CircularProgressbar value='90' text='90%' />
          <Title>JavaScript, React.js</Title>
          <Desc>
            Using JavaScript and React library to make awesome Front-End apps
          </Desc>
        </CircleWrapper>
        <CircleWrapper data-aos-duration='2000' data-aos='fade-up'>
          <CircularProgressbar value='80' text='70%' />
          <Title>MERN Stack</Title>
          <Desc>Build full-stack web apps with JavaScript</Desc>
        </CircleWrapper>
        <CircleWrapper data-aos-duration='2000' data-aos='fade-left'>
          <CircularProgressbar value='90' text='85%' />
          <Title>React native</Title>
          <Desc>
            good framework for android apps, just I know enough to make good
            apps
          </Desc>
        </CircleWrapper>
        <CircleWrapper data-aos-duration='2000' data-aos='fade-left'>
          <CircularProgressbar value='80' text='80%' />
          <Title>Python</Title>
          <Desc>using python in frappe framework which powers erpnext</Desc>
        </CircleWrapper>
      </Wrapper>
    </Container>
  );
});

export default Skills;
