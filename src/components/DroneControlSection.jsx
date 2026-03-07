import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGamepad, FaVideo, FaLayerGroup, FaShieldAlt, FaCogs } from 'react-icons/fa';

// SECTION
const DroneControlSection = styled.section`
  padding: 8rem 2rem;
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #ffffff;
  font-family: var(--font-primary);
  overflow: hidden;
  position: relative;

  & > * {
    position: relative;
    z-index: 1;
  }
`;

// HEADER
const SectionHeader = styled.div`
  max-width: 1300px;
  margin: 0 auto 4rem auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -3px;
  
  span {
    color: #ff4d4d; /* Changed to red for better contrast on dark bg */
  }

  @media (max-width: 900px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 auto;
  max-width: 800px;
  line-height: 1.6;
  font-weight: 300;
`;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; /* Image on left, content on right */
  align-items: center;
  position: relative;
  z-index: 1;
  gap: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

// LEFT SIDE: IMAGE
const ImageSide = styled(motion.div)`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  perspective: 1000px;

  @media (max-width: 900px) {
    height: 400px;
    width: 100%;
    justify-content: center;
    order: 2; /* Move image below text on mobile */
  }
`;

const PlatformImage = styled(motion.img)`
  width: 100%;
  max-width: 850px;
  object-fit: contain;
  filter: drop-shadow(0 30px 60px rgba(0,0,0,0.15));
  z-index: 2;
  border-radius: 20px;
`;

const CircleGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`;

// RIGHT SIDE: FEATURE LIST
const ContentSide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; 
  padding-left: 2rem;
  
  @media (max-width: 900px) {
    align-items: flex-start;
    padding: 0 1.5rem;
    order: 1;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
`;

const FeatureItem = styled(motion.div)`
  font-size: 1.6rem;
  font-weight: 300;
  color: #ffffff; 
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff4d4d;
    transform: translateX(10px);
  }

  @media (max-width: 900px) {
    font-size: 1.25rem;
    justify-content: flex-start;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    width: 100%;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d4d;
  font-size: 1.6rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  width: 48px;
  height: 48px;
  min-width: 48px; /* Ensure it stays square */
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

function DroneControlSectionComponent() {
  const features = [
    { text: "Drone auto/ manual control", icon: <FaGamepad /> },
    { text: "Live drone footage with AI detection", icon: <FaVideo /> },
    { text: "Multiple drone controls", icon: <FaLayerGroup /> },
    { text: "Full privacy", icon: <FaShieldAlt /> },
    { text: "Customizable interface", icon: <FaCogs /> }
  ];

  return (
    <DroneControlSection>
      <SectionHeader>
        <Title
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Drone Control <span>Platform</span>
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Master the skies with our advanced command center. Intuitive, powerful, and built for professionals.
        </Subtitle>
      </SectionHeader>

      <Container>
        <ImageSide
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CircleGlow />
          <PlatformImage
            src="/images/ui.webp"
            alt="Drone Control Platform Interface"
          />
        </ImageSide>

        <ContentSide
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FeaturesList>
            {features.map((item, index) => (
              <FeatureItem
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <IconWrapper>{item.icon}</IconWrapper>
                {item.text}
              </FeatureItem>
            ))}
          </FeaturesList>
        </ContentSide>
      </Container>
    </DroneControlSection>
  );
}

export default DroneControlSectionComponent;
