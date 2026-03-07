import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';

// SECTION — Dark background with animated gradient
const ScoutFeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: #000000;
  color: var(--color-white);
  font-family: var(--font-primary);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(20, 20, 20, 1) 0%, rgba(0, 0, 0, 1) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

// CONTAINER
const ScoutFeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// GRID
const ScoutFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 350px);
  gap: 1.5rem;
  
  /* Make the first two items span 2 columns if we wanted a bento box, 
     but for 5 items, a customized layout works best.
     Let's do a 3-column top row, 2-column bottom row style or similar.
  */
  
  /* Custom Grid Layout for 5 items:
     Row 1: 3 items (1fr 1fr 1fr)
     Row 2: 2 items (span 1.5 each or centered)
  */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 400px 400px;
    
    /* Item 1: Battery Swapping (Large Left) */
    & > :nth-of-type(1) { grid-column: span 2; }
    /* Item 2: Auto Landing (Large Center) */
    & > :nth-of-type(2) { grid-column: span 2; }
    /* Item 3: Flight Time (Large Right) */
    & > :nth-of-type(3) { grid-column: span 2; }
    
    /* Item 4: Cameras (Wide Left) */
    & > :nth-of-type(4) { grid-column: span 3; }
    /* Item 5: Payload (Wide Right) */
    & > :nth-of-type(5) { grid-column: span 3; }
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    
    /* First item spans full width on tablet vertical */
    & > :nth-of-type(1) { grid-column: span 2; }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 300px;
    
    & > * { grid-column: span 1 !important; }
  }
`;

// FEATURE CARD - Image Based
const FeatureCard = styled(motion.div)`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  background-color: #111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
  group: hover;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.3);
    
    img {
      transform: scale(1.05);
    }
    
    .overlay {
      background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  transition: background 0.4s ease;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #d1d5db;
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  max-width: 90%;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Section title
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 4rem;
  color: #fff;
  letter-spacing: -1px;
  
  span {
    background: linear-gradient(90deg, #ff4d4d, #ff8c42);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 2.5rem;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
};

// Features data with mapped images
// Using dummy drone images as requested to replace icons
const features = [
  {
    image: '/images/batteryswap.webp',
    title: 'Battery Swapping',
  },
  {
    image: '/images/landing.webp',
    title: 'Precision Auto-Landing',
  },
  {
    image: '/images/timing.png',
    title: '50 Min Flight Time',
  },
  {
    image: '/images/cameraview.webp',
    title: '4K & Thermal Vision',
  },
  {
    image: '/images/payload.webp',
    title: 'Upto 3kg* Payload Capacity',
  },
];

function ScoutFeaturesSectionComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ScoutFeaturesSection aria-labelledby="features-heading">
      <ScoutFeaturesContainer>
        <SectionTitle
          id="features-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Engineered for <span>Mission Success</span>
        </SectionTitle>

        <ScoutFeaturesGrid
          as={motion.div}
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            >
              <CardImage src={feature.image} alt={feature.title} loading="lazy" />
              <ContentOverlay className="overlay">
                <CardTitle>{feature.title}</CardTitle>
              </ContentOverlay>
            </FeatureCard>
          ))}
        </ScoutFeaturesGrid>
      </ScoutFeaturesContainer>
    </ScoutFeaturesSection>
  );
}

export default ScoutFeaturesSectionComponent;
