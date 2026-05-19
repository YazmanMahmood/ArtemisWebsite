import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VimeoEmbed from './common/VimeoEmbed';

const monoFont = "'Share Tech Mono', monospace";
const displayFont = "'Montserrat', sans-serif";

// ─── Styled Components ───────────────────────────────────────────────────────

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: #000;
  color: #fff;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.45) 55%,
    rgba(0,0,0,0.15) 100%
  );

  @media (max-width: 768px) {
    background: rgba(0,0,0,0.6);
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  z-index: 1;
  overflow: hidden;
`;



const HeroInner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  height: 100%;
  padding-top: 0;

  @media (max-width: 1400px) {
    justify-content: flex-start;
    padding-top: 4rem;
  }

  @media (max-width: 768px) {
    padding-top: 8rem;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 850px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const PreLabel = styled(motion.p)`
  font-family: ${monoFont};
  font-size: clamp(0.65rem, 1vw, 0.8rem);
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #ff4d4d;
  margin: 0 0 1.5rem 0;
`;

const MainTitle = styled(motion.h1)`
  font-family: ${displayFont};
  font-size: clamp(2.2rem, 5.5vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: -1px;

  @media (max-width: 1400px) {
    font-size: clamp(1.8rem, 4.5vw, 3.2rem);
    letter-spacing: -0.5px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  span {
    display: block;
  }

  .highlight {
    color: #ff4d4d;
  }
`;

const AccentBar = styled(motion.div)`
  width: 60px;
  height: 2px;
  background: #ff4d4d;
  margin: 2rem 0;
  box-shadow: 0 0 12px #ff4d4d;
`;

const Subheading = styled(motion.p)`
  font-family: ${monoFont};
  font-size: clamp(0.85rem, 1.1vw, 1.1rem);
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 1.2px;
  line-height: 1.6;
  margin: 0 0 2.5rem 0;
  max-width: 650px;

  @media (max-width: 1400px) {
    font-size: 0.9rem;
    max-width: 420px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`;

const CTARow = styled(motion.div)`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CTAPrimary = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #ff4d4d;
  color: #000;
  font-family: ${monoFont};
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #fff;
    color: #000;
    box-shadow: 0 0 30px rgba(255, 77, 77, 0.5);
  }
`;

const CTASecondary = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: transparent;
  color: #fff;
  font-family: ${monoFont};
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff4d4d;
    color: #ff4d4d;
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroSectionComponent() {

  return (
    <HeroSection>
      <HeroOverlay />

      <VideoContainer>
        <VimeoEmbed
          src="https://player.vimeo.com/video/1191621737?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&autopause=0&dnt=1"
          title="Hero Background Video"
          style={{ position: 'absolute', top: '50%', left: '50%', width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', transform: 'translate(-50%, -50%)', border: 'none', pointerEvents: 'none' }}
        />
      </VideoContainer>

      <HeroInner>
        <HeroContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >

          <MainTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <span>Unmanned.</span>
            <span className="highlight">Unmatched.</span>
          </MainTitle>

          <AccentBar
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          <Subheading
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Aerial systems engineered for environments where failure isn't an option — autonomous, GPS-denied ready, zero operator dependency.
          </Subheading>

          <CTARow
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <CTAPrimary to="/contact">Contact Us</CTAPrimary>
            <CTASecondary to="/about">Learn More</CTASecondary>
          </CTARow>
        </HeroContent>
      </HeroInner>
    </HeroSection>
  );
}