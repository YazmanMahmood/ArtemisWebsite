import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaLayerGroup, FaWifi, FaUsers, FaSlidersH, FaTools } from 'react-icons/fa';
import RoboticReveal from './common/RoboticReveal';

const SectionWrapper = styled.section`
  padding: 8rem 2rem;
  background: #000;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  overflow: hidden;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 77, 77, 0.05) 1px, transparent 0);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: 1;
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

const ReasonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(255, 77, 77, 0.12);
`;

const ReasonRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 56px 200px 1fr;
  gap: 0;
  border-bottom: 1px solid rgba(255, 77, 77, 0.08);
  align-items: stretch;
  transition: background 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 77, 77, 0.04);
  }

  @media (max-width: 768px) {
    grid-template-columns: 44px 1fr;
  }
`;

const IndexCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  border-right: 1px solid rgba(255, 77, 77, 0.1);
  font-size: 0.65rem;
  color: rgba(255, 77, 77, 0.4);
  letter-spacing: 1px;
`;

const IconCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(255, 77, 77, 0.1);

  svg {
    color: #ff4d4d;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  span {
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    border-right: none;
  }
`;

const DescCell = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 2rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  line-height: 1.6;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const reasons = [
  {
    icon: <FaLayerGroup />,
    title: 'Full-Spectrum Capability',
    desc: 'Surveillance, security, and automation — one manufacturer, one ecosystem.',
  },
  {
    icon: <FaWifi />,
    title: 'GPS-Denied Ready',
    desc: 'Operates in jammed and fully contested environments without satellite dependency.',
  },
  {
    icon: <FaUsers />,
    title: 'Minimal Crew',
    desc: 'Designed to reduce operator dependency at every stage of the mission.',
  },
  {
    icon: <FaSlidersH />,
    title: 'Configurable',
    desc: 'Every platform adapts to mission requirements — not the other way around.',
  },
  {
    icon: <FaTools />,
    title: 'Custom Development',
    desc: 'We build to client requirements, not off-the-shelf assumptions.',
  },
];

export default function WhyChooseUsSectionComponent() {
  return (
    <SectionWrapper>
      <GridOverlay />
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#fff',
              letterSpacing: '8px',
              fontWeight: 700,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            <RoboticReveal text="WHY CHOOSE ARTEMIS" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}
          >
            Full-spectrum capability from a single platform ecosystem.
          </motion.p>
        </SectionHeader>

        <ReasonsList>
          {reasons.map((item, index) => (
            <ReasonRow
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <IndexCell>0{index + 1}</IndexCell>
              <IconCell>
                {item.icon}
                <span>{item.title}</span>
              </IconCell>
              <DescCell>{item.desc}</DescCell>
            </ReasonRow>
          ))}
        </ReasonsList>
      </Container>
    </SectionWrapper>
  );
}
