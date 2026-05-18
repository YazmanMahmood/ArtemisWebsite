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
  padding: 0.6rem 1.2rem;
  background: ${props => props.active ? '#ff4d4d' : 'transparent'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  border: 1px solid ${props => props.active ? '#ff4d4d' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 2px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff4d4d;
    color: #fff;
    box-shadow: 0 0 15px rgba(255, 77, 77, 0.3);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.9rem 1.2rem;
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 2px;
  font-size: 0.9rem;
  font-family: 'Share Tech Mono', monospace;
  margin: 0 auto;
  display: block;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:focus {
    outline: none;
    border-color: #ff4d4d;
    background: rgba(255, 77, 77, 0.08);
    box-shadow: 0 0 20px rgba(255, 77, 77, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

function ProductsFilter({ categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  return (
    <FilterContainer>
      {categories.length > 0 && (
        <FilterGroup>
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
      )}
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