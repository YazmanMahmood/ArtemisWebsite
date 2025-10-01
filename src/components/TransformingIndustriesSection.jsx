import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

// --- Styled Components ---

// --- 1. Make the main section VERY TALL and BLACK ---
const TransformSection = styled.section`
  /* Calculate height based on number of industries */
  height: calc(100vh * ${props => props.industryCount || 4}); 
  width: 100vw;
  background-color: #000; /* Critical: Black background for entire tall area */
  color: var(--color-black);
  font-family: var(--font-primary);
  position: relative; /* Needed for absolutely positioned children if necessary */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 70px; /* Start section exactly after navbar */
`;

// --- 2. Make the content card STICKY and exactly 1 viewport tall ---
const StableIndustryCard = styled.div`
  position: sticky;
  top: 0; /* No offset, since section already starts after navbar */
  width: 100vw;
  height: calc(90vh); /* Full viewport height below navbar */
  margin: 0;
  overflow: hidden;
  background: #000;
  display: flex;
  flex-direction: column;
  z-index: 1; 

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    height: auto;
    flex-direction: column;
    align-items: stretch;
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: calc(50% + 20px); /* Move video down by 20px from center */
  right: 2rem;
  left: auto;
  transform: translateY(-50%);
  width: 55vw;
  height: 60vh; /* Slightly smaller to fit with heading above */
  max-width: 900px;
  max-height: 500px;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  border-radius: 12px;

  /* Move video upwards by 50px on desktop */
  @media (min-width: 900px) {
    top: calc(50% - 30px);
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
    transform: scale(1.0);

    &.active {
      opacity: 0.8;
      transform: scale(1);
      transition: opacity 1.2s ease-in-out, transform 1.2s ease-in-out;
    }
  }

  @media (max-width: 900px) {
    position: relative; /* place in normal flow above text */
    top: auto;
    left: auto;
    right: auto;
    transform: none;
    width: 100%;
    height: 42vh; /* visible height on phones */
    max-width: none;
    max-height: none;
    margin: 0 auto 0.75rem; /* small gap below video */
    pointer-events: auto;
  }
`;

const IndustryText = styled(motion.div)`
  position: absolute;
  z-index: 2;
  padding: 3rem 3rem;
  max-width: 700px;
  width: 50%;
  top: calc(50% + 20px); /* Align with video position */
  left: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.2) 90%,
    transparent 100%
  );

  /* Move text 50px upwards on desktop */
  @media (min-width: 900px) {
    top: calc(50% - 230px);
  }

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    padding: 1.2rem 1rem 2rem 1rem; /* tighter padding */
    width: 100%;
    max-width: 100%;
    background: none; /* remove heavy gradient under text on mobile */
    justify-content: flex-start; /* text below video */
  }
`;

const IndustryTitle = styled(motion.h3)`
  font-size: 2.2rem;
  margin: 0 0 0.5rem 0; /* Reduced bottom margin */
  color: #fff;
  font-weight: 700;
  font-family: 'Inter', 'Montserrat', 'Lato', 'Helvetica', sans-serif;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  line-height: 0.95; /* Reduced line spacing for tighter text */

  @media (max-width: 900px) {
    font-size: 2.2rem;
    line-height: 1.1; /* Slightly more readable on mobile */
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.9rem;
    line-height: 1.05;
    margin-bottom: 0.5rem;
  }
`;

const IndustryDesc = styled(motion.p)`
  color: #f0f0f0;
  font-size: 1.3rem;
  margin-bottom: 2rem; /* Reduced margin */
  font-family: var(--font-primary);
  line-height: 1.6; /* Slightly tighter line height */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  font-weight: 300;

  @media (max-width: 900px) {
    font-size: 1.15rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.05rem;
    line-height: 1.4;
    margin-bottom: 1.25rem;
  }
`;

const BenefitsList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem; /* Reduced margin between benefits */
    line-height: 1.6; /* Tighter line height */
    color: #e8e8e8;
    font-size: 1.1rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    font-weight: 300;

    &:before {
      content: '▶';
      position: absolute;
      left: 0;
      color: #fff;
      font-size: 0.9rem;
      top: 0.1rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }

    @media (max-width: 900px) {
      font-size: 1rem;
      margin-bottom: 0.875rem;
      line-height: 1.5;
      padding-left: 1.75rem;
    }

    @media (max-width: 480px) {
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
      line-height: 1.4;
      padding-left: 1.5rem;
    }
  }
`;

// --- 3. Section title now inside the sticky card ---
const SectionTitle = styled(motion.h2)`
  color: #fff;
  font-weight: 700;
  text-align: center;
  font-size: 3.5rem;
  margin: 0.2rem 0 0 0; /* Minimal top margin, no gap below */
  padding: 0 2rem;
  width: 100%;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  font-family: 'Inter', sans-serif;
  line-height: 0.9;
  flex-shrink: 0;

  @media (max-width: 900px) {
    font-size: 2.4rem;
    margin: 0.1rem 0 0 0;
    line-height: 1.1;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin: 0.05rem 0 0 0;
    line-height: 1.05;
    padding: 0 0.5rem;
  }
`;

// Progress Indicator
const ProgressIndicator = styled(motion.div)`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0; /* hidden by default */
  pointer-events: none; /* ignore clicks when hidden */

  @media (max-width: 768px) {
    right: 1rem;
    gap: 0.75rem;
  }
