import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaRocket, FaShieldAlt, FaClock, FaTools, FaCog, FaArrowUp, FaLeaf, FaEye, FaIndustry, FaMapMarkedAlt, FaBars, FaTimes } from 'react-icons/fa';
import { GiArtificialIntelligence, GiRadarSweep, GiSatelliteCommunication } from 'react-icons/gi';
import { IoMdSpeedometer } from 'react-icons/io';
import { Helmet } from 'react-helmet';

// --- Styled Components ---
// --- Sidebar Components ---
const SidebarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  backdrop-filter: blur(5px); /* Apply blur */
  z-index: 1000; /* High z-index to overlay content */
  display: flex;
  justify-content: flex-start; /* Align content to the left */
  align-items: center;
`;
const SidebarContent = styled(motion.div)`
  width: 50%; /* Take half the screen width */
  height: 100%;
  background-color: rgba(12, 12, 12, 0.9); /* Dark background with opacity */
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  overflow-y: auto; /* Allow scrolling if content is tall */
  @media (max-width: 480px) {
    width: 75%; /* Take 75% on very small screens if needed */
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001; /* Above overlay */
`;
const MenuToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  color: white;
  cursor: pointer;
  z-index: 999; /* High z-index, but below sidebar */
  display: none; /* Hidden by default */
  @media (max-width: 768px) {
    display: block; /* Show on mobile/tablet */
  }
`;
// Hero Section
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: #0c0c0c; /* Ensure black background */
  @media (max-width: 768px) {
    height: 90vh;
    align-items: center;
  }
  @media (max-width: 480px) {
    height: 85vh;
    padding-top: 0px; /* Adjusted padding */
    align-items: flex-start; /* Align content to top on small screens */
  }
`;
// Enhanced Floating Particles Container
const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Behind content but above background */
  pointer-events: none; /* Don't interfere with clicks */
`;
// Enhanced Particle Style
const Particle = styled(motion.div)`
  position: absolute;
  width: 8px; /* Slightly larger */
  height: 8px;
  border-radius: 50%;
  /* More prominent glow using boxShadow */
  box-shadow: 0 0 0 0px rgba(255, 59, 48, 0.5), 0 0 10px rgba(10, 132, 255, 0.7);
  background: radial-gradient(circle, #ff3b30, #0a84ff); /* Radial for depth */
  opacity: 0.7;
`;
const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10; /* Above particles */
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  @media (max-width: 480px) {
    padding: 0 0.75rem;
    justify-content: center; /* Center vertically within the adjusted height */
    padding-top: 0; /* Remove top padding as alignment is handled by HeroSection */
    /* --- Key Adjustment for Mobile Hero Text Positioning --- */
    margin-top: -20px; /* Move the content block up slightly on phones */
    /* -------------------------------------------------------- */
  }
`;
const WelcomeText = styled.h2`
  font-size: 2rem; /* Slightly smaller base size */
  text-align: center;
  margin-bottom: 0.5rem;
  color: white;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #ff3b30, #0a84ff);
    border-radius: 1.5px;
  }
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem; /* Smaller on tiny screens */
    margin-bottom: 0.3rem;
    /* --- Key Adjustment for Mobile Spacing --- */
    margin-top: 0; /* Ensure no extra top margin */
    /* ----------------------------------------- */
  }
`;
const FlippingTextContainer = styled.div`
  position: relative;
  z-index: 2;
  /* Adjusted height for better fit on small screens */
  height: 3rem; /* Fits 1.5rem text well */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem; /* Reduced margin */
  @media (max-width: 768px) {
    height: 3rem;
  }
  @media (max-width: 480px) {
    height: 2.5rem; /* Fits 1.25rem text */
    margin-bottom: 0.5rem;
    padding: 0 5px;
    /* --- Key Adjustment for Mobile Spacing --- */
    margin-top: 0.2rem; /* Add a bit of space above the flipping text */
    /* ----------------------------------------- */
  }
`;
const HeroTitle = styled.h1`
  font-size: 2.8rem; /* Reduced base size */
  margin-bottom: 1.2rem; /* Reduced margin */
  color: white;
  z-index: 2;
  font-weight: 700;
  line-height: 1.4; /* Slightly tighter line height */
  padding: 0 5px; /* Small padding for text edge */
  span.title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Allow wrapping on very small screens */
    gap: 8px; /* Consistent gap */
  }
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem; /* Significantly smaller */
    margin-bottom: 0.8rem;
    line-height: 1.3;
    padding: 0;
    span.title-container {
      /* On small screens, stack words vertically */
      flex-direction: column;
      gap: 14px; /* Smaller gap between lines */
      /* Remove fixed min-height that was causing issues */
    }
    /* --- Key Adjustment for Mobile Spacing --- */
    margin-top: 0.2rem; /* Add a bit of space above the main title */
    /* ----------------------------------------- */
  }
