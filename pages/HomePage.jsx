import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;

function HomePage() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <HeroSection>
        <HeroVideo autoPlay muted loop>
          <source src="/videos/drone-hero.mp4" type="video/mp4" />
        </HeroVideo>
        <HeroContent
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1>Next-Generation Firefighting & Security Drones</h1>
          <p>Protecting lives and property with advanced aerial technology</p>
        </HeroContent>
      </HeroSection>
      {/* Add more sections here */}
    </>
  );
}

export default HomePage; 