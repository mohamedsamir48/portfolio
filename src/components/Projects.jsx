import React, { useState, forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { projects } from '../projects';
import { FaTimes } from 'react-icons/fa';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
const Container = styled.div`
  padding: 10px 20px;

  height: auto;
  min-height: 60vh;
  position: relative;
  overflow-x: hidden;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: 50px;
  font-weight: bold;
  font-size: 30px;
  font-family: 'Ubuntu', sans-serif;
`;

const ProjectsWrapper = styled.div`
  width: 100%;
  /* background: black; */
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
`;
const ProjectCover = styled.img`
  width: 200px;
  height: 150px;
  /* margin-right: 50px; */
  margin-top: 50px;
  cursor: pointer;
`;
const ProjectShow = styled.div`
  display: ${(props) => (props.index !== -1 ? 'flex' : 'none')};
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(16, 16, 16);
  overflow: hidden;
`;
const fadeRight = keyframes`
0%{
  top:-200px;
  opacity:0;
}
50%{
  top:-100px;
  opacity:0.5;

}
100%{
  top:50px;
  opacity:1;

}
`;
const ProjectImage = styled.img`
  width: 90vw;
  min-width: 90vw;
  animation: 1s ${fadeRight} ease-out;
  display: ${(props) => (props.index == props.imageIndex ? 'flex' : 'none')};
  margin-top: 60px;
  /* margin-left: 50px; */
  @media screen and(max-width:600px) {
    margin-left: 0;
  }
`;
const Slider = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Projects = forwardRef((props, ref) => {
  const [projectIndex, setProjectIndex] = useState(-1);
  const [imageIndex, setImageIndex] = useState(0);

  const ShowProjectHandle = (index) => {
    setProjectIndex(index);
  };
  const handleClick = (direction) => {
    if (direction == 'left') {
      if (imageIndex !== 0) {
        setImageIndex((imageIndex) => imageIndex - 1);
        console.log(imageIndex);
      }
    } else {
      if (imageIndex !== projects[projectIndex].images.length - 1) {
        setImageIndex((imageIndex) => imageIndex + 1);
        console.log(imageIndex);
        // console.log(projects[projectIndex].images.count);
      }
    }
  };
  return (
    <Container ref={ref}>
      <Wrapper>
        <Title>See Some project</Title>
        <ProjectsWrapper>
          {projects.map((project, index) => (
            <ProjectCover
              key={index}
              src={`/img/projects/${project.folderName}/${project.images[0]}`}
              onClick={() => ShowProjectHandle(index)}
            />
          ))}
        </ProjectsWrapper>
      </Wrapper>
      <ProjectShow index={projectIndex}>
        <Slider>
          {projectIndex !== -1 ? (
            <FaTimes
              style={{
                position: 'absolute',
                top: '60px',
                right: '20px',
                color: ' #3e065f',
                fontSize: '40px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setProjectIndex(-1);
                setImageIndex(0);
              }}
            />
          ) : null}
          {projectIndex !== -1 ? (
            <AiFillCaretLeft
              style={{
                position: 'absolute',
                color: ' #3e0670',
                left: '50px',
                top: '50vh',
                fontSize: '40px',
                cursor: 'pointer',
              }}
              onClick={() => handleClick('left')}
            />
          ) : null}
          {projectIndex !== -1 ? (
            <AiFillCaretRight
              style={{
                position: 'absolute',
                color: ' #3e065f',
                right: '50px',
                top: '50vh',
                fontSize: '40px',
                cursor: 'pointer',
              }}
              onClick={() => handleClick('right')}
            />
          ) : null}
          {projectIndex !== -1
            ? projects[projectIndex].images.map((img, index) => (
                <ProjectImage
                  key={img}
                  index={index}
                  imageIndex={imageIndex}
                  src={
                    `/img/projects/` +
                    `${projects[projectIndex].folderName}` +
                    '/' +
                    `${img}`
                  }
                />
              ))
            : null}
        </Slider>
      </ProjectShow>
    </Container>
  );
});

export default Projects;
