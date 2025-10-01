import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaCogs, FaUserCheck, FaShieldAlt, FaLightbulb, FaHandshake } from 'react-icons/fa';

const WhyChooseSection = styled.section`
  padding: 5.5rem 2rem;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;

  h2 {
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 2.5rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.2rem;
    h2 {
      font-size: 2rem;
    }
  }
`;

const WhyChooseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const ChooseCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  h3 {
    font-size: 1.2rem;
    margin: 1rem 0 0.6rem;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

function WhyChooseUsSectionComponent() {
  return (
    <WhyChooseSection>
      <h2>Why Choose Us</h2>
      <WhyChooseGrid>
        <ChooseCard custom={0} variants={cardAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <IconWrapper>
            <FaCogs color="#ffffff" />
          </IconWrapper>
          <h3>Custom-Built Solutions</h3>
          <p>Every solution is tailored to fit your exact needs, mission goals, and budget.</p>
        </ChooseCard>

        <ChooseCard custom={1} variants={cardAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <IconWrapper>
            <FaUserCheck color="#ffffff" />
          </IconWrapper>
          <h3>User-Centric Approach</h3>
          <p>We design with end-users in mind — simple, reliable, and effective systems.</p>
        </ChooseCard>

        <ChooseCard custom={2} variants={cardAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <IconWrapper>
            <FaShieldAlt color="#ffffff" />
          </IconWrapper>
          <h3>Reliability & Durability</h3>
          <p>Our UAVs and IoT systems are built to last in demanding conditions.</p>
        </ChooseCard>

        <ChooseCard custom={3} variants={cardAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <IconWrapper>
            <FaLightbulb color="#ffffff" />
          </IconWrapper>
          <h3>Innovation First</h3>
          <p>We combine AI, automation, and smart design to stay ahead of the curve.</p>
        </ChooseCard>

        <ChooseCard custom={4} variants={cardAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <IconWrapper>
            <FaHandshake color="#ffffff" />
          </IconWrapper>
          <h3>Trusted Partnership</h3>
          <p>We work alongside clients, ensuring ongoing support and long-term success.</p>
        </ChooseCard>
      </WhyChooseGrid>
    </WhyChooseSection>
  );
}

export default WhyChooseUsSectionComponent;
