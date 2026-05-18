import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import RoboticReveal from './common/RoboticReveal';
import VimeoEmbed from './common/VimeoEmbed';

const TransformSection = styled.section`
  padding: 8rem 2rem;
  background-color: #000;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CardContainer = styled(motion.div)`
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 77, 77, 0.2);
  background: #050505;
  cursor: pointer;
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 1;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
    filter: brightness(0.85) saturate(0.9);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.0) 60%);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.h3`
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  margin: 0 0 0.8rem 0;
  color: #ff4d4d;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const HUDOverlay = styled.div`
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 77, 77, 0.3);
  pointer-events: none;
  opacity: 0.3;
  z-index: 4;
`;

const industries = [
  {
    title: 'Surveillance & Mapping',
    video: 'https://player.vimeo.com/video/1191621737?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1',
    tags: ['SURVEY', 'MAPPING', 'MONITORING'],
  },
  {
    title: 'Perimeter Security',
    video: 'https://player.vimeo.com/video/1085460408?h=9278163612&background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1',
    tags: ['24/7 AUTO', 'DETECTION', 'RAPID RESPONSE'],
  },
  {
    title: 'Critical Infrastructure',
    video: 'https://player.vimeo.com/video/1085460667?h=78ef9db498&background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1',
    tags: ['CONTINUOUS MON', 'INCIDENT RESP', 'ASSET GUARD'],
  },
  {
    title: 'Precision Delivery',
    video: 'https://player.vimeo.com/video/1085458702?h=eba42b56a6&background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1',
    tags: ['LOGISTICS', 'PAYLOAD DEP', 'PRECISION'],
  },
];

function IndustryCardItem({ data }) {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <HUDOverlay />
      <VideoWrapper>
        <VimeoEmbed
          src={data.video}
          title={data.title}
          lazy
          style={{ width: '100%', height: '100%' }}
        />
      </VideoWrapper>
      <Overlay>
        <Title>{data.title}</Title>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {data.tags.map((tag, i) => (
            <span key={i} style={{ fontSize: '0.7rem', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '2px 8px' }}>
              {tag}
            </span>
          ))}
        </div>
      </Overlay>
    </CardContainer>
  );
}

function TransformingIndustriesSectionComponent() {
  return (
    <TransformSection>
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#fff',
              letterSpacing: '8px',
              fontWeight: 700,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            <RoboticReveal text="OPERATIONAL DOMAINS" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.45)', marginTop: '0.8rem', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}
          >
            Autonomous capability across the full operational spectrum.
          </motion.p>
        </SectionHeader>

        <IndustryGrid>
          {industries.map((item, index) => (
            <IndustryCardItem key={index} data={item} />
          ))}
        </IndustryGrid>
      </Container>
    </TransformSection>
  );
}

export default TransformingIndustriesSectionComponent;