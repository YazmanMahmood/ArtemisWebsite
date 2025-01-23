import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
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
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: var(--dark);
`;

const ProductDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SpecsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.875rem;
`;



const LearnMoreButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`;

function ProductCard({ product }) {
  return (
    <Card>
      <ProductImage>
        <img src={product.image} alt={product.name} />
        <span className="category">{product.category}</span>
      </ProductImage>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <SpecsList>
          <div>Range: {product.specs.range}</div>
          <div>Flight Time: {product.specs.flightTime}</div>
          {product.specs.payload && <div>Payload: {product.specs.payload}</div>}
          {product.specs.camera && <div>Camera: {product.specs.camera}</div>}
        </SpecsList>
        <LearnMoreButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More
        </LearnMoreButton>
      </ProductInfo>
    </Card>
  );
}

export default ProductCard; 