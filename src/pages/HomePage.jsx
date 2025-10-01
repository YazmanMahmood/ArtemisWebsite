// src/pages/HomePage.jsx
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useRef } from 'react';

// --- Global Styles ---
const GlobalStyles = styled.div`
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-dark-grey: #1a1a1a;
    --color-medium-grey: #2d2d2d;
    --color-accent: #4fc3f7;
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
  max-width: 1000px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  position: relative;
  background: #000;
  aspect-ratio: 16 / 9;
  height: auto;

  @media (max-width: 768px) {
    width: 95%;
    aspect-ratio: 4 / 3;
  }
`;

const VideoHeading = styled.h2`
  text-align: center;
  color: var(--color-white);
  font-size: 2.5rem;
  margin-bottom: 1.8rem;
  font-family: var(--font-primary);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 2.1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }
`;

const VideoIframeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  iframe {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const FeatureHighlight = styled.div`
  text-align: center;
  margin: 2.2rem 0 0 0;
  font-family: sans-serif;
  font-size: 1.5rem;
  color: #fff;


`;

// --- Main Container ---
const MainContainer = styled.div`
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;

  &.loading {
    overflow: hidden;
  }
`;

// --- Loading Overlay ---
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-white);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out;

  &.fade-out {
    opacity: 0;
    visibility: hidden;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--color-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Import components
import HeroSectionComponent from '../components/HeroSection';
import ScoutFeaturesSectionComponent from '../components/ScoutFeaturesSection';
import SolutionsSectionComponent from '../components/SolutionsSection';
import TransformingIndustriesSectionComponent from '../components/TransformingIndustriesSection';
import WhyChooseUsSectionComponent from '../components/WhyChooseUsSection';
import FooterComponent from '../components/Footer';

function HomePage() {
  const videoRef = useRef(null);
  
  // Loading states
  const [isComponentsLoaded, setIsComponentsLoaded] = useState(false);
  const [isTransformingIndustriesReady, setIsTransformingIndustriesReady] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);

  // Intersection observers
  const [videoSectionRef, videoSectionInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  // Initialize page and handle component loading
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Stagger component loading for better UX
    const timers = [
      setTimeout(() => setIsComponentsLoaded(true), 1000),
      setTimeout(() => setIsTransformingIndustriesReady(true), 1500),
      setTimeout(() => setShowLoadingOverlay(false), 2000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Set up smooth scrolling behavior
  useEffect(() => {
    if (isComponentsLoaded) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return () => {
        document.documentElement.style.scrollBehavior = '';
      };
    }
  }, [isComponentsLoaded]);

  return (
    <>
      <GlobalStyles>
        {/* Loading Overlay */}
        {showLoadingOverlay && (
          <LoadingOverlay className={!showLoadingOverlay ? 'fade-out' : ''}>
            <div className="spinner"></div>
          </LoadingOverlay>
        )}

        <MainContainer className={showLoadingOverlay ? 'loading' : ''}>
          {/* Hero Section */}
          <HeroSectionComponent />

          {/* Artemis Scout in Action Video */}
          <VideoSection ref={videoSectionRef}>
            <VideoHeading>Artemis Scout in Action</VideoHeading>
            <StickyVideoContainer>
              <VideoIframeContainer>
                <iframe
                  ref={videoRef}
                  src="https://player.vimeo.com/video/1085459224?h=3065b2ca2e&autoplay=1&loop=1&background=1"
                  allow="autoplay; fullscreen; picture-in-picture"
                  frameBorder="0"
                  loading="lazy"
                  title="Artemis Scout Drone"
                />
              </VideoIframeContainer>
            </StickyVideoContainer>
            
          </VideoSection>

          {/* Scout Features */}
          {isComponentsLoaded && <ScoutFeaturesSectionComponent />}

          {/* Solutions Section */}
          {isComponentsLoaded && <SolutionsSectionComponent />}

          {/* Transforming Industries */}
          {isTransformingIndustriesReady && <TransformingIndustriesSectionComponent />}

          {/* Why Choose Us */}
          {isTransformingIndustriesReady && <WhyChooseUsSectionComponent />}

          {/* Footer */}
          
        </MainContainer>
      </GlobalStyles>
    </>
  );
}

export default HomePage;
