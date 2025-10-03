import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaPlane, FaLock, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const premiumFont = "'Inter', Arial, Helvetica, sans-serif";

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

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
  z-index: 2;
  
  @media (max-width: 768px) {
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

const CarouselContainer = styled.div`
  position: absolute;
  top: 0;
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
    width: 100vw;
    min-width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    background-attachment: local;
  }
  
  @media (max-width: 480px) {
    width: 100vw;
    min-width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    background-attachment: local;
  }
`;

const NavigationArrow = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background: transparent;
  border: none;
  color: white;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  opacity: 1;   /* always visible */

  &:hover {
    svg {
      color: rgba(255, 107, 53, 1);
      filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.8));
      transform: scale(1.2);
    }
  }
  
  &:active {
    svg {
      transform: scale(0.9);
    }
  }
  
  svg {
    width: 40px;
    height: 40px;
    pointer-events: none;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }


  
  &:active {
    svg {
      transform: scale(0.9);
    }
  }
  
  svg {
    width: 40px;
    height: 40px;
    pointer-events: none;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const LeftArrow = styled(NavigationArrow)`
  left: 0.1rem;
  
  @media (max-width: 768px) {
    left: 1rem;
  }
  
  @media (max-width: 480px) {
    left: 0.5rem;
  }
`;

const RightArrow = styled(NavigationArrow)`
  right: 0.1rem;
  
  @media (max-width: 768px) {
    right: 1rem;
  }
  
  @media (max-width: 480px) {
    right: 0.5rem;
  }
`;

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
    bottom: 200px;
    width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    bottom: 180px;
    width: 100vw;
    left: 0;
    right: 0;
    margin: 0;
  }
`;

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
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 480px) {
    min-width: 80px;
  }
`;

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
    position: absolute;
    top: 70px;
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
    top: 70px;
    padding: 1.5rem 1rem 0 1rem;
    text-align: left;
    align-items: flex-start;
    width: 100vw;
    max-width: 100vw;
    box-sizing: border-box;
  }
`;

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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);
  const [flippingTextIndex, setFlippingTextIndex] = useState(0);
  const [isPhone, setIsPhone] = useState(false);

  const currentSlide = carouselSlides[currentSlideIndex];
  const currentFlippingText = currentSlide.flippingTexts[flippingTextIndex];

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

  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const goToPrevSlide = () => {
    const newIndex = currentSlideIndex === 0 
      ? carouselSlides.length - 1 
      : currentSlideIndex - 1;
    goToSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlideIndex + 1) % carouselSlides.length;
    goToSlide(newIndex);
  };

  useEffect(() => {
    const startProgress = () => {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentSlideIndex(prevIndex => (prevIndex + 1) % carouselSlides.length);
            return 0;
          }
          return prev + (100 / 50);
        });
      }, 100);
    };

    startProgress();

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setFlippingTextIndex(0);
    
    const intervalId = setInterval(() => {
      setFlippingTextIndex(prevIndex => 
        (prevIndex + 1) % currentSlide.flippingTexts.length
      );
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [currentSlideIndex, currentSlide.flippingTexts.length]);

  return (
    <HeroSection>
      <HeroOverlay />
      
      <CarouselContainer>
        <AnimatePresence initial={false}>
          <CarouselSlide
            key={currentSlide.id}
            image={backgroundImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        
        <ProgressBarContainer>
          {carouselSlides.map((slide, idx) => (
            <ProgressBarWrapper 
              key={slide.id}
              onClick={() => goToSlide(idx)}
            >
              <ProgressLabel>{slide.label}</ProgressLabel>
              <ProgressBar>
                <ProgressBarFill
                  progress={
                    idx === currentSlideIndex 
                      ? progress 
                      : 0
                  }
                />
              </ProgressBar>
            </ProgressBarWrapper>
          ))}
        </ProgressBarContainer>
      </CarouselContainer>
      
      <LeftArrow
        onClick={goToPrevSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaChevronLeft />
      </LeftArrow>
      
      <RightArrow
        onClick={goToNextSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaChevronRight />
      </RightArrow>

      <HeroContent
        key={currentSlideIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
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
        <HeroDescription>
          {currentSlide.description}
        </HeroDescription>
      </HeroContent>
    </HeroSection>
  );
}

export default HeroSectionComponent;
