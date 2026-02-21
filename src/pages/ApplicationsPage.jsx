import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useState } from 'react';

// Main container with dark background for premium feel
const ApplicationsContainer = styled.div`
  min-height: 100vh;
  background: var(--light);
  color: var(--dark);
  position: relative;
  overflow-x: hidden;
`;

// Hero section
const HeroSection = styled.section`
  padding: 140px 2rem 60px;
  text-align: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 120px 1.5rem 40px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(90deg, #ff4d4d, #ff8c42);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: var(--text-muted);
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

// Applications grid
const ApplicationsSection = styled.section`
  padding: 40px 2rem 100px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px 1rem 60px;
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ApplicationCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(26, 26, 26, 0.8);
    transform: translateY(-8px);
  }
`;

const CardImageContainer = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(12, 12, 12, 1), transparent);
  }

  ${ApplicationCard}:hover & img {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #fff;
    letter-spacing: -0.01em;
  }

  .description {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const FeatureTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 59, 48, 0.1);
  color: var(--primary);
  border-radius: 100px;
  border: 1px solid rgba(255, 59, 48, 0.2);
  font-weight: 600;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  }
};

const applications = [
  {
    id: 1,
    title: 'Long Range Surveillance',
    image: '/images/longrange.png',
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
    image: '/images/military.png',
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

function ApplicationsPage() {
  useScrollToTop();
  const shouldReduceMotion = useReducedMotion();

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [appsRef, appsInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <ApplicationsContainer>
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
          From urban surveillance to deep-forest stealth operations, our autonomous systems are engineered for the most demanding missions.
        </HeroSubtitle>
      </HeroSection>

      <ApplicationsSection ref={appsRef}>
        <ApplicationsGrid
          as={motion.div}
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={appsInView ? "visible" : "hidden"}
        >
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              variants={cardVariants}
            >
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