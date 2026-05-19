// src/pages/HomePage.jsx
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import VimeoEmbed from '../components/common/VimeoEmbed';

// --- Global Styles ---
const GlobalStyles = styled.div`
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-dark-grey: #1a1a1a;
    --color-medium-grey: #2d2d2d;
    --color-accent: #ff4d4d;
    --font-primary: 'Helvetica Neue', Arial, sans-serif;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--color-white);
    color: var(--color-black);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 400;
  }

  p {
    font-family: var(--font-primary);
  }
`;

// --- Video Section ---
const VideoSection = styled.section`
  padding: 4rem 0;
  background-color: var(--color-black);
  position: relative;
  z-index: 1;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-family: var(--font-primary);

  @media (max-width: 768px) {
    padding: 3rem 0;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 0;
  }
`;

const StickyVideoContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  position: relative;
  background: #000;
  aspect-ratio: 16 / 9;

  @media (max-width: 768px) {
    width: 95%;
    aspect-ratio: 4 / 3;
  }
`;

const VideoHeading = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    color: var(--color-white);
    font-size: clamp(1.6rem, 4vw, 3rem);
    font-family: 'Share Tech Mono', monospace;
    font-weight: 700;
    letter-spacing: 8px;
    text-transform: uppercase;
    margin: 0;
  }

  p {
    color: rgba(255,255,255,0.4);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin: 0.6rem 0 0 0;
  }

  .bar {
    width: 60px;
    height: 2px;
    background: var(--color-accent);
    margin: 1rem auto 0;
    box-shadow: 0 0 8px var(--color-accent);
  }
`;

// --- Main Container ---
const MainContainer = styled.div`
  position: relative;
  overflow-x: hidden;
`;

// Import components
import HeroSectionComponent from '../components/HeroSection';
import InterceptorSection from '../components/InterceptorSection';
import ScoutFeaturesSectionComponent from '../components/ScoutFeaturesSection';
import TheBoxSectionComponent from '../components/TheBoxSection';
import DroneControlSectionComponent from '../components/DroneControlSection';
import TransformingIndustriesSectionComponent from '../components/TransformingIndustriesSection';
import WhyChooseUsSectionComponent from '../components/WhyChooseUsSection';
import PartnersSection from '../components/PartnersSection';


function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  return (
    <>
      <GlobalStyles>
        <MainContainer>
          {/* Hero Section */}
          <HeroSectionComponent />

          {/* Interceptor Section */}
          <InterceptorSection />

          {/* Artemis Scout in Action Video */}
          <VideoSection>
            <VideoHeading>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Artemis Scout in Action
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Autonomous. Relentless. Precise.
              </motion.p>
              <motion.div
                className="bar"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </VideoHeading>
            <StickyVideoContainer>
              <VimeoEmbed
                src="https://player.vimeo.com/video/1085459224?h=3065b2ca2e&background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1"
                title="Artemis Scout Drone"
                lazy
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
            </StickyVideoContainer>
          </VideoSection>

          {/* Scout Features */}
          <ScoutFeaturesSectionComponent />

          {/* The Box Section */}
          <TheBoxSectionComponent />

          {/* Drone Control Platform */}
          <DroneControlSectionComponent />

          {/* Transforming Industries */}
          <TransformingIndustriesSectionComponent />

          {/* Why Choose Us */}
          <WhyChooseUsSectionComponent />

          {/* Strategic Partners */}
          <PartnersSection />
        </MainContainer>
      </GlobalStyles>
    </>
  );
}

export default HomePage;