`;
const TitleWord = styled.span`
  display: inline-block;
  vertical-align: middle;
  @media (max-width: 480px) {
    line-height: 1.2;
  }
`;
// --- Key Fix: DroneTypeContainer for Mobile ---
const DroneTypeContainer = styled.div`
  display: inline-block;
  /* Use max-width instead of min-width for better responsiveness */
  min-width: 283px; /* Adjust base min-width */
  position: relative; /* Changed from absolute for better flow */
  height: 2rem; /* Fixed height */
  margin: 0 10px; /* Adjusted margins */
  vertical-align: middle; /* Align with text */
  @media (max-width: 768px) {
    min-width: 180px; /* Reduce on tablets */
    height: 2.2rem;
    margin: 0 8px;
  }
  @media (max-width: 480px) {
    /* Key changes for small phones */
    min-width: 160px; /* Further reduce min-width */
    width: 90%; /* Allow it to shrink if needed */
    max-width: 200px; /* But not too much */
    height: auto; /* Allow height to adjust */
    margin: 4px auto; /* Center it and add vertical space */
    /* Make it a block element on small screens for centering */
    display: block;
    /* Reset any absolute positioning styles if inherited */
    position: relative;
    transform: none; /* Remove transform */
    /* --- Key Adjustment for Mobile Spacing --- */
    margin-top: 2px; /* Add a tiny bit of space above the drone type */
    margin-bottom: 2px; /* Add a tiny bit of space below the drone type */
    /* ----------------------------------------- */
  }
  @media (max-width: 360px) {
    min-width: 140px; /* Even smaller for tiny screens */
    max-width: 180px;
  }
`;
const HeroDescription = styled.p`
  font-size: 1.1rem; /* Slightly smaller base */
  line-height: 1.6;
  margin: 0 auto 2rem; /* Center with auto margins, reduce bottom margin */
  color: #d3d3d3;
  font-weight: 400;
  max-width: 90%; /* Use percentage for better responsiveness */
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.8rem;
    max-width: 95%;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem; /* Smaller font */
    margin-bottom: 1.5rem; /* Reduce margin */
    padding: 0 0.5rem;
    max-width: 100%; /* Full width on tiny screens */
    line-height: 1.5;
    /* --- Key Adjustment for Mobile Spacing --- */
    margin-top: 0.4rem; /* Add a bit of space above the description */
    /* ----------------------------------------- */
  }
`;
const CTAButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(
    135deg,
    rgba(255, 59, 48, 0.3),
    rgba(10, 132, 255, 0.3)
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 59, 48, 0.4),
      rgba(10, 132, 255, 0.4)
    );
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 768px) {
    padding: 0.75rem 2rem;
    font-size: 0.875rem;
  }
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    width: 80%;
    margin: 0 auto;
  }
`;
const TagLine = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  margin: 2rem 0;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg,
    rgba(255, 59, 48, 0.9),
    rgba(10, 132, 255, 0.9)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.95;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
`;
const Footer = styled.footer`
  background: #121212;
  color: white;
  padding: 3rem 2rem;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;
const ContactInfo = styled.div`
  h4 {
    color: rgba(255,255,255,0.9);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  p {
    color: rgba(255,255,255,0.7);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #0a84ff;
      }
    }
  }
`;
const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
`;
const ScoutImage = styled(motion.img)`
  position: absolute;
  right: -15px; /* Slightly adjust position */
  top: 50%;
  transform: translateY(-50%);
  width: 350px; /* Slightly smaller base */
  height: auto;
  z-index: 2;
  opacity: 0;
  @media (max-width: 1100px) {
    width: 300px;
  }
  @media (max-width: 900px) {
    width: 250px;
  }
  @media (max-width: 768px) {
    width: 220px;
    right: -20px; /* Adjust for tablet */
  }
  @media (max-width: 480px) {
    /* Key changes for mobile */
    width: 160px; /* Much smaller */
    right: -15px; /* Adjust position */
    top: auto;
    bottom: 10%; /* Position from bottom */
    transform: translateY(0); /* Reset transform */
  }
  @media (max-width: 360px) {
    width: 140px; /* Even smaller for tiny screens */
    right: -10px;
  }
`;
const droneCaptions = [
  'Advanced  drone in action',
  'Night vision security patrol',
  'Multi-purpose rescue operations'
];
const Section = styled(motion.section)`
  opacity: 0;
`;
// --- Reusable Components for Other Sections ---
// Why Choose section components
const WhyChooseSection = styled.section`
  padding: 6rem 2rem;
  background: #0c0c0c;
  color: white;
  position: relative;
  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: white;
  }
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
  @media (max-width: 480px) {
    padding: 3rem 1rem 4rem;
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
  }
