import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ConsentBanner = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  color: #ff4d4d;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Text = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: ${props => props.primary ? '#ff4d4d' : 'transparent'};
  color: #ffffff;
  border: 1px solid #ff4d4d;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.primary ? '#e60000' : 'rgba(255, 77, 77, 0.1)'};
    transform: translateY(-2px);
  }
`;

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('artemis_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('artemis_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('artemis_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ConsentBanner
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Content>
            <Title>Cookie Intelligence</Title>
            <Text>
              We use digital cookies to enhance your tactical experience and analyze our drone network performance.
            </Text>
          </Content>
          <ButtonGroup>
            <Button onClick={handleDecline}>Decline</Button>
            <Button primary onClick={handleAccept}>Accept All</Button>
          </ButtonGroup>
        </ConsentBanner>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
