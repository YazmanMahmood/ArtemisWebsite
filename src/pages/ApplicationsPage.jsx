import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useState } from 'react';

// Main container with AboutPage background
const ApplicationsContainer = styled.div`
  min-height: 100vh;
  background: var(--light);
  color: var(--dark);
  position: relative;
  overflow-x: hidden;
`;

// Hero section
const HeroSection = styled.section`
  padding: 120px 2rem 80px;
  text-align: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 100px 1rem 60px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

// Stats section
const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--dark-accent);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    display: block;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

// Applications grid
const ApplicationsSection = styled.section`
  padding: 80px 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 60px 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ApplicationCard = styled(motion.div)`
  background: var(--dark-accent);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--primary);
  }
`;

const CardImageContainer = styled.div`
  height: 240px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  position: relative;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--dark);
    line-height: 1.3;
  }

  .description {
    color: var(--text-light);
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-light);
  border-left: 2px solid var(--primary);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: translateX(5px);
  }

  &::before {
    content: '→';
    margin-right: 0.8rem;
    color: var(--primary);
    font-weight: bold;
  }
`;

const ShowMoreButton = styled(motion.button)`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 2px solid var(--primary);
  border-radius: 30px;
  color: var(--primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }
`;

// Animation variants (unchanged)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.05
    }
  })
};

// Applications data (unchanged)
const applications = [
  {
    id: 1,
    title: 'Perimeter Security',
    image: '/images/perimeter-security.jpg',
    description: '24/7 automated surveillance for facility perimeters with AI-powered threat detection',
    features: [
      'Continuous boundary monitoring',
      'Unauthorized entry detection',
      'Real-time security alerts',
      'Security system integration',
      'Cost-effective personnel reduction'
    ]
  },
  {
    id: 2,
    title: 'Warehouse Operations',
    image: '/images/warehouse-surveillance.jpeg',
    description: 'Intelligent warehouse monitoring and operational optimization solutions',
    features: [
      'Advanced indoor navigation',
      'Inventory area monitoring',
      'Employee safety oversight',
      'Operational bottleneck identification',
      'Theft prevention systems'
    ]
  },
  {
    id: 3,
    title: 'Threat Detection',
    image: '/images/intruder-detection.jpeg',
    description: 'AI-powered behavioral analysis and advanced threat identification',
    features: [
      'Facial recognition technology',
      'Behavioral pattern analysis',
      'Instant alert notifications',
      'Law enforcement integration',
      'Minimal false positives'
    ]
  },
  {
    id: 4,
    title: 'Emergency Response',
    image: '/images/firefighting.jpeg',
    description: 'Thermal imaging and rapid emergency response coordination',
    features: [
      'Real-time fire mapping',
      'Thermal hotspot detection',
      'Emergency deployment assistance',
      'Search and rescue support',
      'Smoke penetration capability'
    ]
  },
  {
    id: 5,
    title: 'Precision Agriculture',
    image: '/images/agri.webp',
    description: 'Smart farming solutions with advanced crop monitoring and analytics',
    features: [
      'Multispectral crop analysis',
      'Irrigation optimization',
      'Pest and disease detection',
      'Yield prediction modeling',
      'Soil quality assessment'
    ]
  },
  {
    id: 6,
    title: 'Smart Inventory',
    image: '/images/inventory-drone.jpg',
    description: 'Automated inventory management with real-time tracking capabilities',
    features: [
      'Barcode and RFID scanning',
      'Automated stock counting',
      'Space utilization analysis',
      'Location mapping systems',
      'ERP system integration'
    ]
  }
];

const stats = [
  { number: '90%', label: 'Detection Accuracy' },
  { number: '24/7', label: 'Operation Time' },
  { number: '6+', label: 'Applications' }
];

function ApplicationsPage() {
  useScrollToTop();
  const shouldReduceMotion = useReducedMotion();
  const [expandedCards, setExpandedCards] = useState({});

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [appsRef, appsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <ApplicationsContainer>
      <HeroSection ref={heroRef}>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
        >
          Drone Applications
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
        >
          Revolutionizing industries with cutting-edge autonomous drone technology and intelligent monitoring solutions
        </HeroSubtitle>

        <StatsSection
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            >
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </StatCard>
          ))}
        </StatsSection>
      </HeroSection>

      <ApplicationsSection>
        <SectionTitle
          ref={appsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={appsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          Our Solutions
        </SectionTitle>

        <ApplicationsGrid
          as={motion.div}
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={appsInView ? "visible" : "hidden"}
        >
          {applications.map((app, index) => (
            <ApplicationCard
              key={app.id}
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={{ y: shouldReduceMotion ? 0 : -10 }}
            >
              <CardImageContainer>
                <img src={app.image} alt={app.title} loading="lazy" />
              </CardImageContainer>
              
              <CardContent>
                <h3>{app.title}</h3>
                <p className="description">{app.description}</p>
                
                <FeatureGrid>
                  {app.features.slice(0, expandedCards[app.id] ? app.features.length : 3).map((feature, i) => (
                    <FeatureItem
                      key={i}
                      custom={i}
                      variants={shouldReduceMotion ? undefined : featureVariants}
                      initial="hidden"
                      animate={appsInView ? "visible" : "hidden"}
                    >
                      {feature}
                    </FeatureItem>
                  ))}
                </FeatureGrid>
                
                {app.features.length > 3 && (
                  <ShowMoreButton
                    onClick={() => toggleCard(app.id)}
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                  >
                    {expandedCards[app.id] ? 'Show Less' : `+${app.features.length - 3} More Features`}
                  </ShowMoreButton>
                )}
              </CardContent>
            </ApplicationCard>
          ))}
        </ApplicationsGrid>
      </ApplicationsSection>
    </ApplicationsContainer>
  );
}

export default ApplicationsPage;