`;
const WhyChooseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const WhyChooseGridSecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ChooseCard = styled(motion.div)`
  background: rgba(25, 25, 25, 0.5);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent,
      rgba(168, 85, 247, 0.4),
      transparent 30%
    );
    animation: rotate 4s linear infinite;
    z-index: -1;
  }
  &:after {
    content: '';
    position: absolute;
    inset: 3px;
    background: rgba(25, 25, 25, 0.8);
    border-radius: 10px;
    z-index: -1;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    &:before {
      animation-duration: 1s;
    }
  }
  h3 {
    font-size: 1.3rem;
    margin: 1rem 0;
    color: white;
  }
  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    h3 {
      font-size: 1.2rem;
      margin: 0.8rem 0;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;
// Changed from 'p' to 'div' to fix nesting warning
const IntroText = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
    padding: 0 0.5rem;
    line-height: 1.5;
  }
`;
const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  transform: rotate(-5deg);
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: 0.5s;
  }
  &:hover:before {
    transform: translateX(100%);
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    font-size: 1.7rem;
    margin: 0 auto 1rem;
  }
`;
// Industry transformation section components
const TransformSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0c0c0c 0%, #151515 100%);
  color: white;
  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: white;
  }
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
  @media (max-width: 480px) {
    padding: 3rem 1rem;
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
  }
`;
// Enhanced IndustryCard for background animation
const IndustryCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 4rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  position: relative;
  /* Initial small background circle */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.gradientStart || '#ff3b30'}, ${props => props.gradientEnd || '#0a84ff'});
    /* Start with a small circle */
    clip-path: circle(5% at ${props => props.reverse ? '90% 10%' : '10% 10%'});
    /* Add transition for smooth animation */
    transition: clip-path 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* Custom ease-out */
    z-index: -1;
  }
  /* Enlarged background circle when in view (using CSS class or data attribute) */
  &[data-inview="true"]:before {
    clip-path: circle(30% at ${props => props.reverse ? '90% 10%' : '10% 10%'});
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
    border-radius: 12px;
  }
`;
const IndustryContent = styled.div`
  padding: 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    font-size: 1.8rem;
    margin: 0 0 1.5rem;
    color: white;
    position: relative;
    display: inline-block;
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #ff3b30, #0a84ff);
      border-radius: 3px;
    }
  }
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  h4 {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
  }
  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
    h3 {
      font-size: 1.3rem;
      margin-bottom: 0.75rem;
    }
    p {
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
    }
    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }
  }
`;
const IndustryImage = styled.div`
  flex: 1;
  background: ${props => props.bgColor || '#333'};
  min-height: 300px;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isActive ? 0 : 1};
  transition: opacity 0.5s ease;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${props => props.bgImage || ''}) center/cover no-repeat;
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  &:hover:before {
    transform: scale(1.05);
  }
`;
// Update the IndustryVideo component to ensure proper sizing and aspect ratio
const IndustryVideo = styled.div`
  flex: 1;
  background: ${props => props.bgColor || '#333'};
  position: relative;
  overflow: hidden;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255,59,48,0.1), rgba(10,132,255,0.1));
    z-index: 1;
  }
  @media (max-width: 900px) {
    min-height: 300px;
  }
  @media (max-width: 480px) {
    min-height: 220px;
  }
`;
const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.8rem;
    line-height: 1.4;
    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary);
      font-weight: bold;
    }
  }
  @media (max-width: 480px) {
    li {
      font-size: 0.9rem;
      margin-bottom: 0.6rem;
      padding-left: 1.25rem;
    }
  }
`;
// Video section styled component
const VideoSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(180deg, #0c0c0c 0%, #151515 100%);
  position: relative;
  z-index: 1;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,59,48,0.05) 0%, rgba(10,132,255,0.05) 100%);
    z-index: -1;
  }
  @media (max-width: 768px) {
    padding: 3rem 0;
    min-height: auto;
  }
  @media (max-width: 480px) {
    padding: 2.5rem 0 3.5rem;
  }
`;
// Video container that stays in position
const StickyVideoContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  margin: 0 auto;
  position: relative;
  background: #000;
  will-change: transform; /* Optimize for animations */
  aspect-ratio: 16 / 9;
  height: auto;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255,59,48,0.1), rgba(10,132,255,0.1));
    z-index: 1;
    pointer-events: none;
  }
  @media (max-width: 768px) {
    width: 95%;
    aspect-ratio: 4 / 3;
  }
  @media (max-width: 480px) {
    width: 92%;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  }
