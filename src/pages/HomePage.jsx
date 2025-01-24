import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import whiteLogoImg from '/images/whitelogo.png';
import blackLogoImg from '/images/newlogo.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 2rem;
  background: ${(props) =>
    props.$scrolled || !props.$isMainPage 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'transparent'};
  backdrop-filter: ${(props) =>
    props.$scrolled || !props.$isMainPage ? 'blur(10px)' : 'none'};
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  transition: all 0.3s ease;
`;

const StyledLogo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 1001;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1001;
  color: ${(props) => {
    if (props.$isMainPage) {
      return props.$scrolled ? '#000' : '#fff';
    }
    return '#000';
  }};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: ${props => props.$isOpen ? '0' : '1'};
  visibility: ${props => props.$isOpen ? 'hidden' : 'visible'};

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease;
    z-index: 1000;
    box-shadow: ${props => props.$isOpen ? '-5px 0 15px rgba(0,0,0,0.1)' : 'none'};
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => {
    if (props.$isMainPage) {
      return props.$scrolled ? '#000' : '#fff';
    }
    return '#000';
  }};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${(props) => {
      if (props.$isMainPage) {
        return props.$scrolled ? '#000' : '#fff';
      }
      return '#000';
    }};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    color: #000;
    font-size: 1.2rem;
    padding: 1rem 0;

    &::after {
      background-color: #000;
    }
  }
`;

const CloseIcon = styled(FaTimes)`
  display: none;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: #000;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoSrc = isMainPage && !scrolled ? whiteLogoImg : blackLogoImg;

  return (
    <>
      <Nav $scrolled={scrolled} $isMainPage={isMainPage}>
        <StyledLogo to="/">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LogoImage src={logoSrc} alt="Logo" />
          </motion.div>
        </StyledLogo>
        
        <Hamburger 
          onClick={toggleMenu} 
          $scrolled={scrolled} 
          $isMainPage={isMainPage}
          $isOpen={isOpen}
        >
          <FaBars />
        </Hamburger>

        <NavLinks $isOpen={isOpen}>
          <CloseIcon onClick={toggleMenu} />
          <NavLink 
            to="/products" 
            $scrolled={scrolled} 
            $isMainPage={isMainPage} 
            onClick={toggleMenu}
          >
            Products
          </NavLink>
          <NavLink 
            to="/applications" 
            $scrolled={scrolled} 
            $isMainPage={isMainPage} 
            onClick={toggleMenu}
          >
            Applications
          </NavLink>
          <NavLink 
            to="/about" 
            $scrolled={scrolled} 
            $isMainPage={isMainPage} 
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/support" 
            $scrolled={scrolled} 
            $isMainPage={isMainPage} 
            onClick={toggleMenu}
          >
            Support
          </NavLink>
          <NavLink 
            to="/contact" 
            $scrolled={scrolled} 
            $isMainPage={isMainPage} 
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </NavLinks>
      </Nav>
      <Overlay $isOpen={isOpen} onClick={toggleMenu} />
    </>
  );
}

export default Navbar;
