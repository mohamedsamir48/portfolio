import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  background: #f7e7e6;
  font-family: 'Oleo Script Swash Caps', cursive;
  width: 100%;
  /* font-family: "Raleway", sans-serif; */
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
  margin: 0 10px;
`;
const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
`;
const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Image = styled.img`
  max-width: 300px;
  float: right;
  @media screen and (max-width: 600px) {
    height: 200px;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 70px;
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    font-size: 40px;
  }
`;
const Desc = styled.p``;
const Buttun = styled.button`
  width: 100%;
`;
const About = forwardRef((props, aboutRef) => {
  return (
    <Container ref={aboutRef}>
      <Wrapper>
        <Title>About me</Title>
        <Desc>
          <Image src={require('../assets/mohamed-nobackground.png')} />I am
          Mohamed Samir, live in Egypt, 10th of ramdan, I have some skills in
          blender I am still learning. anyway...!!, I'm glad you visited my
          website, At the beginning of the journey. I can learn anything to be
          adapted to job market, of course I am helpfull, good team player.
          &#128521; every problem must be solved, whatever...!!, you should be
          carful when chat me in this website. don't send sensitive data, I
          prefer sending email in,{' '}
          <Buttun
            onClick={() => {
              props.contactRef.current.scrollIntoView();
            }}
            className={`w-[100px] text-[#712b75] cursor-pointer h-[25px] shadow-xl shadow-white`}
          >
            Send
          </Buttun>
        </Desc>
      </Wrapper>
    </Container>
  );
});

export default About;
