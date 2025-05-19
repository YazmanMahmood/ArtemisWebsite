import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
  background: var(--dark-accent);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  }
`;

const CustomizeImage = styled.div`
  position: relative;
  height: 250px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  
  img {
    max-height: 60%;
    max-width: 60%;
    object-fit: contain;
  }
`;

const CustomizeInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CustomizeTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: var(--dark);
`;

const CustomizeDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const CustomizeButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

function CustomizeCard() {
  return (
    <Card>
      <CustomizeImage>
        <img src="/images/customize-icon.svg" alt="Customize" />
      </CustomizeImage>
      <CustomizeInfo>
        <CustomizeTitle>Custom Solution</CustomizeTitle>
        <CustomizeDescription>
          Need something specific? Our team can design a custom drone solution tailored to your unique requirements.
        </CustomizeDescription>
        <CustomizeButton to="/customize">Design Your Custom Drone</CustomizeButton>
      </CustomizeInfo>
    </Card>
  );
}

export default CustomizeCard; 
