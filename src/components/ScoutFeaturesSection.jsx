import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';
import RoboticReveal from './common/RoboticReveal';

const ScoutFeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: #000000;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  overflow: hidden;
`;

const ScoutFeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ScoutFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  border: 1px solid rgba(255, 77, 77, 0.2);
  background: #050505;
  cursor: pointer;

  @media (max-width: 768px) {
    aspect-ratio: 16 / 9;
  }

  &:hover {
    .hud-overlay {
      opacity: 1;
    }
    img {
      transform: scale(1.05);
      filter: brightness(0.4) saturate(0.5);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  filter: brightness(0.6);
`;

const HUDOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  z-index: 2;
  pointer-events: none;
`;

const HUDCorner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #ff4d4d;
  ${props => props.top && 'top: 10px;'}
  ${props => props.bottom && 'bottom: 10px;'}
  ${props => props.left && 'left: 10px; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: 10px; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const CardTitle = styled.h3`
  font-size: 0.85rem;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 3;
  position: relative;
`;

const Scanline = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 77, 77, 0.5);
  z-index: 4;
`;

const features = [
  { image: '/images/batteryswap.webp', title: 'Battery Swapping' },
  { image: '/images/landing.webp', title: 'Precision Auto-Landing' },
  { image: '/images/timing.png', title: '50 Min Flight Time' },
  { image: '/images/cameraview.webp', title: '4K & Thermal Vision' },
  { image: '/images/payload.webp', title: '3 KG Payload Capacity' },
];

const SectionTitleHeader = styled(motion.h2)`
  font-size: clamp(1.8rem, 5vw, 4rem);
  color: #fff;
  letter-spacing: 8px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 3px;
    white-space: normal;
  }
`;

function ScoutFeaturesSectionComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ScoutFeaturesSection>
      <ScoutFeaturesContainer>
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '0' }}>
          <SectionTitleHeader
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <RoboticReveal text="MISSION CAPABILITIES" />
          </SectionTitleHeader>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255, 255, 255, 0.45)', marginTop: '0.8rem', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}
          >
            Engineered for reliability in extreme conditions.
          </motion.p>
        </div>

        <ScoutFeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <HUDOverlay className="hud-overlay">
                <HUDCorner top left />
                <HUDCorner top right />
                <HUDCorner bottom left />
                <HUDCorner bottom right />
                <CardTitle>{feature.title}</CardTitle>
                <div style={{ fontSize: '0.7rem', color: '#ff4d4d' }}>
                  STATUS: OPTIMAL<br />
                  LINK_ESTABLISHED
                </div>
              </HUDOverlay>
              <CardImage src={feature.image} alt={feature.title} />
              <Scanline 
                animate={{ top: ['0%', '100%'] }} 
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </FeatureCard>
          ))}
        </ScoutFeaturesGrid>
      </ScoutFeaturesContainer>
    </ScoutFeaturesSection>
  );
}

export default ScoutFeaturesSectionComponent;