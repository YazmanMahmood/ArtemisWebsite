import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const whiteLogoImg = '/images/whitelogo.png';

const Nav = styled.nav`
  position: fixed;
  top: 10px;
  left: 10px;
  right: 10px;
  padding: 0.75rem 1.5rem;
  background: ${(props) =>
    props.scrolled === 'true' || props['data-ismainpage'] === 'false'
      ? 'rgba(32, 32, 32, 0.95)'
      : 'rgba(0, 0, 0, 0.3)'};
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid ${(props) =>
    props.scrolled === 'true' || props['data-ismainpage'] === 'false'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.2)'};
`;

const StyledLogo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 1001;
`;

const LogoImage = styled.img`
  height: 35px;
  width: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.3rem;
  z-index: 1001;
  color: #fff;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: ${(props) => (props.isOpen === 'true' ? '0' : '1')};
  visibility: ${(props) => (props.isOpen === 'true' ? 'hidden' : 'visible')};

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    padding: 5rem 1.5rem 2rem;
    background: rgba(20, 20, 20, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 1.75rem;
    overflow-y: auto;
    transform: translateX(${(props) => (props.isOpen === 'true' ? '0' : '100%')});
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: ${(props) =>
    props.isOpen === 'true' ? '-10px 0 40px rgba(0,0,0,0.5)' : 'none'};
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => {
    if (props['data-ismainpage'] === 'true') {
      return props.scrolled === 'true' ? 'var(--text-light)' : '#fff';
    }
    return 'var(--text-light)';
  }};
  text-decoration: none;
  font-weight: 400;
  font-size: 0.95rem;
  position: relative;
  transition: color 0.3s ease;
  letter-spacing: 0.3px;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) => {
    if (props['data-ismainpage'] === 'true') {
      return props.scrolled === 'true' ? 'var(--primary)' : '#fff';
    }
    return 'var(--primary)';
  }};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 0;
    width: 100%;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
      transform: scale(1.05);
    }

    &::after {
      display: none;
    }
  }
`;

const CloseIcon = styled(FaTimes)`
  display: none;
  position: absolute;
  top: 1.75rem;
  right: 1.5rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.6);
  z-index: 1001;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: rotate(90deg);
    color: #fff;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen === 'true' ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    z-index: 999;
  }
`;

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Nav scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()}>
        <StyledLogo to="/">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <LogoImage src={whiteLogoImg} alt="Logo" />
          </motion.div>
        </StyledLogo>

        <Hamburger
          onClick={toggleMenu}
          scrolled={scrolled.toString()}
          data-ismainpage={isMainPage.toString()}
          isOpen={isOpen.toString()}
        >
          <FaBars />
        </Hamburger>

        <NavLinks isOpen={isOpen.toString()}>
          <CloseIcon onClick={toggleMenu} />

          {!isMainPage && (
            <NavLink
              to="/"
              scrolled={scrolled.toString()}
              data-ismainpage={isMainPage.toString()}
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          )}

          <NavLink to="/products" scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()} onClick={toggleMenu}>
            Products
          </NavLink>

          <NavLink to="/applications" scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()} onClick={toggleMenu}>
            Applications
          </NavLink>

          <NavLink to="/about" scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()} onClick={toggleMenu}>
            About
          </NavLink>

          <NavLink to="/support" scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()} onClick={toggleMenu}>
            Support
          </NavLink>

          <NavLink to="/contact" scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()} onClick={toggleMenu}>
            Contact
          </NavLink>
        </NavLinks>
      </Nav>

      <Overlay isOpen={isOpen.toString()} onClick={toggleMenu} />
    </>
  );
}

export default Navbar;
