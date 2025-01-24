import { useState, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import ProductsFilter from '../components/products/ProductsFilter';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ProductsContainer = styled.div`
  padding: 80px 2rem;
  min-height: 100vh;
  background: var(--light);

  @media (max-width: 768px) {
    padding: 60px 1rem;
  }
`;

const ProductsHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;  

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const productsData = [
  {
    id: 1,
    name: 'Artemis FireFly',
    image: '/images/ArtemisGuardian3000.jpeg',
    category: 'Firefighting',
    description: 'Advanced firefighting drone with thermal imaging and precision water deployment.',
    specs: {
      range: '10km',
      flightTime: '45 minutes',
      payload: '20kg',
      sensors: ['Thermal', 'RGB', 'LiDAR']
    },
    features: [
      'Real-time thermal mapping',
      'Automated fire suppression',
      'Night vision capabilities',
      'Weather-resistant design'
    ],
    tags: ['firefighting', 'thermal', 'water deployment']
  },
  {
    id: 2,
    name: 'Artemis Sentinel',
    image: '/images/ArtemisSentinelX5.jpeg',
    category: 'Security',
    description: 'AI-powered security drone with advanced threat detection.',
    specs: {
      range: '15km',
      flightTime: '60 minutes',
      camera: '8K Ultra HD',
      sensors: ['Night Vision', 'Motion', 'Acoustic']
    },
    features: [
      'AI threat detection',
      'Autonomous patrolling',
      'Facial recognition',
      'Encrypted communication'
    ],
    tags: ['security', 'surveillance', 'AI']
  },
  {
    id: 3,
    name: 'Artemis Rescue ',
    image: '/images/Artemisrescue200.jpeg',
    category: 'Dual-Purpose',
    description: 'Versatile drone for both firefighting and security operations.',
    specs: {
      range: '12km',
      flightTime: '50 minutes',
      payload: '15kg',
      sensors: ['Multispectral', 'Gas', 'Heat']
    },
    features: [
      'Modular payload system',
      'Emergency response mode',
      'All-weather operation',
      'Quick deployment system'
    ],
    tags: ['rescue', 'firefighting', 'security']
  }
];

const categories = ['Firefighting', 'Security', 'Dual-Purpose'];

function ProductsPage() {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, activeCategory, searchQuery]);

  return (
    <ProductsContainer>
      <ProductsHeader>
      <motion.h1
  initial={{ opacity: 0, y: 40 }} // Start lower
  animate={{ opacity: 1, y: 20 }} // End lower
  transition={{ duration: 0.5 }}
>
  Explore Our Cutting-Edge Drones
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover Artemis' lineup of advanced drones designed to tackle firefighting 
          challenges and enhance security operations.
        </motion.p>
      </ProductsHeader>

      <ProductsFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ProductsGrid>
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
}

export default ProductsPage;