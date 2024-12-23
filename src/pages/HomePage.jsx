import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Slideshow from '../components/common/Slideshow';
import { useState, useEffect } from 'react';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
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
    
    &[src*="drone3.jpeg"] {
      object-position: center center;
      transform: scale(1.1);
    }
    
    &[src*="drone1.webp"],
    &[src*="drone2.webp"] {
      object-position: center center;
      transform: scale(1.02);
    }
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
  text-align: left;
  max-width: 1200px;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
  margin-top: -10vh;
`;

const HeroTitle = styled.h1`
  font-size: 3.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  letter-spacing: -0.5px;
  
  span {
    display: block;
    font-size: 3.2rem;
    font-weight: 400;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, 
      rgba(255, 59, 48, 0.9),
      rgba(10, 132, 255, 0.9)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.95;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  max-width: 600px;
`;

const DroneImageStrip = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const DroneImageContainer = styled(motion.div)`
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`;

const UseCasesSection = styled.section`
  padding: 6rem 2rem;
  background: var(--light);
`;

const UseCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const UseCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
`;

const SlideShowSection = styled.section`
  padding: 4rem 2rem;
  background: var(--light);
  
  .slideshow-wrapper {
    max-width: 1200px;
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
`;

const droneImages = [
  '/images/drone1.webp',
  '/images/drone2.webp',
  '/images/drone3.jpeg'
];

const droneCaptions = [
  'Advanced firefighting drone in action',
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

function HomePage() {
  const [currentBg, setCurrentBg] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % droneImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <HeroSection>
        <BackgroundImages>
          {droneImages.map((image, index) => (
            <BackgroundImage
              key={index}
              variants={backgroundVariants}
              initial="initial"
              animate={currentBg === index ? "animate" : "initial"}
            >
              <img src={image} alt={`Drone background ${index + 1}`} />
            </BackgroundImage>
          ))}
        </BackgroundImages>

        <HeroContent
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroTitle>
            Innovating Safety,
            <span>Transforming Response</span>
          </HeroTitle>
          <HeroDescription>
            Experience the next generation of emergency solutions. Our advanced drone technology 
            is designed to tackle the toughest challenges in firefighting and security, 
            delivering unmatched efficiency, precision, and reliability when it matters most.
          </HeroDescription>
          <TagLine>Stay Ahead. Stay Safe.</TagLine>
          <CTAButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            as={Link}
            to="/products"
          >
            Explore Solutions
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <SlideShowSection>
          <div className="slideshow-wrapper">
            <Slideshow images={droneImages} captions={droneCaptions} />
          </div>
        </SlideShowSection>
      </Section>

      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <UseCasesSection>
          <UseCasesGrid>
            <UseCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>Firefighting</h3>
              <p>Artemis drones provide real-time aerial views, deploy fire suppressants, and access hard-to-reach areas during emergencies.</p>
            </UseCard>
            <UseCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Security</h3>
              <p>Equipped with night vision and AI-powered threat detection, our drones ensure 24/7 perimeter surveillance and quick response.</p>
            </UseCard>
          </UseCasesGrid>
        </UseCasesSection>
      </Section>
    </>
  );
}

export default HomePage; 