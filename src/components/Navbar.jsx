import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 0 20px;
  height: ${(props) => (props.isOpen ? '100vh' : '50px')};
  background: ${(props) =>
    props.isOpacity
      ? 'linear-gradient(to bottom, rgba(62, 6, 95, 1), black)'
      : 'linear-gradient(to bottom, rgba(62, 6, 95, 0.5), black)'};
  transition: all 1s ease;
  box-shadow: 0 0 10px black;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  z-index: 999;
`;
const Container = styled.div`
  display: flex;
  color: white;
  align-items: center;
  padding: 0 10px;
  position: relative;

  justify-content: space-around;
`;
const LeftNav = styled.div`
  display: flex;
  flex: 2;
  justify-content: end;
  align-items: center;
`;
const Menu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Item = styled.li`
  list-style: none;
`;

const Link = styled.a`
  color: white;
  padding: 5px 15px;
  cursor: pointer;
`;
const RightNav = styled.div`
  flex: 1;
  display: flex;
  justify-content: start;
`;
const Logo = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  span {
    color: #712b75;
  }
`;
const NavButton = styled.button`
  display: none;
  border: none;
  outline: none;
  background: none;
  color: white;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    display: flex;
  }
`;
const ExtendedNav = styled.div`
  display: none;
  justify-content: center;
  height: 50vh;
  color: white;
  width: 100%;
  transition: all 1s ease;
  /* z-index: 101; */

  @media screen and (max-width: 700px) {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  }
`;
const ExtendedMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-top: 30px;
`;
const ExtendedItem = styled.li`
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ExtendedLink = styled.a`
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::after {
    content: '_';
    width: 50px;
    margin-right: 30px;
    display: flex;
    visibility: hidden;
  }
  &:hover {
    &::after {
      visibility: visible;
      justify-self: start;
      content: '_____________';
    }
  }
`;
const Navbar = ({ aboutRef, skillsRef, contactRef, projectsRef, HomeRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpacity, setIsOpacity] = useState(false);
  const [details, setDetails] = useState();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 100) {
        setIsOpacity(true);
      } else {
        setIsOpacity(false);
      }
    });
  }, []);
  return (
    <Nav isOpacity={isOpacity} isOpen={isOpen}>
      <Container>
        <RightNav>
          <Logo onClick={() => HomeRef.current.scrollIntoView()}>
            <span>Mo.</span>Samir
          </Logo>
        </RightNav>

        <LeftNav>
          <Menu>
            <Item>
              <Link
                onClick={() => {
                  skillsRef.current.scrollIntoView();
                  setIsOpen(false);
                }}
              >
                Skills
              </Link>
            </Item>
            <Item>
              <Link
                onClick={() => {
                  setIsOpen(false);

                  aboutRef.current.scrollIntoView();
                }}
              >
                About
              </Link>
            </Item>
            <Item>
              <Link
                onClick={() => {
                  setIsOpen(false);

                  contactRef.current.scrollIntoView();
                }}
              >
                Contact
              </Link>
            </Item>
            <Item>
              <Link
                onClick={() => {
                  setIsOpen(false);

                  projectsRef.current.scrollIntoView();
                }}
              >
                Project
              </Link>
            </Item>
          </Menu>
        </LeftNav>
        <NavButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </NavButton>
      </Container>
      <ExtendedNav isOpen={isOpen}>
        <ExtendedMenu>
          <ExtendedItem>
            <ExtendedLink
              onClick={() => {
                setIsOpen(false);

                skillsRef.current.scrollIntoView();
              }}
            >
              Skills
            </ExtendedLink>
          </ExtendedItem>
          <ExtendedItem>
            <ExtendedLink
              onClick={() => {
                aboutRef.current.scrollIntoView();
                setIsOpen(false);
              }}
            >
              About
            </ExtendedLink>
          </ExtendedItem>
          <ExtendedItem>
            <ExtendedLink
              onClick={() => {
                contactRef.current.scrollIntoView();
                setIsOpen(false);
              }}
            >
              Contact
            </ExtendedLink>
          </ExtendedItem>
          <ExtendedItem>
            <ExtendedLink
              onClick={() => {
                projectsRef.current.scrollIntoView();
                setIsOpen(false);
              }}
            >
              Project
            </ExtendedLink>
          </ExtendedItem>
        </ExtendedMenu>
      </ExtendedNav>
    </Nav>
  );
};

export default Navbar;
