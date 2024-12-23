import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    height: 150px;
    width: auto;
    transform-origin: center;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.1));
  }
`;

function LoadingScreen({ isLoading, onAnimationComplete }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          <LogoContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            onAnimationComplete={onAnimationComplete}
          >
            <img src="/images/newlogo.png" alt="Artemis Logo" />
          </LogoContainer>
        </LoadingContainer>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen; 