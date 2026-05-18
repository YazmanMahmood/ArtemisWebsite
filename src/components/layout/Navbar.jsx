import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
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
      ? 'rgba(15, 15, 15, 0.95)'
      : 'rgba(0, 0, 0, 0.3)'};
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${(props) =>
    props.scrolled === 'true' || props['data-ismainpage'] === 'false'
      ? 'rgba(255, 77, 77, 0.15)'
      : 'rgba(255, 255, 255, 0.15)'};
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
  font-size: 1.4rem;
  z-index: 2000;
  color: #fff;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  font-weight: 400;
  font-size: 0.85rem;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    color: #ff4d4d;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -4px;
    left: 0;
    background-color: #ff4d4d;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

// --- NEW MOBILE HUD COMPONENTS ---

const FullScreenMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 1500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 77, 77, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 77, 77, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
  }
`;

const ScanLine = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 77, 77, 0.5), transparent);
  box-shadow: 0 0 15px rgba(255, 77, 77, 0.3);
  z-index: 2;
  pointer-events: none;
`;

const MobileLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  width: 100%;
`;

const MobileNavLink = styled(motion(Link))`
  color: #fff;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.8rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before {
    content: '[';
    color: #ff4d4d;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &::after {
    content: ']';
    color: #ff4d4d;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #ff4d4d;
    &::before, &::after {
      opacity: 1;
    }
  }
`;

const HUDDecoration = styled.div`
  position: absolute;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: rgba(255, 77, 77, 0.4);
  letter-spacing: 2px;
  text-transform: uppercase;
  pointer-events: none;
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Applications', path: '/applications' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Nav scrolled={scrolled.toString()} data-ismainpage={isMainPage.toString()}>
        <StyledLogo to="/">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <LogoImage src={whiteLogoImg} alt="Logo" />
          </motion.div>
        </StyledLogo>

        <NavLinks>
          {navItems.map((item) => (
            (!isMainPage || item.path !== '/') && (
              <NavLink key={item.path} to={item.path}>
                {item.name}
              </NavLink>
            )
          ))}
        </NavLinks>

        <Hamburger onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <FullScreenMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <Hamburger 
              onClick={toggleMenu} 
              style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2001 }}
            >
              <FaTimes />
            </Hamburger>

            <ScanLine 
              animate={{ top: ['0%', '100%'] }} 
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            <HUDDecoration style={{ top: '100px', left: '40px' }}>STATUS: MENU_ACTIVE</HUDDecoration>
            <HUDDecoration style={{ top: '100px', right: '40px' }}>COORD: 33.8688° S</HUDDecoration>
            <HUDDecoration style={{ bottom: '40px', left: '40px' }}>LINK: SECURE</HUDDecoration>
            <HUDDecoration style={{ bottom: '40px', right: '40px' }}>VER: 4.2.0</HUDDecoration>

            <MobileLinkWrapper>
              {navItems.map((item, i) => (
                <MobileNavLink
                  key={item.path}
                  to={item.path}
                  onClick={toggleMenu}
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  {item.name}
                </MobileNavLink>
              ))}
            </MobileLinkWrapper>
          </FullScreenMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
