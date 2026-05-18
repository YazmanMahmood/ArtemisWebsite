import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useState } from 'react';

// ─── Keyframes ───────────────────────────────────────────────────────────────

const scan = styled.div`
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
`;

// ─── Styled Components ───────────────────────────────────────────────────────

const ApplicationsContainer = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  position: relative;
  overflow-x: hidden;
  font-family: 'Share Tech Mono', monospace;
`;

const DataGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(255, 77, 77, 0.05) 1px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 1;
`;

const HeroSection = styled.section`
  padding: 160px 2rem 80px;
  text-align: center;
  position: relative;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(255, 77, 77, 0.05) 0%, transparent 100%);

  @media (max-width: 768px) {
    padding: 120px 1.5rem 40px;
  }
`;

const MissionLabel = styled(motion.div)`
  color: #ff4d4d;
  font-size: 0.9rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1;
  letter-spacing: 4px;
  text-transform: uppercase;

  span {
    color: #ff4d4d;
    text-shadow: 0 0 20px rgba(255, 77, 77, 0.5);
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.5);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  letter-spacing: 1px;
`;

const ApplicationsSection = styled.section`
  padding: 40px 2rem 100px;
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CornerBracket = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border: 1px solid rgba(255, 77, 77, 0.3);
  z-index: 5;
  transition: all 0.3s ease;

  ${props => props.top && 'top: 0;'}
  ${props => props.bottom && 'bottom: 0;'}
  ${props => props.left && 'left: 0; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: 0; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const ApplicationCard = styled(motion.div)`
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(10px);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  
  &:hover {
    border-color: rgba(255, 77, 77, 0.4);
    background: rgba(20, 20, 20, 0.8);
    transform: translateY(-5px);

    ${CornerBracket} {
      border-color: #ff4d4d;
      width: 25px;
      height: 25px;
    }

    .scan-bar {
      animation: scanline 2s linear infinite;
      opacity: 1;
    }
  }
`;

const ScanBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 77, 77, 0.5);
  box-shadow: 0 0 15px #ff4d4d;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
`;

const CardImageContainer = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 77, 77, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    filter: grayscale(0.3);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }

  ${ApplicationCard}:hover & img {
    transform: scale(1.1);
    filter: grayscale(0);
  }
`;

const CardContent = styled.div`
  padding: 1.8rem;

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .description {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    height: 4.8em;
    overflow: hidden;
  }
`;

const FeatureTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Tag = styled.span`
  font-size: 0.65rem;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 77, 77, 0.05);
  color: #ff4d4d;
  border: 1px solid rgba(255, 77, 77, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// ─── Data ───────────────────────────────────────────────────────────────────

const applications = [
  {
    id: 1,
    title: 'Long Range Surveillance',
    image: '/images/longrange.webp',
    description: 'Extended flight endurance and satellite-link capabilities for monitoring vast geographical areas and remote borders.',
    tags: ['Satellite Link', '24h Flight', 'HD Optics']
  },
  {
    id: 2,
    title: 'Convoy Surveillance',
    image: '/images/scout1.png',
    description: 'Dynamic accompaniment for mobile assets, providing real-time overhead awareness and threat detection for convoys.',
    tags: ['Mobile Tracking', 'Vibration Proof', 'Live Feed']
  },
  {
    id: 3,
    title: 'Perimeter Security',
    image: '/images/perimeter security.png',
    description: '24/7 automated patrol and boundary monitoring with instant AI-powered breach detection and response coordination.',
    tags: ['Auto-Patrol', 'Motion Sens', 'Night Vision']
  },
  {
    id: 4,
    title: 'Confidential Building Protection',
    image: '/images/ArtemisGuardian3000.jpeg',
    description: 'Discreet indoor and outdoor monitoring for high-security facilities, featuring silent operation and multi-layered sensors.',
    tags: ['Silent Mode', 'Biometrics', 'Internal Guard']
  },
  {
    id: 5,
    title: 'City Surveillance',
    image: '/images/videoblocks-surveillance-drone-camera-view-of-terrorist-squad-walking-with-weapons_rr-xaakj4_thumbnail-1080_11.png',
    description: 'Intelligent urban monitoring for public safety, traffic management, and rapid incident response in dense environments.',
    tags: ['AI Crowd Scan', 'Traffic Opt', 'Public Safety']
  },
  {
    id: 6,
    title: 'Payload Dropping',
    image: '/images/payloaddropping.png',
    description: 'Precision delivery system for critical supplies, medical equipment, or tactical gear in challenging environments.',
    tags: ['Precision Drop', 'Heavy Lift', 'Auto-Release']
  },
  {
    id: 7,
    title: 'Stealth Operations',
    image: '/images/military.webp',
    description: 'Ultra-quiet propulsion and low-observability designs for sensitive reconnaissance missions without detection.',
    tags: ['Low-Noise', 'Radar-Absorb', 'IR stealth']
  },
  {
    id: 8,
    title: 'Emergency Response',
    image: '/images/firefighting.jpeg',
    description: 'Thermal imaging and search assistance for firefighters and rescue teams in high-risk disaster scenarios.',
    tags: ['Thermal', 'Rescue', 'Smoke Pen']
  }
];

// ─── Component ───────────────────────────────────────────────────────────────

function ApplicationsPage() {
  useScrollToTop();
  const shouldReduceMotion = useReducedMotion();

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [appsRef, appsInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <ApplicationsContainer>
      <DataGrid />

      <HeroSection ref={heroRef}>

        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Specialized <span>Applications</span>
        </HeroTitle>

        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          From urban surveillance to deep-forest stealth operations, our autonomous systems are engineered for the most demanding technical requirements.
        </HeroSubtitle>
      </HeroSection>

      <ApplicationsSection ref={appsRef}>
        <ApplicationsGrid>
          {applications.map((app, index) => (
            <ApplicationCard
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              animate={appsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CornerBracket top left />
              <CornerBracket top right />
              <CornerBracket bottom left />
              <CornerBracket bottom right />
              <ScanBar className="scan-bar" />

              <CardImageContainer>
                <img src={app.image} alt={app.title} loading="lazy" />
              </CardImageContainer>

              <CardContent>
                <h3>{app.title}</h3>
                <p className="description">{app.description}</p>

                <FeatureTag>
                  {app.tags.map((tag, i) => (
                    <Tag key={i}>{tag}</Tag>
                  ))}
                </FeatureTag>
              </CardContent>
            </ApplicationCard>
          ))}
        </ApplicationsGrid>
      </ApplicationsSection>
    </ApplicationsContainer>
  );
}

export default ApplicationsPage;