import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import whiteLogoImg from '/images/whitelogo.png';
import blackLogoImg from '/images/newlogo.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 2rem;
  background: ${(props) =>
    props.$scrolled || !props.$isMainPage ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${(props) =>
    props.$scrolled || !props.$isMainPage ? 'blur(10px)' : 'none'};
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  transition: transform 0.3s ease, filter 0.3s ease;
  margin-top: 0;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${(props) =>
    props.$scrolled || !props.$isMainPage ? 'black' : '#fff'};
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
    background-color: ${(props) =>
      props.$scrolled || !props.$isMainPage ? 'black' : '#fff'};
    transition: width 0.3s ease, background-color 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMainPage = location.pathname === '/';
  const logoSrc = isMainPage && !scrolled ? whiteLogoImg : blackLogoImg;

  return (
    <Nav $scrolled={scrolled} $isMainPage={isMainPage}>
      <Logo to="/">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LogoImage src={logoSrc} alt="Artemis Logo" />
        </motion.div>
      </Logo>
      <NavLinks>
        <NavLink to="/products" $scrolled={scrolled} $isMainPage={isMainPage}>
          Products
        </NavLink>
        <NavLink to="/applications" $scrolled={scrolled} $isMainPage={isMainPage}>
          Applications
        </NavLink>
        <NavLink to="/about" $scrolled={scrolled} $isMainPage={isMainPage}>
          About
        </NavLink>
        <NavLink to="/support" $scrolled={scrolled} $isMainPage={isMainPage}>
          Support
        </NavLink>
        <NavLink to="/contact" $scrolled={scrolled} $isMainPage={isMainPage}>
          Contact
        </NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
