import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const NewsContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

function NewsPage() {
  return (
    <NewsContainer>
      <h1>News & Updates</h1>
      <NewsGrid>
        {/* News items will go here */}
      </NewsGrid>
    </NewsContainer>
  );
}

export default NewsPage; 