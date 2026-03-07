import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaChargingStation, FaCloudSunRain, FaWifi, FaBolt, FaPlaneArrival } from 'react-icons/fa';

// SECTION
const TheBoxSection = styled.section`
  padding: 2rem 2rem 2rem 2rem; /* Reduced top padding to move closer to header */
  background-color: #ffffff;
  color: #1e293b;
  font-family: var(--font-primary);
  overflow: hidden;
  position: relative;
`;

// HEADER
const SectionHeader = styled.div`
  max-width: 1300px;
  margin: 0 auto 0 auto; /* Removed bottom margin */
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 5rem; /* Reduced size as requested (was 8rem) */
  font-weight: 800;
  margin-bottom: 0rem;
  line-height: 1;
  color: #0f172a;
  letter-spacing: -3px;
  
  span {
    color: #ff4d4d;
  }

  @media (max-width: 900px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #64748b;
  margin: 0 auto;
  max-width: 800px;
  line-height: 1.6;
  font-weight: 300;
  margin-bottom: 0rem; /* Minimal gap */
`;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: start; /* Changed from center to start to pull content up */
  position: relative;
  z-index: 1;
  gap: 0rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

// LEFT SIDE: CIRCULAR FEATURE LIST
const ContentSide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure top alignment */
  align-items: flex-end; 
  padding-right: 2rem;
  padding-top: 2rem; /* Minor spacing from header */
  
  background: transparent;
  border: none;
  
  @media (max-width: 900px) {
    align-items: center;
    padding: 0;
  }
`;

const FeaturesArc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  perspective: 1000px;
  padding-left: 1rem;
  /* Ensure it doesn't get too wide */
  width: fit-content;
`;

// Circular list item
const FeatureItem = styled(motion.div)`
  font-size: 1.4rem;
  font-weight: 300; /* Minimalistic / Light */
  color: #475569; 
  white-space: nowrap;  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: fit-content;
  background: transparent; 
  padding: 0.5rem 1rem;
  border-radius: 12px;

  /* Align icon and text properly */
  
  &:hover {
    color: #0f172a;
    font-weight: 400; /* Subtle bold on hover */
    transform: translateX(15px) !important; 
    text-shadow: 0 0 30px rgba(255, 77, 77, 0.2);
  }

  @media (max-width: 900px) {
    font-size: 1.25rem;
    margin: 0 !important; /* Force linear alignment */
    justify-content: flex-start;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.03); /* Subtle bg for mobile list items */
    width: 100%;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d4d;
  font-size: 1.4rem;
  background: rgba(255, 77, 77, 0.1);
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(255, 77, 77, 0.1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

// RIGHT SIDE: IMAGE
const ImageSide = styled(motion.div)`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align image closer to text */
  margin-left: -2rem; /* Pull image slightly left to reduce gap */
  perspective: 1000px;

  @media (max-width: 900px) {
    height: 400px;
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }
`;

// Stable image - No float animation
const BoxImage = styled(motion.img)`
  width: 100%;
  max-width: 800px; /* Large image */
  object-fit: contain;
  filter: drop-shadow(0 30px 60px rgba(0,0,0,0.1));
  z-index: 2;
`;

const CircleGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; /* Bigger glow */
  height: 600px;
  background: radial-gradient(circle, rgba(255, 77, 77, 0.05) 0%, transparent 60%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`;

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    y: -50,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

function TheBoxSectionComponent() {
  const features = [
    { text: "Autonomous Landing", icon: <FaPlaneArrival /> },
    { text: "Weather Proof Design", icon: <FaCloudSunRain /> },
    { text: "Auto-Charging System", icon: <FaChargingStation /> },
    { text: "Grid Independent", icon: <FaBolt /> },
    { text: "Global Connectivity", icon: <FaWifi /> }
  ];

  return (
    <TheBoxSection>
      <SectionHeader>
        <Title
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The <span>Box</span>
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          The ultimate drone nesting station. Automated, resilient, and always ready to launch.
        </Subtitle>
      </SectionHeader>

      <Container>
        <ContentSide
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FeaturesArc>
            {features.map((item, index) => {
              // Concave Arc Logic (Curving inward to left)
              // Mid item (index 2) is furthest LEFT (smallest margin).
              // Outer items (0, 4) are furthest RIGHT (largest margin).
              const mid = 2;
              // Reduce offset slightly to make it tighter
              const offset = Math.abs(index - mid) * 30;

              return (
                <FeatureItem
                  key={index}
                  variants={itemVariants}
                  style={{ marginLeft: `${offset}px` }}
                  whileHover={{ scale: 1.05, originX: 0 }}
                >
                  <IconWrapper>{item.icon}</IconWrapper>
                  {item.text}
                </FeatureItem>
              );
            })}
          </FeaturesArc>
        </ContentSide>

        <ImageSide
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CircleGlow />
          {/* Confirmed using thebox.png */}
          <BoxImage
            src="/images/thebox.png"
            alt="The Box - Autonomous Drone Nest"
          />
        </ImageSide>
      </Container>
    </TheBoxSection>
  );
}

export default TheBoxSectionComponent;
