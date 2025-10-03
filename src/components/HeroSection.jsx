// src/components/HeroSectionComponent.jsx
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
// Icons are imported but not used in this snippet's JSX, kept in case needed elsewhere
import { FaPlane, FaLock, FaSearch } from 'react-icons/fa';

// Add Inter font to the font stack for premium look (ensure it's linked in your HTML)
const premiumFont = "'Inter', Arial, Helvetica, sans-serif";

// --- Carousel Data ---
// Ensure images are in the public/images folder
const carouselSlides = [
  { 
    id: 1, 
    image: '/images/DFR.png', 
    label: 'AI Drone',
    title: 'AI Drone',
    flippingTexts: [
      'Zero Human Intervention',
      'AI-Powered Surveillance',
      'Autonomous Flight',
      'Real-Time Intelligence',
      'Security Redefined',
    ],
    description: 'Revolutionizing surveillance and monitoring with fully autonomous AI-powered drones. Experience unparalleled security and efficiency.'
  },
  { 
    id: 2, 
    image: '/images/greenhouse.png', 
    label: 'Smart Agriculture',
    title: 'Smart Agriculture',
    flippingTexts: [
      'Humidity Control',
      'Temperature Monitoring',
      'Soil Moisture Tracking',
      'Plant Health Analysis',
      'Automated Climate Control',
    ],
    description: 'Advanced IoT monitoring and control system for optimal crop growth. Track humidity, temperature, soil moisture, and plant health in real-time.'
  },
  { 
    id: 3, 
    image: '/images/aquaculture.png', 
    label: 'Aquaculture Monitoring',
    title: 'Aquaculture Monitoring',
    flippingTexts: [
      'Fish Health Tracking',
      'Growth Monitoring',
      'Water Quality Control',
      'Feeding Optimization',
      'Disease Prevention',
    ],
    description: 'Comprehensive aquaculture monitoring solution for fish farms. Monitor aquatic life health, growth patterns, and water conditions with precision.'
  },
];

// --- Styled Components ---
// --- Added Overlay ---
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Black gradient fading to the right on desktop */
  background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
  z-index: 2;
  
  @media (max-width: 768px) {
    /* Light overlay on mobile */
    background: rgba(0,0,0,0.3);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: var(--color-black);
  color: var(--color-white);
  font-family: ${premiumFont};
  align-items: flex-start;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  
  @media (max-width: 480px) {
    height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
`;

// --- Carousel Styles ---
const CarouselContainer = styled.div`
  position: absolute;
  top: 0; /* Start from very top on mobile to show full image */
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
  }
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: var(--color-dark-grey);
  
  @media (max-width: 768px) {
    /* Ensure full width coverage on mobile */
    width: 100vw;
    min-width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    background-size: cover; /* changed from contain to cover */
    background-position: center center;
    min-height: 100vh;
    /* Force background to cover entire width */
    background-attachment: local;
  }
  
  @media (max-width: 480px) {
    width: 100vw;
    min-width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    background-size: cover; /* changed from contain to cover */
    background-position: center center;
    min-height: 100vh;
    background-attachment: local;
  }
`;

// --- Updated Progress Bar Container ---
const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 60px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 4rem;
  box-sizing: border-box;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    bottom: 200px; /* Move up to accommodate text below */
    width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    bottom: 180px; /* Adjust for mobile text space */
    width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
  }
`;

// --- Label for Progress Bars ---
const ProgressLabel = styled.div`
  color: var(--color-white);
  font-size: 0.85rem;
  margin-bottom: 8px;
  text-align: center;
  font-family: ${premiumFont};
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 5px;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  
  @media (max-width: 480px) {
    min-width: 80px;
  }
`;

// --- Updated Progress Bar Style (More prominent and bright) ---
const ProgressBar = styled.div`
  width: 120px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 480px) {
    width: 80px;
    height: 4px;
  }
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #ff6b35, #ff8c42, #ffa726);
  transition: width 0.1s linear;
  border-radius: 3px;
  box-shadow: 
    0 0 15px rgba(255, 107, 53, 0.6),
    0 0 25px rgba(255, 107, 53, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: left;
  max-width: 900px;
  margin: 0;
  padding: 4rem 0 0 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: var(--color-white);
  font-family: ${premiumFont};
  align-items: flex-start;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    /* Position text right below navbar on mobile */
    position: absolute;
    top: 70px; /* Right below navbar */
    left: 0;
    right: 0;
    width: 100vw;
    max-width: 100vw;
    height: auto;
    padding: 2rem 1.5rem 0 1.5rem;
    margin: 0;
    justify-content: flex-start;
    text-align: left;
    align-items: flex-start;
    background: none;
    backdrop-filter: none;
    box-sizing: border-box;
  }
  
  @media (max-width: 480px) {
    top: 70px; /* Right below navbar */
    padding: 1.5rem 1rem 0 1rem;
    text-align: left;
    align-items: flex-start;
    width: 100vw;
    max-width: 100vw;
    box-sizing: border-box;
  }
`;

// --- Gradient Title ---
const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg,rgb(247, 79, 79),rgb(243, 33, 33), #00bcd4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  z-index: 2;
  font-weight: 400;
  line-height: 1.1;
  padding: 0;
  font-family: ${premiumFont};
  text-align: left;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 0.6rem;
    text-align: left;
    line-height: 1.2;
    /* Add stronger shadow for mobile visibility */
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
  }
  
  @media (max-width: 480px) {
    font-size: 1.9rem;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    text-align: left;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
  }
