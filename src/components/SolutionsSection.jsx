import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaRobot, FaMicrochip } from 'react-icons/fa';
import uavIcon from '/images/uav.png';
import iotIcon from '/images/internet-of-things.png';

const SolutionsSection = styled.section`
  padding: 4rem 2rem;
  background: #ffffff;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SolutionsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 900px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SolutionCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.8rem 1.5rem;
  border: 2px solid #000000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    border-color: #000000;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff; /* white background */
  color: #000000;
  margin-bottom: 1.2rem;
  overflow: hidden;
  border: 2px solid #000000; /* black outline */
`;

const IconImage = styled.img`
  max-width: 70%;
  max-height: 70%;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1.2rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FeatureTag = styled.span`
  background: #f8f9fa;
  border: 1px solid #000000;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: #000000;
  font-weight: 500;
  display: inline-block;
  transition: all 0.2s ease;

  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

function SolutionsSectionComponent() {
  return (
    <SolutionsSection>
      <SolutionsTitle>Our Solutions</SolutionsTitle>
      <SolutionsGrid>
        {/* Card 1: UAV */}
        <SolutionCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <IconWrapper>
            <IconImage src={uavIcon} alt="UAV" loading="lazy" />
          </IconWrapper>
          <CardTitle>UAV</CardTitle>
          <FeatureList>
            <FeatureTag>AI Powered Navigation</FeatureTag>
            <FeatureTag>Obstacle Avoidance</FeatureTag>
            <FeatureTag>24/7 Operation Capabilities</FeatureTag>
            <FeatureTag>Customizable</FeatureTag>
            <FeatureTag>All Weather Conditions Resistant</FeatureTag>
            <FeatureTag>4K / Thermal Camera Capabilities</FeatureTag>
            <FeatureTag>No Human Intervention</FeatureTag>
          </FeatureList>
        </SolutionCard>

        {/* Card 2: IoT Based Automations */}
        <SolutionCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <IconWrapper>
            <IconImage src={iotIcon} alt="IoT" loading="lazy" />
          </IconWrapper>
          <CardTitle>IoT Based Automations</CardTitle>
          <FeatureList>
            <FeatureTag>Smart Greenhouse Monitoring</FeatureTag>
            <FeatureTag>Aquaculture Health Monitoring</FeatureTag>
            <FeatureTag>Secure Data</FeatureTag>
            <FeatureTag>Remote Industrial Controls</FeatureTag>
            <FeatureTag>Smart Infrastructure</FeatureTag>
            <FeatureTag>Edge Computing</FeatureTag>
          </FeatureList>
        </SolutionCard>
      </SolutionsGrid>
    </SolutionsSection>
  );
}

export default SolutionsSectionComponent;
