import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaChargingStation, FaCloudSunRain, FaWifi, FaBolt, FaPlaneArrival } from 'react-icons/fa';
import RoboticReveal from './common/RoboticReveal';

// ─── Styled Components ───────────────────────────────────────────────────────

const SectionWrapper = styled.section`
  background-color: #fff;
  color: #111;
  padding: 8rem 2rem;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  overflow: hidden;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

/* 3-col grid: left features | image | right features */
const Layout = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  align-items: center;
  gap: 0;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 3.5rem;
  }
`;

const FeatureCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    order: 2;
  }
`;

// ─── Styled Components ───────────────────────────────────────────────────────

const FeatureDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff4d4d;
  flex-shrink: 0;
  box-shadow: 0 0 8px #ff4d4d;
  @media (max-width: 900px) {
    display: none;
  }
`;

const FeatureLine = styled.div`
  height: 3px;
  width: 144px;
  background: linear-gradient(
    to left,
    #ff4d4d 0%,
    rgba(255, 77, 77, 0.1) 100%
  );
  flex-shrink: 0;
  transition: all 0.4s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: #ff4d4d;
    border-radius: 50%;
    box-shadow: 0 0 12px #ff4d4d;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const FeatureLabel = styled.div`
  background: #111;
  border: 1px solid rgba(255, 77, 77, 0.4);
  padding: 0.85rem 1.7rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  @media (max-width: 900px) {
    width: 300px;
    justify-content: center;
  }
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 77, 77, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  svg {
    color: #ff4d4d;
    font-size: 1rem;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
`;

/* We need to redefine FeatureItem after FeatureLabel/Dot/Line to use them in nesting */
const EnhancedFeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  ${props => props.reverse ? 'flex-direction: row-reverse;' : ''}
  cursor: pointer;

  &:hover {
    ${FeatureLabel} {
      transform: scale(1.1) translateX(${props => props.reverse ? '-10px' : '10px'});
      border-color: #ff4d4d;
      box-shadow: 0 10px 40px rgba(255, 77, 77, 0.2);
      background: #1a1a1a;

      &::before {
        left: 100%;
      }

      svg {
        transform: scale(1.2) rotate(10deg);
      }
    }

    ${FeatureDot} {
      box-shadow: 0 0 15px 4px #ff4d4d;
      transform: scale(1.4);
    }

    ${FeatureLine} {
      width: 160px;
      opacity: 1;
      height: 3px;
      background: linear-gradient(
        to left,
        #ff4d4d 40%,
        rgba(255, 77, 77, 0.4) 100%
      );
    }
  }

  @media (max-width: 900px) {
    flex-direction: row !important;
    &:hover ${FeatureLabel} {
        transform: scale(1.05);
    }
  }
`;

const BoxImageCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    order: 1;
  }
`;

const BoxImg = styled(motion.img)`
  width: 936px;
  max-width: 130vw;
  height: auto;
  filter: drop-shadow(0 20px 60px rgba(0,0,0,0.25));
  display: block;
  z-index: 1;
  
  @media (max-width: 1200px) {
    width: 650px;
  }
  
  @media (max-width: 900px) {
    width: 90%;
    margin-bottom: 2rem;
  }
`;

const Caption = styled(motion.p)`
  text-align: center;
  margin-top: 4rem;
  color: rgba(0, 0, 0, 0.35);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  { text: 'Autonomous Landing', icon: <FaPlaneArrival /> },
  { text: 'Auto-Charging System', icon: <FaChargingStation /> },
  { text: 'Grid Independent', icon: <FaBolt /> },
  { text: 'Weather Proof Design', icon: <FaCloudSunRain /> },
  { text: 'Global Connectivity', icon: <FaWifi /> },
];

// ─── Variants ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -80, filter: 'blur(15px)' },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};


// ─── Component ───────────────────────────────────────────────────────────────

export default function TheBoxSectionComponent() {
  return (
    <SectionWrapper>
      <GridOverlay />
      <Inner>
        {/* Title */}
        <SectionTitle>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(1.8rem, 8vw, 4.8rem)',
              margin: 0,
              letterSpacing: 'clamp(4px, 2vw, 12px)',
              color: '#111',
              textTransform: 'uppercase',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}
          >
            <RoboticReveal text="DRONE-IN-A-BOX" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              color: '#ff4d4d',
              fontSize: '1.2rem',
              letterSpacing: '5px',
              marginTop: '1.2rem',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Persistent Surveillance. Zero Crew.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              color: 'rgba(0,0,0,0.65)',
              fontSize: '1.1rem',
              letterSpacing: '0.5px',
              marginTop: '1.2rem',
              maxWidth: '800px',
              margin: '1.2rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Autonomous takeoff, mission execution, landing, and recharge — from a single weatherproof ground station. Always on. Always ready.
          </motion.p>
        </SectionTitle>

        {/* Layout */}
        <Layout>
          {/* Features Column — all on the left */}
            <FeatureCol>
              {features.map((f, i) => (
                <EnhancedFeatureItem 
                  key={i} 
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <FeatureLabel>
                    {f.icon}
                    {f.text}
                  </FeatureLabel>
                  <FeatureLine />
                  <FeatureDot />
                </EnhancedFeatureItem>
              ))}
            </FeatureCol>

          {/* Box image — on the right */}
          <BoxImageCol>
            <BoxImg
              src="/images/thebox.png"
              alt="The Box — Artemis Drone Station"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </BoxImageCol>
        </Layout>

        {/* Caption removed */}
      </Inner>
    </SectionWrapper>
  );
}