`;

const FlippingTextContainer = styled.div`
  position: relative;
  z-index: 2;
  height: 3.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.2rem;
  font-family: ${premiumFont};
  text-align: left;
  width: 100%;
  
  @media (max-width: 768px) {
    height: 2.6rem;
    justify-content: flex-start;
    text-align: left;
    margin-bottom: 1rem;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    height: 2.2rem;
    margin-bottom: 0.8rem;
    justify-content: flex-start;
    text-align: left;
    width: 100%;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: auto;
  color: var(--color-accent);
  max-width: 600px;
  font-family: ${premiumFont};
  text-align: left;
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin: 0 0 1rem 0;
    text-align: left;
    max-width: 100%;
    /* Better text visibility on mobile */
    text-shadow: 0 1px 5px rgba(0,0,0,0.9);
    font-weight: 500;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin: 0 0 0.8rem 0;
    text-align: left;
    max-width: 100%;
    line-height: 1.4;
    text-shadow: 0 1px 5px rgba(0,0,0,0.9);
    font-weight: 500;
    width: 100%;
  }
`;

const phoneGreenhouseBg = '/images/phgreen.avif';
const phoneAquacultureBg = '/images/phaqua.avif';


function HeroSectionComponent() {
  // --- Carousel State ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  // Flipping text state
  const [flippingTextIndex, setFlippingTextIndex] = useState(0);

  // Get current slide data
  const currentSlide = carouselSlides[currentSlideIndex];
  const currentFlippingText = currentSlide.flippingTexts[flippingTextIndex];

  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkPhone = () => {
      setIsPhone(window.innerWidth <= 768);
    };
    checkPhone();
    window.addEventListener('resize', checkPhone);
    return () => window.removeEventListener('resize', checkPhone);
  }, []);

  let backgroundImage;
  if (currentSlide.label === 'Smart Agriculture') {
    backgroundImage = isPhone ? phoneGreenhouseBg : currentSlide.image;
  } else if (currentSlide.label === 'Aquaculture Monitoring') {
    backgroundImage = isPhone ? phoneAquacultureBg : currentSlide.image;
  } else {
    backgroundImage = currentSlide.image;
  }

  // --- Carousel Effect (Updated to 5 seconds) ---
  useEffect(() => {
    const startProgress = () => {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
             // Move to next slide
             setCurrentSlideIndex(prevIndex => (prevIndex + 1) % carouselSlides.length);
             return 0; // Reset progress for next slide
          }
          // Increment for 5 seconds (5000ms / 100ms interval = 50 increments)
          return prev + (100 / 50);
        });
      }, 100); // Update progress every 100ms
    };

    startProgress();

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []); // Run only once on mount

  // Flipping text effect (Updated to 3 seconds)
  useEffect(() => {
    // Reset flipping text index when slide changes
    setFlippingTextIndex(0);
    
    // Change text every 3 seconds within the current slide
    const intervalId = setInterval(() => {
      setFlippingTextIndex(prevIndex => 
        (prevIndex + 1) % currentSlide.flippingTexts.length
      );
    }, 3000); // Changed to 3 seconds
    
    return () => clearInterval(intervalId);
  }, [currentSlideIndex, currentSlide.flippingTexts.length]);

  return (
    <HeroSection>
       {/* --- Overlay --- */}
       <HeroOverlay />
       
       {/* --- Carousel --- */}
       <CarouselContainer>
         <AnimatePresence initial={false}>
           <CarouselSlide
             key={currentSlide.id}
             image={backgroundImage} // <-- Pass only the path, not url(...)
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8 }}
           />
         </AnimatePresence>
         
         {/* --- Updated Progress Bars --- */}
         <ProgressBarContainer>
           {carouselSlides.map((slide, idx) => (
             <ProgressBarWrapper key={slide.id}>
               <ProgressLabel>{slide.label}</ProgressLabel>
               <ProgressBar>
                 <ProgressBarFill
                   progress={
                     idx === currentSlideIndex 
                       ? progress 
                       : 0 // Always empty except current slide
                   }
                 />
               </ProgressBar>
             </ProgressBarWrapper>
           ))}
         </ProgressBarContainer>
       </CarouselContainer>
       {/* --- End Carousel --- */}

      <HeroContent
        key={currentSlideIndex} // Re-animate when slide changes
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* --- Dynamic Title based on current slide --- */}
        <HeroTitle>{currentSlide.title}</HeroTitle>
        <FlippingTextContainer>
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentFlippingText}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                display: 'inline-block',
                background: 'none',
                color: 'var(--color-accent)',
                WebkitBackgroundClip: 'unset',
                WebkitTextFillColor: 'unset',
                margin: 0,
                fontSize: window.innerWidth <= 480 ? '1.2rem' : window.innerWidth <= 768 ? '1.4rem' : '1.6rem',
                textAlign: 'left',
                width: '100%',
                fontWeight: 400,
                fontFamily: premiumFont,
                letterSpacing: '-0.5px',
                textShadow: '0 1px 5px rgba(0,0,0,0.9)',
              }}
            >
              {currentFlippingText}
            </motion.h2>
          </AnimatePresence>
        </FlippingTextContainer>
        {/* --- Dynamic Description based on current slide --- */}
        <HeroDescription>
          {currentSlide.description}
        </HeroDescription>
      </HeroContent>
    </HeroSection>
  );
}

export default HeroSectionComponent;
