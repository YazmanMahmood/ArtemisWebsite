// src/pages/ProductDetailsPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { allProductsData } from '../data/products';
import { useScrollToTop } from '../hooks/useScrollToTop';

const DetailsContainer = styled.div`
  padding: 120px 2rem 80px;
  min-height: 100vh;
  background: #fdfdfd; /* Very subtle off-white for minimalism */
  color: #111;
  font-family: 'Montserrat', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid var(--dark);
  color: var(--dark);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: var(--dark);
    color: white;
  }
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 5rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: white;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const InfoSection = styled.div`
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    color: #111;
    font-weight: 700;
  }

  .type {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #f0f0f0;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  .description {
    font-size: 1.2rem;
    line-height: 1.7;
    color: #444;
    margin-bottom: 2.5rem;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

const SpecCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .label {
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #000;
  }
`;

const FeaturesSection = styled.div`
  background: white;
  padding: 4rem 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  color: #111;
  margin-top: 4rem;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
    text-align: center;
    color: #000;
    font-weight: 700;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    list-style: none;
    padding: 0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    color: #000000; /* ✅ Changed from var(--text-light) to black */

    &:before {
      content: '✓';
      color: #34C759;
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
`;

const ActionFooter = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const OrderButton = styled(motion.button)`
  padding: 1.2rem 3rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 59, 48, 0.3);

  &:hover {
    background: #e02e23;
  }
`;

function ProductDetailsPage() {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProductsData.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <DetailsContainer>
        <ContentWrapper>
          <h1>Product Not Found</h1>
          <BackButton onClick={() => navigate('/products')}>Back to Products</BackButton>
        </ContentWrapper>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <ContentWrapper>
        <BackButton onClick={() => navigate('/products')}>← Back to Products</BackButton>

        <HeroSection>
          <ImageWrapper
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={product.image} alt={product.name} />
          </ImageWrapper>

          <InfoSection>
            <motion.span
              className="type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.type}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {product.name}
            </motion.h1>

            <motion.p
              className="description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {product.description}
            </motion.p>
          </InfoSection>
        </HeroSection>

        <motion.h2
          style={{ marginBottom: '2rem', color: '#111' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Specifications
        </motion.h2>
        <SpecsGrid>
          {Object.entries(product.specs).map(([key, value], index) => (
            <SpecCard
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="label">{key.replace(/([A-Z])/g, ' $1')}</div>
              <div className="value">{value}</div>
            </SpecCard>
          ))}
        </SpecsGrid>

        <FeaturesSection>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <ul>
            {product.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </FeaturesSection>

        <ActionFooter>
          <OrderButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
          >
            Inquire Now
          </OrderButton>
        </ActionFooter>
      </ContentWrapper>
    </DetailsContainer>
  );
}

export default ProductDetailsPage;
