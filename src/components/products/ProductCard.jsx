import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
  background: #111;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255, 77, 77, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 77, 77, 0.5);
    box-shadow: 0 20px 40px rgba(255, 77, 77, 0.15);
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

const ProductImage = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .category {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: #ff4d4d;
    color: white;
    padding: 0.4rem 1rem;
    font-size: 0.7rem;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 2px;
    text-transform: uppercase;
    z-index: 5;
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.4rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  color: #fff;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  line-height: 1.6;
`;

const SpecsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;
  margin: 1rem 0;
  font-size: 0.75rem;
  font-family: 'Share Tech Mono', monospace;
  color: #ff4d4d;
  letter-spacing: 1px;
  text-transform: uppercase;

  div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 77, 77, 0.1);
    padding-bottom: 0.3rem;

    span {
      color: #fff;
    }
  }
`;

const DetailsButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background: transparent;
  color: #ff4d4d;
  border: 1px solid rgba(255, 77, 77, 0.3);
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 77, 77, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    background: rgba(255, 77, 77, 0.1);
    border-color: #ff4d4d;
    color: #fff;
    box-shadow: 0 0 15px rgba(255, 77, 77, 0.2);
    
    &::before {
      left: 100%;
    }
  }
`;

function ProductCard({ product }) {
  return (
    <Card>
      <CornerBracket top left />
      <CornerBracket top right />
      <CornerBracket bottom left />
      <CornerBracket bottom right />
      
      <ProductImage>
        <img src={product.image} alt={product.name} />
        <span className="category">{product.category}</span>
      </ProductImage>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <SpecsList>
          <div>Range <span>{product.specs.range}</span></div>
          <div>Flight Time <span>{product.specs.flightTime}</span></div>
          {product.specs.payload && <div>Payload <span>{product.specs.payload}</span></div>}
          {product.specs.camera && <div>Sensor <span>{product.specs.camera}</span></div>}
        </SpecsList>
        <DetailsButton to={`/product/${product.id}`}>
          View Parameters
        </DetailsButton>
      </ProductInfo>
    </Card>
  );
}

export default ProductCard;
