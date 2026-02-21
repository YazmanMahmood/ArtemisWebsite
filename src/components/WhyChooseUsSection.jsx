import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaCogs, FaUserCheck, FaShieldAlt, FaLightbulb, FaHandshake } from 'react-icons/fa';

const WhyChooseSection = styled.section`
  padding: 8rem 2rem;
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #ffffff;
  font-family: var(--font-primary);
  overflow: hidden;
  position: relative;

  /* Dark overlay for better text readability */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -3px;
  color: #ffffff;
  line-height: 1;
  
  span {
    color: #ff4d4d;
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.8rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 auto 4rem auto;
  max-width: 700px;
  line-height: 1.6;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }
`;

const WhyChooseGrid = styled(motion.div)`
  display: grid;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    
    & > :nth-of-type(1), & > :nth-of-type(2), & > :nth-of-type(3) {
      grid-column: span 2;
    }
    
    & > :nth-of-type(4) {
      grid-column: 2 / span 2;
    }
    
    & > :nth-of-type(5) {
      grid-column: 4 / span 2;
    }
  }

  @media (max-width: 1024px) and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ChooseCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-12px);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 77, 77, 0.4);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);

    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      background: rgba(255, 77, 77, 1);
      color: #fff;
      box-shadow: 0 0 40px rgba(255, 77, 77, 0.5);
    }
  }

  h3 {
    font-size: 1.5rem;
    margin: 2rem 0 0;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
`;

const IconWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 2.8rem;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  color: #ff4d4d;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);

  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
    font-size: 2.2rem;
  }
`;

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const items = [
  { icon: <FaCogs />, title: "Custom-Built Solutions" },
  { icon: <FaUserCheck />, title: "User-Centric Approach" },
  { icon: <FaShieldAlt />, title: "Reliability & Durability" },
  { icon: <FaLightbulb />, title: "Innovation First" },
  { icon: <FaHandshake />, title: "Trusted Partnership" },
];

function WhyChooseUsSectionComponent() {
  return (
    <WhyChooseSection>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Why Choose <span>Us</span>
      </SectionTitle>

      <SectionSubtitle
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
      >
        Delivering excellence through innovation, reliability, and partnership
      </SectionSubtitle>

      <WhyChooseGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((item, index) => (
          <ChooseCard key={index} variants={cardVariants}>
            <IconWrapper className="icon-wrapper">
              {item.icon}
            </IconWrapper>
            <h3>{item.title}</h3>
          </ChooseCard>
        ))}
      </WhyChooseGrid>
    </WhyChooseSection>
  );
}

export default WhyChooseUsSectionComponent;