`;
// Simplify the VideoControls since we're focusing on autoplay
const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const VideoHeading = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ff3b30, #0a84ff);
    border-radius: 2px;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;
const VideoDescription = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    padding: 0 1.25rem;
    line-height: 1.5;
  }
`;
// --- Scroll Indicator Adjustments ---
const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 20px; /* Reduced distance from bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 25px; /* Slightly smaller */
  height: 40px; /* Slightly smaller */
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5px;
  cursor: pointer;
  z-index: 10;
  &:before {
    content: '';
    width: 5px; /* Smaller dot */
    height: 5px;
    border-radius: 50%;
    background: white;
    animation: scroll 2s infinite;
  }
  @keyframes scroll {
    0% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(10px); /* Reduced travel */ opacity: 0.5; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @media (max-width: 480px) {
    bottom: 15px; /* Closer to bottom on small screens */
    width: 22px;
    height: 35px;
    &:before {
      width: 4px;
      height: 4px;
    }
  }
`;
// Update the VideoIframeContainer for better video framing
const VideoIframeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.6);
    z-index: 1;
  }
  iframe {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
// --- Flipping Texts (Constants) ---
const flippingTexts = [
  "The Era of AI Powered Drones",
  "Next-Generation Aerial Solutions", // <-- This text is now used in the hero title
  "Autonomous Flight",
  "Real Intelligence",
  "Real-Time Eyes in the Sky",
  "Surveillance Reimagined",
  "Future of Aerial Intelligence"
];
// --- Main Component ---
function HomePage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Create refs for industry videos
  const agricultureVideoRef = useRef(null);
  const surveillanceVideoRef = useRef(null);
  const inspectionVideoRef = useRef(null);
  const mappingVideoRef = useRef(null);
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Add state for drone type rotation
  const [droneType, setDroneType] = useState("Security");
  // Create ref for video section
  const [videoSectionRef, videoSectionInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  // Create refs for industry sections and their in-view state
  const [agricultureRef, isAgricultureCardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [surveillanceRef, isSurveillanceCardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [inspectionRef, isInspectionCardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [mappingRef, isMappingCardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  // Add lazy loading state for industry videos
  const [loadAgricultureVideo, setLoadAgricultureVideo] = useState(false);
  const [loadSurveillanceVideo, setLoadSurveillanceVideo] = useState(false);
  const [loadInspectionVideo, setLoadInspectionVideo] = useState(false);
  const [loadMappingVideo, setLoadMappingVideo] = useState(false);
  // Add drone types rotation effect
  useEffect(() => {
    const droneTypes = [
      "Security",
      "Military", // <-- This type is now used in the hero title
      "Surveillance",
      "Agriculture",
      "Customized"
    ];
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % droneTypes.length;
      setDroneType(droneTypes[currentIndex]);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(intervalId);
  }, []);
  // Add auto-scroll on page refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Scroll to next section
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  const [flippingText, setFlippingText] = useState(flippingTexts[0]);
  useEffect(() => {
    let currentIndex = 0;
    // Find the index of "Next-Generation Aerial Solutions" to start with it
    const startIndex = flippingTexts.indexOf("Next-Generation Aerial Solutions");
    if (startIndex !== -1) {
        currentIndex = startIndex;
        setFlippingText(flippingTexts[startIndex]);
    }

    const intervalId = setInterval(() => {
       currentIndex = (currentIndex + 1) % flippingTexts.length;
       setFlippingText(flippingTexts[currentIndex]);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Add CSS scroll behavior to the entire document
  useEffect(() => {
    // Add smooth scrolling to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  // Update the ScoutImage animation for mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  // Add window resize handler for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // --- Enhanced Floating Particles Logic ---
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const numParticles = isMobile ? 15 : 30; // Fewer particles on mobile
    const newParticles = Array.from({ length: numParticles }, (_, i) => {
      const size = Math.random() * 4 + 4; // Size between 4px and 8px
      const initialX = Math.random() * 100; // Percentage
      const initialY = Math.random() * 100; // Percentage
      const speed = Math.random() * 0.5 + 0.2; // Speed multiplier
      const delay = Math.random() * 3; // Random start delay
      return {
        id: i,
        initialX,
        initialY,
        size,
        speed,
        delay,
      };
    });
    setParticles(newParticles);
    // Cleanup not needed as particles are managed by React state now
  }, [isMobile]); // Re-run if mobile status changes
  // --- Scroll Animation Variants ---
  // General fade-in-up animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  // Stagger children animations (useful for grids/lists)
  const container = {
    hidden: { opacity: 1 }, // Parent visible, children hidden
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // Delay before children start
        staggerChildren: 0.15 // Delay between each child
      }
    }
  };
  // --- Industry Card Content Animation Variants ---
  const itemFadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const listItemFadeIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  // --- Industry Video Lazy Loading Effects ---
  useEffect(() => {
    if (isAgricultureCardInView) {
      setLoadAgricultureVideo(true);
    }
  }, [isAgricultureCardInView]);
  useEffect(() => {
    if (isSurveillanceCardInView) {
      setLoadSurveillanceVideo(true);
    }
  }, [isSurveillanceCardInView]);
  useEffect(() => {
    if (isInspectionCardInView) {
      setLoadInspectionVideo(true);
    }
  }, [isInspectionCardInView]);
  useEffect(() => {
    if (isMappingCardInView) {
      setLoadMappingVideo(true);
    }
  }, [isMappingCardInView]);
  // --- Sidebar Functions ---
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // --- Updated Keywords ---
  const keywords = [
    "AI drones", "Artemis drones", "smart drones", "security drones", "agriculture drones",
    "warehouse drones", "industrial drones", "drone technology", "drone solutions", "drone company",
    "Artemis AI", "AI drones in Pakistan", "Drones in Pakistan", "Drones in Lahore",
    "Custom drones in Pakistan", "Drone solutions in Pakistan", "Surveillance drones Pakistan",
    "Security drones Pakistan", "Drone technology in Pakistan", "AI-powered drones Lahore",
    "Drone manufacturing Pakistan", "Custom drone development", "AI drone services",
    "AI drone company Pakistan", "Custom surveillance drones", "Industrial drone solutions",
    "Enterprise drone solutions Pakistan", "Smart drones for security", "UAV solutions in Pakistan",
    "AI drone integration", "Lahore drone companies", "Drones for surveillance",
    "Drones for security monitoring", "Border surveillance drones", "AI drones for agriculture",
    "Drones for inspection and monitoring", "Drone fleet management Pakistan",
    "Night vision drones Pakistan", "AI drone technology", "Machine learning drones",
    "Computer vision drones", "Autonomous drone systems", "Edge AI drones",
    "Real-time drone video analytics"
  ].join(", ");

  return (
    <>
      <Helmet>
        <title>Artemis AI Drones | Smart Drones for Security, Agriculture, and More</title>
        {/* --- Updated Meta Tags with Keywords --- */}
        <meta name="description" content="Discover Artemis AI-powered drones in Pakistan for security, agriculture, surveillance, and more. Advanced drone solutions including custom drones in Lahore. Explore cutting-edge UAV technology!" />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content="Artemis AI Drones | Smart Drones for Security, Agriculture, and More" />
        <meta property="og:description" content="Discover Artemis AI-powered drones in Pakistan for security, agriculture, surveillance, and more. Advanced drone solutions including custom drones in Lahore. Explore cutting-edge UAV technology!" />
        <meta property="og:type" content="website" />
        {/* ------------------------------------- */}
      </Helmet>
      {/* --- Sidebar --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <SidebarOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar} // Close sidebar if overlay is clicked
          >
            <SidebarContent
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
            >
              <CloseButton onClick={closeSidebar} aria-label="Close Menu">
                <FaTimes />
              </CloseButton>
              <h2>Menu</h2>
              <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ margin: '1rem 0' }}><Link to="/" onClick={closeSidebar}>Home</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link to="/about" onClick={closeSidebar}>About</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link to="/products" onClick={closeSidebar}>Products</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
                  {/* Add more links as needed */}
                </ul>
              </nav>
            </SidebarContent>
          </SidebarOverlay>
        )}
      </AnimatePresence>
      <HeroSection>
        {/* Black background */}
        <FloatingParticles>
            {particles.map((particle) => (
                <Particle
                    key={particle.id}
                    initial={{
                        x: `${particle.initialX}%`,
                        y: `${particle.initialY}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: 0,
                    }}
                    animate={{
                        // Gentle floating motion
                        y: [
                            `${particle.initialY}%`,
                            `${particle.initialY - (Math.random() * 2 + 1)}%`,
                            `${particle.initialY}%`,
                        ],
                        // Gentle side-to-side motion
                        x: [
                            `${particle.initialX}%`,
                            `${particle.initialX + (Math.random() * 1 - 0.5)}%`,
                            `${particle.initialX}%`,
                        ],
                        // Subtle opacity pulse
                        opacity: [0.3, 0.7, 0.3],
                        // Pulsing glow effect using boxShadow
                        boxShadow: [
                            "0 0 0 0px rgba(255, 59, 48, 0.5), 0 0 10px rgba(10, 132, 255, 0.7)",
                            "0 0 0 3px rgba(255, 59, 48, 0.3), 0 0 15px rgba(10, 132, 255, 0.5)",
                            "0 0 0 0px rgba(255, 59, 48, 0.5), 0 0 10px rgba(10, 132, 255, 0.7)",
                        ],
                    }}
                    transition={{
                        duration: particle.speed * 5, // Duration based on speed
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: particle.delay,
                        // Stagger opacity pulses slightly
                        opacity: {
                            duration: particle.speed * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: particle.delay + 0.5,
                        },
                        // Stagger glow pulses slightly
                        boxShadow: {
                            duration: particle.speed * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: particle.delay + 1,
                        }
                    }}
                    style={{
                        left: `${particle.initialX}%`,
                        top: `${particle.initialY}%`,
                    }}
                />
            ))}
        </FloatingParticles>
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WelcomeText>Welcome To</WelcomeText>
          {/* --- Updated Flipping Text Usage --- */}
          {/* The FlippingTextContainer now shows "Next-Generation Aerial Solutions" */}
          <FlippingTextContainer>
            <AnimatePresence mode="wait">
              <motion.h2
                key={flippingText} // Use the state variable directly
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  display: "inline-block",
                  background: "linear-gradient(135deg, rgba(255, 59, 48, 0.9), rgba(10, 132, 255, 0.9))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                  fontSize: isMobile ? "1.25rem" : "1.5rem", // Responsive font size
                  textAlign: "center",
                  width: "100%",
                  padding: "0 10px", // Add padding to prevent text clipping
                  boxSizing: "border-box",
                }}
              >
                {flippingText} {/* Use the state variable directly */}
              </motion.h2>
            </AnimatePresence>
          </FlippingTextContainer>
          {/* --- Updated Hero Title --- */}
          {/* The HeroTitle now shows "Autonomous Military Drones" */}
          <HeroTitle>
            <span className="title-container" style={{ position: "relative" }}>
              <TitleWord>Autonomous</TitleWord>
              {/* Improved DroneTypeContainer for Mobile */}
              <DroneTypeContainer style={{ position: "relative" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={droneType} // Use the state variable directly
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      textAlign: "center",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundImage: "linear-gradient(135deg, rgba(255, 59, 48, 0.9), rgba(10, 132, 255, 0.9))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: isMobile ? "1.6rem" : "inherit", // Responsive font size
                      fontWeight: "bold",
                      padding: "0 5px", // Padding for text
                      boxSizing: "border-box",
                      // Ensure it doesn't interfere with layout on small screens
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {droneType} {/* Use the state variable directly */}
                  </motion.span>
                </AnimatePresence>
              </DroneTypeContainer>
              <TitleWord>Drones</TitleWord>
            </span>
          </HeroTitle>
          <HeroDescription>
            Protecting lives and property with advanced AI-powered aerial technology in Pakistan.
          </HeroDescription>
        </HeroContent>
        {/* Scout Image with Mobile Adjustments */}
        <ScoutImage
          src="/images/scout.png"
          alt="Artemis Scout"
          initial={{ x: isMobile ? 200 : 400, y: isMobile ? 100 : -200, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Scroll Indicator with Mobile Adjustments */}
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={scrollToNext}
        />
      </HeroSection>
      {/* --- Why Choose Artemis UAV (WITH SCROLL ANIMATIONS) --- */}
      <WhyChooseSection>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // Animate only once
        >
          Why Choose Artemis UAV
        </motion.h2>
        <IntroText> {/* Animate IntroText */}
        <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            Our drones are engineered to deliver exceptional performance, reliability, and value across a wide range of applications and environments in Pakistan.
          </motion.p>
        </IntroText>
        {/* Animate the grid container and its children with stagger */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is in view
        >
          <WhyChooseGrid>
            <ChooseCard variants={fadeInUp} custom={0}> {/* Pass variants to child */}
              <IconWrapper bgColor="rgba(255, 59, 48, 0.15)">
                <FaRocket color="#0A84FF" />
              </IconWrapper>
              <h3>High Performance</h3>
              <p>Industry-leading flight times, range, and stability even in challenging conditions across Pakistan.</p>
            </ChooseCard>
            <ChooseCard variants={fadeInUp} custom={1}>
              <IconWrapper bgColor="rgba(10, 132, 255, 0.15)">
                <FaShieldAlt color="#0A84FF" />
              </IconWrapper>
              <h3>Reliable & Safe</h3>
              <p>Redundant systems, obstacle avoidance, and intelligent return-to-home capabilities for operations in Lahore and beyond.</p>
            </ChooseCard>
            <ChooseCard variants={fadeInUp} custom={2}>
              <IconWrapper bgColor="rgba(255, 255, 255, 0.1)">
                <FaClock color="#FFFFFF" />
              </IconWrapper>
              <h3>Time-Efficient</h3>
              <p>Cover large areas quickly with automated flight patterns and mission planning tailored for Pakistani industries.</p>
            </ChooseCard>
          </WhyChooseGrid>
          <WhyChooseGridSecondRow>
            <ChooseCard variants={fadeInUp} custom={3}>
              <IconWrapper bgColor="rgba(255, 204, 0, 0.15)">
                <FaTools color="#FFCC00" />
              </IconWrapper>
              <h3>Precision Control</h3>
              <p>Centimeter-level accuracy for mapping, surveying, and inspection applications, ideal for Pakistan's diverse terrain.</p>
            </ChooseCard>
            <ChooseCard variants={fadeInUp} custom={4}>
              <IconWrapper bgColor="rgba(52, 199, 89, 0.15)">
                <FaCog color="#34C759" />
              </IconWrapper>
              <h3>Customizable</h3>
              <p>Modular design allows for easy payload swapping and system customization. Get your custom drones made in Pakistan.</p>
            </ChooseCard>
          </WhyChooseGridSecondRow>
        </motion.div>
      </WhyChooseSection>
      {/* --- Video Section (WITH SCROLL ANIMATION) --- */}
      <VideoSection ref={videoSectionRef}>
        <VideoHeading>Artemis Scout in Action</VideoHeading>
        <VideoDescription>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            Watch our flagship drone perform in real-world conditions in Pakistan, demonstrating its
            exceptional stability, range, and imaging capabilities.
          </motion.p>
        </VideoDescription>
        <StickyVideoContainer>
          <VideoIframeContainer>
            <iframe
              ref={videoRef}
              src="https://player.vimeo.com/video/1085459224?h=3065b2ca2e&autoplay=1&loop=1&background=1"
              allow="autoplay; fullscreen; picture-in-picture"
              frameBorder="0"
              loading="lazy"
              title="Artemis Scout Drone"
            />
          </VideoIframeContainer>
        </StickyVideoContainer>
      </VideoSection>
      {/* --- Transforming Industries (WITH ENHANCED SCROLL ANIMATIONS) --- */}
      <TransformSection>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Transforming Industries in Pakistan
        </motion.h2>
        <IntroText>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp} // Re-using the variant from previous updates
            viewport={{ once: true }}
          >
            Our drone solutions are designed to solve real-world challenges across multiple sectors in Pakistan, from Lahore to remote areas.
          </motion.p>
        </IntroText>
        {/* Animate the container for staggered children */}
        <motion.div
          variants={container} // Re-using the stagger container variant
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* --- Precision Agriculture --- */}
          <motion.div variants={fadeInUp}>
            {/* Pass a ref and add custom animation to IndustryCard */}
            <IndustryCard
              ref={agricultureRef}
              gradientStart="#4CAF50"
              gradientEnd="#8BC34A"
              reverse={false} // Ensure props are passed correctly
              data-inview={isAgricultureCardInView ? "true" : "false"} // Use data attribute for CSS
              initial={{ opacity: 0, scale: 0.95 }} // Start slightly smaller
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Animate content inside the card */}
              <IndustryContent>
                {/* Animate the main heading */}
                <motion.h3
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Precision Agriculture in Pakistan
                </motion.h3>
                {/* Animate the paragraph */}
                <motion.p
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Revolutionize farming with aerial insights. Our drones help monitor crop health, optimize irrigation, and increase yields through detailed multispectral imaging across Pakistan's agricultural regions.
                </motion.p>
                {/* Animate the sub-heading */}
                <motion.h4
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Key Benefits
                </motion.h4>
                {/* Animate the list items */}
                <BenefitsList>
                  {[...Array(4)].map((_, i) => ( // Assuming 4 benefits
                    <motion.li
                      key={i}
                      variants={listItemFadeIn}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }} // Staggered delay
                      viewport={{ once: true }}
                    >
                      {[
                        "Identify crop stress before visible to the naked eye",
                        "Reduce water and fertilizer usage by 30%",
                        "Increase crop yields by up to 20%",
                        "Map large areas quickly and efficiently"
                      ][i]}
                    </motion.li>
                  ))}
                </BenefitsList>
              </IndustryContent>
              <IndustryVideo bgColor="#1E2846">
                <VideoIframeContainer>
                  {loadAgricultureVideo && (
                    <iframe
                      ref={agricultureVideoRef}
                      // Corrected link
                      src="https://player.vimeo.com/video/1085458685?h=aa97018d6e&autoplay=1&loop=1&background=1"
                      allow="autoplay; fullscreen; picture-in-picture"
                      frameBorder="0"
                      loading="lazy"
                      title="Agriculture Drone"
                    />
                  )}
                </VideoIframeContainer>
              </IndustryVideo>
            </IndustryCard>
          </motion.div>
          {/* --- Aerial Surveillance --- */}
          <motion.div variants={fadeInUp}>
            <IndustryCard
              ref={surveillanceRef}
              reverse
              gradientStart="#2196F3"
              gradientEnd="#03A9F4"
              data-inview={isSurveillanceCardInView ? "true" : "false"}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <IndustryContent>
                <motion.h3
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Aerial Surveillance in Pakistan
                </motion.h3>
                <motion.p
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Enhance security operations with advanced aerial monitoring. Our surveillance drones provide real-time feeds, thermal imaging, and automated patrol capabilities for border security and urban monitoring in Lahore and other cities.
                </motion.p>
                <motion.h4
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Key Benefits
                </motion.h4>
                <BenefitsList>
                  {[...Array(4)].map((_, i) => (
                    <motion.li
                      key={i}
                      variants={listItemFadeIn}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {[
                        "24/7 monitoring capabilities",
                        "Reduce security personnel costs",
                        "Rapid deployment to incident areas",
                        "AI-powered threat detection"
                      ][i]}
                    </motion.li>
                  ))}
                </BenefitsList>
              </IndustryContent>
              <IndustryVideo bgColor="#1E2846">
                <VideoIframeContainer>
                  {loadSurveillanceVideo && (
                    <iframe
                      ref={surveillanceVideoRef}
                      // Corrected link
                      src="https://player.vimeo.com/video/1085460408?h=9278163612&autoplay=1&loop=1&background=1"
                      allow="autoplay; fullscreen; picture-in-picture"
                      frameBorder="0"
                      loading="lazy"
                      title="Surveillance Drone"
                    />
                  )}
                </VideoIframeContainer>
              </IndustryVideo>
            </IndustryCard>
          </motion.div>
          {/* --- Industrial Inspection --- */}
          <motion.div variants={fadeInUp}>
            <IndustryCard
              ref={inspectionRef}
              gradientStart="#FF9800"
              gradientEnd="#FFC107"
              reverse={false}
              data-inview={isInspectionCardInView ? "true" : "false"}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <IndustryContent>
                <motion.h3
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Industrial Inspection in Pakistan
                </motion.h3>
                <motion.p
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Safely inspect infrastructure like power lines, pipelines, and industrial facilities without putting personnel at risk. Access hard-to-reach areas and detect problems early across Pakistan's industrial zones.
                </motion.p>
                <motion.h4
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Key Benefits
                </motion.h4>
                <BenefitsList>
                  {[...Array(4)].map((_, i) => (
                    <motion.li
                      key={i}
                      variants={listItemFadeIn}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {[
                        "Reduce inspection costs by up to 80%",
                        "Minimize downtime during inspections",
                        "Identify structural issues early",
                        "Create detailed 3D models of facilities"
                      ][i]}
                    </motion.li>
                  ))}
                </BenefitsList>
              </IndustryContent>
              <IndustryVideo bgColor="#462D1E">
                <VideoIframeContainer>
                  {loadInspectionVideo && (
                    <iframe
                      ref={inspectionVideoRef}
                      // Corrected link
                      src="https://player.vimeo.com/video/1085460667?h=78ef9db498&autoplay=1&loop=1&background=1"
                      allow="autoplay; fullscreen; picture-in-picture"
                      frameBorder="0"
                      loading="lazy"
                      title="Industrial Inspection Drone"
                    />
                  )}
                </VideoIframeContainer>
              </IndustryVideo>
            </IndustryCard>
          </motion.div>
          {/* --- Mapping & Surveying --- */}
          <motion.div variants={fadeInUp}>
            <IndustryCard
              ref={mappingRef}
              reverse
              gradientStart="#9C27B0"
              gradientEnd="#673AB7"
              data-inview={isMappingCardInView ? "true" : "false"}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <IndustryContent>
                <motion.h3
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Mapping & Surveying in Pakistan
                </motion.h3>
                <motion.p
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Generate high-precision maps and 3D models for construction, mining, land management, and archaeological surveys with our specialized mapping drones across Pakistan's diverse landscapes.
                </motion.p>
                <motion.h4
                  variants={itemFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Key Benefits
                </motion.h4>
                <BenefitsList>
                  {[...Array(4)].map((_, i) => (
                    <motion.li
                      key={i}
                      variants={listItemFadeIn}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {[
                        "Create accurate topographical maps",
                        "Track progress on construction sites",
                        "Calculate precise volume measurements",
                        "Generate orthomosaic maps and point clouds"
                      ][i]}
                    </motion.li>
                  ))}
                </BenefitsList>
              </IndustryContent>
              <IndustryVideo bgColor="#2D2D46">
                <VideoIframeContainer>
                  {loadMappingVideo && (
                    <iframe
                      ref={mappingVideoRef}
                      // Corrected link
                      src="https://player.vimeo.com/video/1085458702?h=eba42b56a6&autoplay=1&loop=1&background=1"
                      allow="autoplay; fullscreen; picture-in-picture"
                      frameBorder="0"
                      loading="lazy"
                      title="Mapping Drone"
                    />
                  )}
                </VideoIframeContainer>
              </IndustryVideo>
            </IndustryCard>
          </motion.div>
        </motion.div>
      </TransformSection>
      {/* --- Footer --- */}
      <Footer>
        <FooterContent>
          <ContactInfo>
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:uavartemis@gmail.com">uavartemis@gmail.com</a></p>
            <p>Phone: <a href="tel:+923104768835">+92 310-4768835</a></p>
            <p>Address: National Incubation Center (NICL), Vogue Tower, MM alam road, Gulberg, Lahore, Pakistan</p>
          </ContactInfo>
          <ContactInfo>
            <h4>Need a Custom Solution?</h4>
            <p>Our engineering team can develop specialized drone systems tailored to your unique requirements in Pakistan.</p>
            <Link to="/contact">
              <CTAButton
                style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </CTAButton>
            </Link>
          </ContactInfo>
        </FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Artemis UAV. All rights reserved.
        </Copyright>
      </Footer>
    </>
  );
}
export default HomePage;
