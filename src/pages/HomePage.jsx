import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaRocket, FaShieldAlt, FaClock, FaTools, FaCog, FaArrowUp } from 'react-icons/fa';

// Styled Components
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: 768px) {
    height: 90vh;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    height: 85vh;
  }
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  canvas {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
  }
`;

const BackgroundImages = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
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
    margin-top:-10px; /* Move content up a bit on mobile */
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: white;
  z-index: 2;
  font-weight: 700;
  line-height: 1.5;
  padding: 0 10px;
  
  span.title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: 1px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    
    span.title-container {
      flex-direction: column;
      gap: 0;
      margin-top: 5px;
      height: auto;
      min-height: 150px;
    }
  }
`;

const TitleWord = styled.span`
  display: inline-block;
  vertical-align: middle;
  
  @media (max-width: 480px) {
    line-height: 1.2;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  margin-left: 100px;
  color: #d3d3d3;
  font-weight: 400;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    margin-left: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
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
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: auto;
  z-index: 2;
  opacity: 0;

  @media (max-width: 768px) {
    width: 250px;

  }
  
  @media (max-width: 480px) {
    width: 180px;
    right: -20px;
    top: auto;
    bottom: 1%;
    transform: translateY(0);
  }
`;

const droneImages = [
  '/images/drone1.webp',
  '/images/drone2.webp',
  '/images/drone3.jpeg'
];

const droneCaptions = [
  'Advanced  drone in action',
  'Night vision security patrol',
  'Multi-purpose rescue operations'
];

const Section = styled(motion.section)`
  opacity: 0;
`;

