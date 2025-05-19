import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const SlideContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SlideControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const SlideCaption = styled(motion.div)`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem 2rem;
  border-radius: 4px;
  color: white;
  z-index: 10;
  text-align: center;
  backdrop-filter: blur(5px);
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f6f7f8 0%, #edeef1 100%);
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

// Default images and captions to prevent errors
const defaultImages = [
  '/images/default-slide.jpg'
];

const defaultCaptions = [
  'Default caption'
];

function Slideshow({ images = defaultImages, captions = defaultCaptions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // If no images are provided, don't render anything
  if (!images || images.length === 0) {
    return <LoadingPlaceholder />;
  }

  return (
    <SlideContainer>
      <AnimatePresence mode='wait'>
        {isLoading && <LoadingPlaceholder />}
        <Slide
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`} 
            onLoad={handleImageLoad}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          {captions && captions[currentIndex] && (
            <SlideCaption
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {captions[currentIndex]}
            </SlideCaption>
          )}
        </Slide>
      </AnimatePresence>
      <SlideControls>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </SlideControls>
    </SlideContainer>
  );
}

export default Slideshow; 
