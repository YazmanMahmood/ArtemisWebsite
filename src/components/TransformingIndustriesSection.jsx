import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// SECTION
const TransformSection = styled.section`
  padding: 8rem 2rem;
  background-color: #050505;
  color: #ffffff;
  font-family: var(--font-primary);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

// TITLE
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  letter-spacing: -1px;

  span {
    background: linear-gradient(90deg, #ff4d4d, #ff8c42);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #94a3b8;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

// GRID
const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  padding: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// CARD
const CardContainer = styled(motion.div)`
  height: 400px; /* Reduced height as requested */
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.08);
  background: #111;
  cursor: pointer;

  /* Fix for Safari border-radius overflow */
  transform: translateZ(0); 

  &:hover {
    border-color: rgba(255,255,255,0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.7);
  }

  @media (max-width: 600px) {
    height: 400px;
  }
`;

const ParallaxImage = styled(motion.div)`
  position: absolute;
  top: -20%; /* Extra height for parallax movement */
  left: 0;
  width: 100%;
  height: 140%; /* 140% height to allow scrolling */
  z-index: 1;

  iframe, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    filter: brightness(0.65);
    transition: filter 0.4s ease;
  }

  ${CardContainer}:hover & {
    iframe, img {
      filter: brightness(0.8);
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #e2e8f0;
  opacity: 0.9;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 90%;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// DATA
const industries = [
  {
    title: 'Precision Agriculture',
    desc: 'Multispectral imaging for optimal crop health and yield maximization.',
    video: 'https://player.vimeo.com/video/1085458685?h=aa97018d6e&autoplay=1&loop=1&background=1',
    tags: ['Crop Health', 'Irrigation', 'Yields'],
  },
  {
    title: 'Aerial Surveillance',
    desc: 'Autonomous patrols with thermal capability for 24/7 localized security.',
    video: 'https://player.vimeo.com/video/1085460408?h=9278163612&autoplay=1&loop=1&background=1',
    tags: ['Security', 'Thermal', 'AI Detection'],
  },
  {
    title: 'Industrial Inspection',
    desc: 'High-res structural analysis for critical infrastructure maintenance.',
    video: 'https://player.vimeo.com/video/1085460667?h=78ef9db498&autoplay=1&loop=1&background=1',
    tags: ['Infrastructure', 'Safety', 'Reporting'],
  },
  {
    title: 'Mapping & Surveying',
    desc: 'Survey-grade accuracy for construction, mining, and land management.',
    video: 'https://player.vimeo.com/video/1085458702?h=eba42b56a6&autoplay=1&loop=1&background=1',
    tags: ['3D Modeling', 'Photogrammetry', 'Topography'],
  },
];

// Single Card Component with Parallax Logic
function IndustryCardItem({ data }) {
  const cardRef = useRef(null);

  // Track scroll relative to this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to Y translation (Parallax)
  // Moving from -10% to +10% creates a "slower move" effect against the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <CardContainer
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <ParallaxImage style={{ y }}>
        <iframe
          src={data.video}
          title={data.title}
          allow="autoplay; fullscreen; picture-in-picture"
          frameBorder="0"
        />
      </ParallaxImage>
      <Overlay>
        <CardTitle>{data.title}</CardTitle>
        <CardDesc>{data.desc}</CardDesc>
        <TagContainer>
          {data.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </TagContainer>
      </Overlay>
    </CardContainer>
  );
}

function TransformingIndustriesSectionComponent() {
  return (
    <TransformSection>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Industries <span>Transformed</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Deploying autonomous solutions across critical sectors to enhance efficiency, safety, and data intelligence.
          </SectionSubtitle>
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