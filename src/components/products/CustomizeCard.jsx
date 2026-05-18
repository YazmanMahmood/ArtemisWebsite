import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi';

const Card = styled(motion.div)`
  background: #111;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255, 77, 77, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    border-color: #ff4d4d;
    box-shadow: 0 20px 40px rgba(255, 77, 77, 0.2);
  }
`;

const CornerBracket = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid #ff4d4d;
  z-index: 10;
  pointer-events: none;
  opacity: 0.6;

  ${props => props.top && 'top: 10px;'}
  ${props => props.bottom && 'bottom: 10px;'}
  ${props => props.left && 'left: 10px; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: 10px; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const CustomizeImage = styled.div`
  position: relative;
  height: 250px;
  background: linear-gradient(135deg, #000, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d4d;
  font-size: 5rem;
  border-bottom: 1px solid rgba(255, 77, 77, 0.1);
  
  svg {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  }
`;

const CustomizeInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CustomizeTitle = styled.h3`
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.4rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CustomizeDescription = styled.p`
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  line-height: 1.6;
`;

function CustomizeCard() {
  return (
    <Card>
      <CornerBracket top left />
      <CornerBracket top right />
      <CornerBracket bottom left />
      <CornerBracket bottom right />
      <CustomizeImage>
        <HiSparkles />
      </CustomizeImage>
      <CustomizeInfo>
        <CustomizeTitle>
          CUSTOM REQUEST <HiSparkles style={{ fontSize: '1.2rem', color: '#ff4d4d' }} />
        </CustomizeTitle>
        <CustomizeDescription>
          Mission-specific configurations. Our engineers will architect a solution built for your unique operational parameters.
        </CustomizeDescription>
      </CustomizeInfo>
    </Card>
  );
}

export default CustomizeCard;