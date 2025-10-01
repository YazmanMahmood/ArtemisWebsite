import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';

// SECTION — Dark background, generous padding
const ScoutFeaturesSection = styled.section`
  padding: 5rem 2rem;
  background-color: var(--color-black);
  color: var(--color-white);
  font-family: var(--font-primary);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

// CONTAINER — Responsive grid layout
const ScoutFeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

// GRID — Responsive grid that adapts to screen size
const ScoutFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

// ICON WRAPPER — For image icons
const ScoutFeatureIconWrapper = styled(motion.div)`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  margin: 0 auto 1rem;
  font-size: 1.75rem;
  color: var(--color-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
  transform: scale(1);
  will-change: transform;

  img {
    width: 65%;
    height: 65%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    margin-bottom: 0.8rem;

    img {
      width: 70%;
      height: 70%;
    }
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 15px;
  }
`;

// FEATURE CARD — Flexible and responsive
const ScoutFeatureCard = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem 1.25rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--font-primary);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  cursor: default;
  position: relative;
  overflow: hidden;
  min-height: 200px;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    background: #fafafa;
    border-color: rgba(0, 0, 0, 0.12);

    & > .scout-feature-icon {
      transform: scale(1.1) rotate(3deg);
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }

  h3 {
    font-size: 1.1rem;
    margin: 0.75rem 0 0.6rem;
    color: #111;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  p {
    color: #444;
    line-height: 1.6;
    font-size: 0.9rem;
    font-weight: 400;
    margin: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 14px;
    min-height: 180px;

    h3 {
      font-size: 1rem;
      margin: 0.5rem 0;
    }

    p {
      font-size: 0.85rem;
      line-height: 1.55;
    }
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1rem;
    min-height: 160px;

    h3 {
      font-size: 1.05rem;
    }

    p {
      font-size: 0.88rem;
    }
  }
`;

// Section title
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--color-white);
  letter-spacing: -0.03em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

// Floating animation variants
const iconFloatVariants = {
  rest: { y: 0, rotate: 0 },
  float: {
    y: -3,
    rotate: 2,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Stagger animation for grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Features data with custom images
const features = [
  {
    icon: '/images/batteryswap.png',
    title: 'Battery Swapping',
    desc: 'Quickly swap batteries for extended operation without downtime.',
  },
  {
    icon: '/images/dronelanding.png',
    title: 'Auto Landing',
    desc: 'Precise and reliable automated landing capabilities.',
  },
  {
    icon: '/images/50mins.png',
    title: '50 Min Flight Time',
    desc: 'Extended flight duration for longer missions and coverage.',
  },
  {
    icon: '/images/cameras.png',
    title: '4K/Thermal Cameras',
    desc: 'High-resolution visual and thermal imaging for detailed data.',
  },
  {
    icon: '/images/4kg.png',
    title: '4kg Payload Capacity',
    desc: 'Carry specialized equipment for diverse mission requirements.',
  },
];

function ScoutFeaturesSectionComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ScoutFeaturesSection aria-labelledby="features-heading">
      <ScoutFeaturesContainer>
        <SectionTitle
          id="features-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Scout Drone Features
        </SectionTitle>
        
        <ScoutFeaturesGrid
          as={motion.div}
          role="list"
          aria-label="Scout drone key features"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <ScoutFeatureCard
              key={index}
              role="listitem"
              aria-labelledby={`feature-title-${index}`}
              tabIndex={0}
              variants={shouldReduceMotion ? undefined : cardVariants}
            >
              <ScoutFeatureIconWrapper
                className="scout-feature-icon"
                variants={shouldReduceMotion ? undefined : iconFloatVariants}
                animate={shouldReduceMotion ? undefined : 'float'}
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img src={feature.icon} alt={feature.title} loading="lazy" />
              </ScoutFeatureIconWrapper>
              <h3 id={`feature-title-${index}`}>{feature.title}</h3>
              <p>{feature.desc}</p>
            </ScoutFeatureCard>
          ))}
        </ScoutFeaturesGrid>
      </ScoutFeaturesContainer>
    </ScoutFeaturesSection>
  );
}

export default ScoutFeaturesSectionComponent;
