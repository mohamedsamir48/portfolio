import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import About from './About';
import bg from '../assets/4884841.jpg';
import Aos from 'aos';
const Container = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  /* margin-top: 50px; */
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: relative;
  color: black;
  /* background: radial-gradient(circle at center, #3e065f 0, black 100%); */
  /* background-image: url(${bg}); */
  background-image: url('/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* display: flex;
  justify-content: center; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* background-image: radial-gradient(circle at center, #3e065f 0, black 50%); */
  opacity: 0.7;

  width: 100%;
  margin-top: 50px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;

  /* margin-left: 40px; */
`;
const Span = styled.span`
  display: center;
  justify-content: center;
  align-items: center;
  /* color: inherit; */
  font-size: 50px;
  font-weight: 900;
`;
const Title = styled.h1`
  font-weight: 900;
  color: inherit;
`;
const Button = styled.button`
  border: none;
  outline: none;
  font-weight: 900;

  background: none;
  margin-top: 50px;
  color: inherit;
  z-index: 100;
  font-size: 24px;
  box-shadow: 0 0 10px black;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 10px white;
  }
`;

const Intro = forwardRef(({ aboutRef }, ref) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <Container ref={ref}>
        <Wrapper>
          <Content>
            <Span
              className={`text-transparent bg-clip-text bg-black`}
              data-aos='fade-right'
            >
              I am a
            </Span>
            <Span data-aos='fade-left'>Full-Stack developer</Span>
            <Title data-aos='fade-right'>Build awesome apps</Title>
            <Button
              onClick={() =>
                aboutRef.current && aboutRef.current.scrollIntoView()
              }
            >
              Discover more
            </Button>
          </Content>
        </Wrapper>
        {/* <svg
          style={{ width: "100%", position: "absolute", bottom: "-1px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg> */}
      </Container>
    </>
  );
});

export default Intro;
