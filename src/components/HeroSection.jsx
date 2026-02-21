import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const premiumFont = "'Montserrat', sans-serif";

const carouselSlides = [
  {
    id: 1,
    image: '/images/DFR.png',
  },
  {
    id: 2,
    image: '/images/military.png',
  },
  {
    id: 3,
    image: '/images/longrange.png',
  },
];

const rotatingWords = ['Security', 'Military', 'Surveillance', 'First Responder', 'Independent', 'Long-range'];

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5));
  
  @media (max-width: 768px) {
    background: rgba(0,0,0,0.4);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: #000;
  color: #ffffff;
  font-family: ${premiumFont};
  align-items: flex-start;
  justify-content: flex-start;
`;

const CarouselContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: left;
  max-width: 1000px;
  margin: 0;
  padding: 6rem 0 0 6rem;
  padding-top: calc(6rem - 5px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #ffffff;
  font-family: ${premiumFont};
  align-items: flex-start;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 65px;
    left: 0;
    right: 0;
    width: 100vw;
    padding: 2rem 1.5rem 0 1.5rem;
    box-sizing: border-box;
  }
`;

const IntroText = styled(motion.h2)`
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.2;
  font-family: ${premiumFont};
  text-align: left;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const RotatingTextContainer = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: bottom;
  height: 1.25em; /* Slightly increased for better fitting */
`;

const RotatingWord = styled(motion.span)`
  display: inline-block;
  white-space: nowrap;
  color: #ff4d4d;
  font-weight: 600;
`;

const PublicSafetyTagline = styled(motion.p)`
  font-size: 1.2rem; /* Slighting reduced for better hierarchy */
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    letter-spacing: 2px;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

function HeroSectionComponent() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  const currentSlide = carouselSlides[currentSlideIndex];
  const backgroundImage = currentSlide.image;
  const currentWord = rotatingWords[currentWordIndex];

  // Auto-advance slides every 6 seconds for a slower, more minimalistic pace
  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlideIndex(prevIndex => (prevIndex + 1) % carouselSlides.length);
    }, 6000);

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, []);

  // Rotate words every 3 seconds
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(prevIndex => (prevIndex + 1) % rotatingWords.length);
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <HeroSection>
      <HeroOverlay />

      <CarouselContainer>
        <AnimatePresence mode="wait">
          <CarouselSlide
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </AnimatePresence>
      </CarouselContainer>

      <HeroContent
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.5
            }
          }
        }}
      >
        <IntroText
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <motion.div style={{ display: 'inline-block' }} layout transition={{ duration: 0.6, ease: "easeInOut" }}>
            Welcome to the era of<br />
            AI-powered{' '}
            <AnimatePresence mode="wait">
              <RotatingWord
                key={currentWord}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                layout
              >
                {currentWord}
              </RotatingWord>
            </AnimatePresence>
            {' '}drones
          </motion.div>
        </IntroText>

        <PublicSafetyTagline
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.8 } }
          }}
        >
          technology in the service of public safety
        </PublicSafetyTagline>

        <HeroDescription
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
        >
          Zero human intervention. Revolutionizing surveillance and monitoring with fully autonomous AI-powered drones. Experience unparalleled security and efficiency.
        </HeroDescription>
      </HeroContent>
    </HeroSection>
  );
}

export default HeroSectionComponent;