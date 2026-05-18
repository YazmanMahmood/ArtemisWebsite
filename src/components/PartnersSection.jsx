import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionWrapper = styled.section`
  padding: 80px 2rem;
  background-color: #000;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 77, 77, 0.1);
  border-bottom: 1px solid rgba(255, 77, 77, 0.1);
`;

const DataGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(255, 77, 77, 0.03) 1px, transparent 0);
  background-size: 30px 30px;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 8px;
    margin-bottom: 1rem;
    
    span {
      color: #ff4d4d;
    }
  }

  .line {
    width: 60px;
    height: 2px;
    background: #ff4d4d;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(255, 77, 77, 0.5);
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;

const PartnerCard = styled(motion.div)`
  width: 100%;
  max-width: 220px;
  aspect-ratio: 3/2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 77, 77, 0.3);
    background: rgba(255, 77, 77, 0.02);
    box-shadow: 0 0 20px rgba(255, 77, 77, 0.1);
    
    img {
      filter: grayscale(0%) brightness(1.2);
      opacity: 1;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: grayscale(100%) brightness(0.8);
    opacity: 0.6;
    transition: all 0.4s ease;
  }

  /* Corner Brackets */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: rgba(255, 77, 77, 0.2);
    border-style: solid;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before, &:hover::after {
    opacity: 1;
  }

  &::before {
    top: 0; left: 0;
    border-width: 1px 0 0 1px;
  }
  &::after {
    bottom: 0; right: 0;
    border-width: 0 1px 1px 0;
  }
`;

const partners = [
  { name: 'Army', logo: '/partners/armylogo.png' },
  { name: 'MOITT', logo: '/partners/MOITT.png' },
  { name: 'NICL', logo: '/partners/NICL.png' },
  { name: 'TECH', logo: '/partners/TECH.png' }
];

const PartnersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <SectionWrapper ref={ref}>
      <DataGrid />
      <Container>
        <Header>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Strategic <span>Partners</span>
          </motion.h2>
          <motion.div 
            className="line"
            initial={{ width: 0 }}
            animate={inView ? { width: 60 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </Header>

        <PartnersGrid>
          {partners.map((partner, index) => (
            <PartnerCard
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <img src={partner.logo} alt={partner.name} />
            </PartnerCard>
          ))}
        </PartnersGrid>
      </Container>
    </SectionWrapper>
  );
};

export default PartnersSection;
