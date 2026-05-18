import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGamepad, FaVideo, FaLayerGroup, FaShieldAlt, FaCogs } from 'react-icons/fa';
import RoboticReveal from './common/RoboticReveal';

const SectionWrapper = styled.section`
  padding: 8rem 2rem;
  background-image: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  overflow: hidden;
`;

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 3;
`;

const UIWindow = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  aspect-ratio: 16 / 10;
`;

const PlatformImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  filter: saturate(0.8) contrast(1.1) brightness(0.9);
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 77, 77, 0.5);
    background: rgba(255, 77, 77, 0.05);
    transform: translateX(10px);
  }
`;

const IconBox = styled.div`
  color: #ff4d4d;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(255, 77, 77, 0.1) 1px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 1;
`;

const features = [
  { text: "Autonomous Fleet Management", icon: <FaLayerGroup /> },
  { text: "Live Video Streams", icon: <FaVideo /> },
  { text: "Manual Override", icon: <FaGamepad /> },
  { text: "End-to-End Encryption", icon: <FaShieldAlt /> },
  { text: "Modular Architecture", icon: <FaCogs /> }
];

export default function DroneControlSectionComponent() {
  return (
    <SectionWrapper>
      <SectionHeader>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: '1rem',
            letterSpacing: '8px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
        <RoboticReveal text="COMMAND INTERFACE" />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ color: '#ff4d4d', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '0.6rem', fontWeight: 700 }}
        >
          Unified Fleet Control. Real-Time Intelligence.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', letterSpacing: '0.5px', maxWidth: '500px', margin: '1rem auto 0', lineHeight: 1.7 }}
        >
          Manage multiple platforms from a single interface. Full situational awareness, encrypted feeds, and manual override when needed.
        </motion.p>
      </SectionHeader>

      <DashboardContainer>
        <UIWindow
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <PlatformImage src="/images/ui.webp" alt="Artemis Control Platform" />

          {/* HUD overlay tint */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,77,77,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />
        </UIWindow>

        <div>
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <IconBox>{feature.icon}</IconBox>
                <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>{feature.text}</span>
              </FeatureItem>
            ))}
          </FeatureList>
        </div>
      </DashboardContainer>
    </SectionWrapper>
  );
}

