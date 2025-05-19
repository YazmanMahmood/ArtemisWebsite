import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollToTop } from '../hooks/useScrollToTop';
import { Link } from "react-router-dom";

// Styled components
const AutomationsContainer = styled.div`
  padding: 80px 2rem;
  min-height: 100vh;
  background: var(--light);
`;

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--text-light);
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: var(--dark-accent);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  
  .product-image {
    height: 200px;
    overflow: hidden;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
    }
  }
  
  .product-content {
    padding: 2rem;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--dark);
    }
    
    p {
      color: var(--text-light);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
  }
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem;
  
  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-muted);
    
    &:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--primary);
      font-weight: bold;
    }
  }
`;

const ExpandButton = styled(Link)`
  display: inline-block;
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const AutomationsPage = () => {
  useScrollToTop();
  const [automationRef, automationInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <AutomationsContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Artemis Automations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our smart automation solutions for agriculture and aquaculture
        </motion.p>
      </Header>
      
      <div ref={automationRef}>
        <ProductsGrid>
          <ProductCard
            initial={{ opacity: 0, y: 30 }}
            animate={automationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="product-image">
              <div className="overlay"></div>
            </div>
            <div className="product-content">
              <h3>Smart Greenhouse Monitoring Solution</h3>
              <p>
                Optimize your greenhouse operations with our advanced monitoring and control system. 
                Ensure ideal growing conditions and improve crop yield through precision agriculture technology.
              </p>
              <FeaturesList>
                <li>Real-time monitoring of humidity, soil moisture, and temperature</li>
                <li>Automated control of fans and water sprinklers</li>
                <li>Web-based dashboard for data visualization</li>
                <li>Remote control capabilities via mobile or web</li>
                <li>Advanced analytics for improved crop growth</li>
              </FeaturesList>
              <ExpandButton to="/contact">Learn More</ExpandButton>
            </div>
          </ProductCard>
          
          <ProductCard
            initial={{ opacity: 0, y: 30 }}
            animate={automationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="product-image">
              <div className="overlay"></div>
            </div>
            <div className="product-content">
              <h3>Shrimp Farm Monitoring System</h3>
              <p>
                Maximize the efficiency and yield of your shrimp farming operations with our comprehensive
                monitoring solution. Monitor critical water parameters and control equipment from anywhere.
              </p>
              <FeaturesList>
                <li>Monitor temperature, TDS, dissolved oxygen, and pH levels</li>
                <li>Manual and automatic aerator fan control</li>
                <li>Real-time data visualization on web dashboard</li>
                <li>Alert system for parameter threshold violations</li>
                <li>Historical data analysis for optimizing farm conditions</li>
              </FeaturesList>
              <ExpandButton to="/contact">Learn More</ExpandButton>
            </div>
          </ProductCard>
        </ProductsGrid>
      </div>
    </AutomationsContainer>
  );
};

export default AutomationsPage; 