const backgroundVariants = {
  initial: { 
    scale: 1.05, 
    opacity: 0 
  },
  animate: { 
    scale: 1.02,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

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
    padding: 3rem 1rem;
    
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
    
    h3 {
      font-size: 1.2rem;
      margin: 0.8rem 0;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const IntroText = styled.p`
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

const IndustryCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 4rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  position: relative;
  
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
  
  @media (max-width: 900px) {
    min-height: 300px;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
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
  
  @media (max-width: 768px) {
    padding: 3rem 0;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 0;
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

  @media (max-width: 768px) {
    width: 95%;
    aspect-ratio: 4 / 3;
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
    padding: 0 1rem;
  }
`;

const WelcomeText = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  z-index: 2;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
  }
`;

const FlippingTextContainer = styled.div`
  position: relative;
  z-index: 2;
  height: 4rem; /* Fixed height to prevent movement */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    height: 4rem;
  }
  
  @media (max-width: 480px) {
    height: 3rem;
    margin-bottom: 1rem;
    padding: 0 5px;
    text-align: center;
    overflow: visible;
  }
`;

const flippingTexts = [
  "The Era of AI Powered Drones",
  "Next-Generation Aerial Solutions",
  "Autonomous Flight",
  "Real Intelligence",
  "Real-Time Eyes in the Sky",
  "Surveillance Reimagined",
  "Future of Aerial Intelligence"
];

// Add video display logic
const videos = [
    {
        src: "https://vimeo.com/1085458702/eba42b56a6",
        type: "video/mp4",
        id: "mappingVideo"
    },
    {
        src: "https://vimeo.com/1085460408/9278163612",
        type: "video/mp4",
        id: "surveillanceVideo"
    },
    {
        src: "https://vimeo.com/1085459224/3065b2ca2e",
        type: "video/mp4",
        id: "scoutVideo"
    }
];

const DroneTypeContainer = styled.div`
  display: inline-block;
  min-width: 350px;
  position: left;
  height: 2rem;
  margin: 0 15px;
  transform: translateY(-1px); /* Move it slightly upwards */
  vertical-align: left;
  
  @media (max-width: 768px) {
    min-width: 100px;
    height: 2.6rem;
    margin: 0 10px;
    transform: translateY(-3px);
  }
  
  @media (max-width: 480px) {
    min-width: 200px;
    height: 2.5rem;
    margin: 10px 0;
    position: relative;
    transform: translateY(0);
  }
`;

// Replace ParticleBackground with a black background div for Vanta
const VantaBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #0c0c0c;
`;

// Add the cardAnimation that were missing
const cardAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

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

function HomePage() {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [particlesContainer, setParticlesContainer] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Create refs for industry videos
  const agricultureVideoRef = useRef(null);
  const surveillanceVideoRef = useRef(null);
  const inspectionVideoRef = useRef(null);
  const mappingVideoRef = useRef(null);
  
  // Add state for drone type rotation
  const [droneType, setDroneType] = useState("Security");
  
  // Create ref for video section
  const [videoSectionRef, videoSectionInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  // Create refs for industry sections
  const [agricultureRef, agricultureInView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  const [surveillanceRef, surveillanceInView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  const [inspectionRef, inspectionInView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  const [mappingRef, mappingInView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  // Add lazy loading state for industry videos
  const [loadAgricultureVideo, setLoadAgricultureVideo] = useState(false);
  const [loadSurveillanceVideo, setLoadSurveillanceVideo] = useState(false);
  const [loadInspectionVideo, setLoadInspectionVideo] = useState(false);
  const [loadMappingVideo, setLoadMappingVideo] = useState(false);
  
  // Update the handleVideoVisibility function to work with Vimeo's API
  const handleVideoVisibility = () => {
    if (!videoRef.current) return;
    
    const rect = videoRef.current.getBoundingClientRect();
    const isVisible = 
      rect.top < window.innerHeight && 
      rect.bottom > 0;
    
    // Update play state based on visibility
    setIsPlaying(isVisible);
    
    // For Vimeo videos, we use their player API
    if (isVisible && videoRef.current.contentWindow) {
      try {
        // Using Vimeo's postMessage API
        videoRef.current.contentWindow.postMessage({
          method: 'play'
        }, '*');
      } catch (error) {
        console.log('Could not autoplay video');
      }
    } else if (!isVisible && videoRef.current.contentWindow) {
      try {
        // Pause when not visible
        videoRef.current.contentWindow.postMessage({
          method: 'pause'
        }, '*');
      } catch (error) {
        console.log('Could not pause video');
      }
    }
  };
  
  // Check visibility on scroll for main video
  useEffect(() => {
    if (!videoRef.current) return;
    
    window.addEventListener('scroll', handleVideoVisibility);
    
    // Initial check
    handleVideoVisibility();
    
    return () => {
      window.removeEventListener('scroll', handleVideoVisibility);
    };
  }, []);
  
  // Update control for industry section videos
  useEffect(() => {
    if (agricultureInView) {
      setLoadAgricultureVideo(true);
      // Try to ensure autoplay when iframe is loaded
      setTimeout(() => {
        if (agricultureVideoRef.current && agricultureVideoRef.current.contentWindow) {
          try {
            // Using Vimeo's postMessage API
            agricultureVideoRef.current.contentWindow.postMessage({
              method: 'play'
            }, '*');
          } catch (error) {
            console.log('Could not autoplay agriculture video');
          }
        }
      }, 1000);
    }
  }, [agricultureInView]);
  
  // Add drone types rotation effect
  useEffect(() => {
    const droneTypes = [
      "Security",
      "Military",
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
  
  // Control surveillance video
  useEffect(() => {
    if (surveillanceInView) {
      setLoadSurveillanceVideo(true);
      // Try to ensure autoplay when iframe is loaded
      setTimeout(() => {
        if (surveillanceVideoRef.current && surveillanceVideoRef.current.contentWindow) {
          try {
            // Using Vimeo's postMessage API
            surveillanceVideoRef.current.contentWindow.postMessage({
              method: 'play'
            }, '*');
          } catch (error) {
            console.log('Could not autoplay surveillance video');
          }
        }
      }, 1000);
    }
  }, [surveillanceInView]);
  
  // Control inspection video
  useEffect(() => {
    if (inspectionInView) {
      setLoadInspectionVideo(true);
      // Try to ensure autoplay when iframe is loaded
      setTimeout(() => {
        if (inspectionVideoRef.current && inspectionVideoRef.current.contentWindow) {
          try {
            // Using Vimeo's postMessage API
            inspectionVideoRef.current.contentWindow.postMessage({
              method: 'play'
            }, '*');
          } catch (error) {
            console.log('Could not autoplay inspection video');
          }
        }
      }, 1000);
    }
  }, [inspectionInView]);
  
  // Control mapping video
  useEffect(() => {
    if (mappingInView) {
      setLoadMappingVideo(true);
      // Try to ensure autoplay when iframe is loaded
      setTimeout(() => {
        if (mappingVideoRef.current && mappingVideoRef.current.contentWindow) {
          try {
            // Using Vimeo's postMessage API
            mappingVideoRef.current.contentWindow.postMessage({
              method: 'play'
            }, '*');
          } catch (error) {
            console.log('Could not autoplay mapping video');
          }
        }
      }, 1000);
    }
  }, [mappingInView]);
  
  // Add auto-scroll on page refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let particlesInstance = null;
    
    const initVantaBackground = () => {
      if (!window.VANTA) {
        console.error("VANTA not loaded correctly");
        return;
      }
      
      if (particlesInstance) {
        particlesInstance.destroy();
      }
      
      try {
        // Set the container's width and height first
        const vantaElement = document.getElementById("vantaBackground");
        if (vantaElement) {
          vantaElement.style.width = "100%";
          vantaElement.style.height = "100%";
          vantaElement.style.position = "fixed";
          vantaElement.style.top = "0";
          vantaElement.style.left = "0";
          vantaElement.style.zIndex = "-1";
        }
        
        particlesInstance = window.VANTA.DOTS({
          el: "#vantaBackground",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: window.innerHeight,
          minWidth: window.innerWidth,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xffffff,
          color2: 0x2d2d46,
          backgroundColor: 0x0c0c0c,
          size: 3.70,
          spacing: 35.00,
          showLines: false
        });
        console.log("Vanta background initialized with dimensions", window.innerWidth, window.innerHeight);
      } catch (error) {
        console.error("Error initializing Vanta background:", error);
      }
    };
    
    // Make sure the DOM is fully loaded and resize listener is added
    if (document.readyState === 'complete') {
      initVantaBackground();
    } else {
      window.addEventListener('load', initVantaBackground);
    }
    
    // Handle window resize to update Vanta
    const handleResize = () => {
      if (particlesInstance) {
        particlesInstance.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('load', initVantaBackground);
      window.removeEventListener('resize', handleResize);
      if (particlesInstance) {
        particlesInstance.destroy();
      }
    };
  }, []);

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

  return (
    <>
      <HeroSection>
        <BackgroundImages>
          {droneImages.map((image, index) => (
            <BackgroundImage
              key={index}
              variants={backgroundVariants}
              initial="initial"
              animate={index === 0 ? "animate" : "initial"}
            >
              <img src={image} alt={droneCaptions[index]} />
            </BackgroundImage>
          ))}
        </BackgroundImages>
        <VantaBackground id="vantaBackground" />
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WelcomeText>
            Welcome To
          </WelcomeText>
          <FlippingTextContainer>
            <AnimatePresence mode="wait">
              <motion.h2
                key={flippingText}
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
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  textAlign: "center",
                  width: "100%"
                }}
              >
                {flippingText}
              </motion.h2>
            </AnimatePresence>
          </FlippingTextContainer>
          <HeroTitle>
            <span className="title-container">
              <TitleWord>Autonomous</TitleWord>
              <DroneTypeContainer>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={droneType}
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
                      fontSize: isMobile ? "3rem" : "inherit"
                    }}
                  >
                    {droneType}
                  </motion.span>
                </AnimatePresence>
              </DroneTypeContainer>
              <TitleWord>Drones</TitleWord>
            </span>
          </HeroTitle>
          <HeroDescription>
            Protecting lives and property with advanced AI-powered aerial technology.
          </HeroDescription>
        </HeroContent>
        <ScoutImage
          src="/images/scout.png"
          alt="Artemis Scout"
          initial={{ x: isMobile ? 200 : 400, y: isMobile ? 100 : -200, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </HeroSection>

      <WhyChooseSection>
        <h2>Why Choose Artemis UAV</h2>
        <IntroText>
          Our drones are engineered to deliver exceptional performance, reliability, and value across a wide range of applications and environments.
        </IntroText>
        
        <WhyChooseGrid>
          <ChooseCard
            custom={0}
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconWrapper bgColor="rgba(255, 59, 48, 0.15)">
              <FaRocket color="#FF3B30" />
            </IconWrapper>
            <h3>High Performance</h3>
            <p>Industry-leading flight times, range, and stability even in challenging conditions.</p>
          </ChooseCard>
          
          <ChooseCard
            custom={1}
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconWrapper bgColor="rgba(10, 132, 255, 0.15)">
              <FaShieldAlt color="#0A84FF" />
            </IconWrapper>
            <h3>Reliable & Safe</h3>
            <p>Redundant systems, obstacle avoidance, and intelligent return-to-home capabilities.</p>
          </ChooseCard>
          
          <ChooseCard
            custom={2}
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconWrapper bgColor="rgba(255, 255, 255, 0.1)">
              <FaClock color="#FFFFFF" />
            </IconWrapper>
            <h3>Time-Efficient</h3>
            <p>Cover large areas quickly with automated flight patterns and mission planning.</p>
          </ChooseCard>
        </WhyChooseGrid>
        
        <WhyChooseGridSecondRow>
          <ChooseCard
            custom={3}
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconWrapper bgColor="rgba(255, 204, 0, 0.15)">
              <FaTools color="#FFCC00" />
            </IconWrapper>
            <h3>Precision Control</h3>
            <p>Centimeter-level accuracy for mapping, surveying, and inspection applications.</p>
          </ChooseCard>
          
          <ChooseCard
            custom={4}
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconWrapper bgColor="rgba(52, 199, 89, 0.15)">
              <FaCog color="#34C759" />
            </IconWrapper>
            <h3>Customizable</h3>
            <p>Modular design allows for easy payload swapping and system customization.</p>
          </ChooseCard>
        </WhyChooseGridSecondRow>
      </WhyChooseSection>
      
      {/* Video section positioned above Transforming Industries */}
      <VideoSection ref={videoSectionRef}>
        <VideoHeading>Artemis Scout in Action</VideoHeading>
        <VideoDescription>
          Watch our flagship drone perform in real-world conditions, demonstrating its 
          exceptional stability, range, and imaging capabilities.
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
      
      <TransformSection>
        <h2>Transforming Industries</h2>
        <IntroText>
          Our drone solutions are designed to solve real-world challenges across multiple sectors.
        </IntroText>
        
        <IndustryCard
          ref={agricultureRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <IndustryContent>
            <h3>Precision Agriculture</h3>
            <p>
              Revolutionize farming with aerial insights. Our drones help monitor crop health, optimize irrigation, and increase yields through detailed multispectral imaging.
            </p>
            <h4>Key Benefits</h4>
            <BenefitsList>
              <li>Identify crop stress before visible to the naked eye</li>
              <li>Reduce water and fertilizer usage by 30%</li>
              <li>Increase crop yields by up to 20%</li>
              <li>Map large areas quickly and efficiently</li>
            </BenefitsList>
          </IndustryContent>
          <IndustryVideo bgColor="#1E2846">
            <VideoIframeContainer>
              {loadAgricultureVideo && (
                <iframe
                  ref={agricultureVideoRef}
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
        
        <IndustryCard
          ref={surveillanceRef}
          reverse
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <IndustryContent>
            <h3>Aerial Surveillance</h3>
            <p>
              Enhance security operations with advanced aerial monitoring. Our surveillance drones provide real-time feeds, thermal imaging, and automated patrol capabilities.
            </p>
            <h4>Key Benefits</h4>
            <BenefitsList>
              <li>24/7 monitoring capabilities</li>
              <li>Reduce security personnel costs</li>
              <li>Rapid deployment to incident areas</li>
              <li>AI-powered threat detection</li>
            </BenefitsList>
          </IndustryContent>
          <IndustryVideo bgColor="#1E2846">
            <VideoIframeContainer>
              {loadSurveillanceVideo && (
                <iframe
                  ref={surveillanceVideoRef}
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
        
        <IndustryCard
          ref={inspectionRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <IndustryContent>
            <h3>Industrial Inspection</h3>
            <p>
              Safely inspect infrastructure and industrial facilities without putting personnel at risk. Access hard-to-reach areas and detect problems early.
            </p>
            <h4>Key Benefits</h4>
            <BenefitsList>
              <li>Reduce inspection costs by up to 80%</li>
              <li>Minimize downtime during inspections</li>
              <li>Identify structural issues early</li>
              <li>Create detailed 3D models of facilities</li>
            </BenefitsList>
          </IndustryContent>
          <IndustryVideo bgColor="#462D1E">
            <VideoIframeContainer>
              {loadInspectionVideo && (
                <iframe
                  ref={inspectionVideoRef}
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
        
        <IndustryCard
          ref={mappingRef}
          reverse
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <IndustryContent>
            <h3>Mapping & Surveying</h3>
            <p>
              Generate high-precision maps and 3D models for construction, mining, and land management with our specialized mapping drones.
            </p>
            <h4>Key Benefits</h4>
            <BenefitsList>
              <li>Create accurate topographical maps</li>
              <li>Track progress on construction sites</li>
              <li>Calculate precise volume measurements</li>
              <li>Generate orthomosaic maps and point clouds</li>
            </BenefitsList>
          </IndustryContent>
          <IndustryVideo bgColor="#2D2D46">
            <VideoIframeContainer>
              {loadMappingVideo && (
                <iframe
                  ref={mappingVideoRef}
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
      </TransformSection>
      
      <Footer>
        <FooterContent>
          <ContactInfo>
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:uavartemis@gmail.com">uavartemis@gmail.com</a></p>
            <p>Phone: <a href="tel:+923104768835">+92 310-4768835</a></p>
            <p>Address: Johar Town, Lahore, Pakistan</p>
          </ContactInfo>
          
          <ContactInfo>
            <h4>Need a Custom Solution?</h4>
            <p>Our engineering team can develop specialized drone systems tailored to your unique requirements.</p>
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
