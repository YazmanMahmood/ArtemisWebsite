import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const FilterContainer = styled.div`
  margin-bottom: 4rem;
`;

const FilterGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? 'transparent' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin: 0 auto;
  display: block;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.1);
  }
`;

function ProductsFilter({ categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  return (
    <FilterContainer>
      <FilterGroup>
        <FilterButton
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Products
        </FilterButton>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterGroup>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </FilterContainer>
  );
}

export default ProductsFilter; 