`;

const ProgressDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background: ${props => props.active ? '#fff' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    border-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 900px) {
    width: 10px;
    height: 10px;
  }
`;

// Add a content container for video and text
const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
const TechOverlay = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 0.9rem;
  z-index: 10;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    border-radius: 8px;
  }
`;

const StatusDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88;
  display: inline-block;
  margin-right: 0.5rem;
`;

// Decorative Elements
const DecorativeOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
`;

// --- Data ---
const industries = [
  {
    title: 'Precision Agriculture',
    desc: 'Revolutionize farming with aerial insights. Our drones help monitor crop health, optimize irrigation, and increase yields through detailed multispectral imaging.',
    video: 'https://player.vimeo.com/video/1085458685?h=aa97018d6e&autoplay=1&loop=1&background=1',
    benefits: [
      'Identify crop stress before visible to the naked eye',
      'Reduce water and fertilizer usage by 30%',
      'Increase crop yields by up to 20%',
      'Map large areas quickly and efficiently',
    ],
  },
  {
    title: 'Aerial Surveillance',
    desc: 'Enhance security operations with advanced aerial monitoring. Our surveillance drones provide real-time feeds, thermal imaging, and automated patrol capabilities.',
    video: 'https://player.vimeo.com/video/1085460408?h=9278163612&autoplay=1&loop=1&background=1',
    benefits: [
      '24/7 monitoring capabilities',
      'Reduce security personnel costs',
      'Rapid deployment to incident areas',
      'AI-powered threat detection',
    ],
  },
  {
    title: 'Industrial Inspection',
    desc: 'Safely inspect infrastructure and industrial facilities without putting personnel at risk. Access hard-to-reach areas and detect problems early.',
    video: 'https://player.vimeo.com/video/1085460667?h=78ef9db498&autoplay=1&loop=1&background=1',
    benefits: [
      'Reduce inspection costs by up to 80%',
      'Minimize downtime during inspections',
      'Identify structural issues early',
      'Create detailed 3D models of facilities',
    ],
  },
  {
    title: 'Mapping & Surveying',
    desc: 'Generate high-precision maps and 3D models for construction, mining, and land management with our specialized mapping drones.',
    video: 'https://player.vimeo.com/video/1085458702?h=eba42b56a6&autoplay=1&loop=1&background=1',
    benefits: [
      'Create accurate topographical maps',
      'Track progress on construction sites',
      'Calculate precise volume measurements',
      'Generate orthomosaic maps and point clouds',
    ],
  },
];

function TransformingIndustriesSectionComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const sectionRef = useRef(null);
  const scrollLockRef = useRef(false);

  // --- Scroll-jacking logic ---
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const industriesCount = industries.length;
    const sectionHeight = window.innerHeight * industriesCount;
    section.style.height = `${sectionHeight}px`;

    function onScroll() {
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + sectionHeight;
      const windowHeight = window.innerHeight;

      // If user is in the section
      if (scrollY + 1 >= sectionTop && scrollY < sectionBottom - windowHeight) {
        setIsScrollLocked(true);
        // Calculate which industry to show
        const progress = (scrollY - sectionTop) / (sectionHeight - windowHeight);
        const newIndex = Math.floor(progress * industriesCount);
        setActiveIndex(Math.max(0, Math.min(industriesCount - 1, newIndex)));
      } else {
        setIsScrollLocked(false);
        // If user scrolls past, show last industry
        if (scrollY >= sectionBottom - windowHeight) {
          setActiveIndex(industriesCount - 1);
        } else if (scrollY < sectionTop) {
          setActiveIndex(0);
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // --- Render ---
  return (
    <div ref={sectionRef} style={{ position: 'relative', width: '100vw' }}>
      <div
        style={{
          position: isScrollLocked ? 'fixed' : 'relative',
          top: isScrollLocked ? 0 : 'unset',
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        <TransformSection industryCount={industries.length} style={{ height: '100vh' }}>
          <StableIndustryCard>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transforming Industries
            </SectionTitle>
            <ContentContainer>
              <VideoBackground>
                {industries.map((ind, i) => (
                  <iframe
                    key={i}
                    src={ind.video}
                    className={i === activeIndex ? 'active' : ''}
                    allow="autoplay; fullscreen; picture-in-picture"
                    frameBorder="0"
                    loading="eager"
                    title={ind.title}
                    style={{ opacity: i === activeIndex ? 0.8 : 0, transition: 'opacity 1.2s' }}
                  />
                ))}
              </VideoBackground>
              <AnimatePresence mode="wait">
                <IndustryText
                  key={activeIndex}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <IndustryTitle>{industries[activeIndex].title}</IndustryTitle>
                  <IndustryDesc>{industries[activeIndex].desc}</IndustryDesc>
                  <BenefitsList>
                    {industries[activeIndex].benefits.map((benefit, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}>
                        {benefit}
                      </motion.li>
                    ))}
                  </BenefitsList>
                </IndustryText>
              </AnimatePresence>
            </ContentContainer>
            <ProgressIndicator
              animate={{ opacity: isScrollLocked ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: isScrollLocked ? 'auto' : 'none' }}
            >
              {industries.map((_, index) => (
                <ProgressDot
                  key={index}
                  active={index === activeIndex}
                  animate={{ scale: index === activeIndex ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </ProgressIndicator>
          </StableIndustryCard>
        </TransformSection>
      </div>
    </div>
  );
}

export default TransformingIndustriesSectionComponent;
