import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { InlineWidget } from 'react-calendly';

const ContactContainer = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  padding: 140px 2rem 80px;
  position: relative;
  overflow: hidden;
`;

const DataGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(255, 77, 77, 0.05) 1px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
  position: relative;
  z-index: 2;

  h1 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 12px;
    font-weight: 700;
    
    span {
      color: #ff4d4d;
      text-shadow: 0 0 20px rgba(255, 77, 77, 0.5);
    }
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
`;

const ContactContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.7rem;
  color: #ff4d4d;
  letter-spacing: 2px;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #ff4d4d;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff4d4d;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

const CornerBracket = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border: 1px solid rgba(255, 77, 77, 0.3);
  transition: all 0.3s ease;
  
  ${props => props.top && 'top: 0;'}
  ${props => props.bottom && 'bottom: 0;'}
  ${props => props.left && 'left: 0; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: 0; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const ContactCard = styled(motion.div)`
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  transition: all 0.4s ease;

  &:hover {
    border-color: rgba(255, 77, 77, 0.4);
    background: rgba(20, 20, 20, 0.8);
    transform: translateX(10px);

    ${CornerBracket} {
      border-color: #ff4d4d;
      width: 25px;
      height: 25px;
    }
  }

  h3 {
    color: #fff;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .email {
    color: #ff4d4d;
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: block;
    font-size: 1.1rem;
    letter-spacing: 1px;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .response-time {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

const CalendlySection = styled(motion.div)`
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  padding: 2rem;
  height: 800px;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(255, 77, 77, 0.4);
    
    ${CornerBracket} {
      border-color: #ff4d4d;
      width: 25px;
      height: 25px;
    }
  }
`;

const CalendlyHeader = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    color: #fff;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    
    span {
      color: #ff4d4d;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    letter-spacing: 1px;
    line-height: 1.6;
  }
`;

const CalendlyWidgetWrapper = styled.div`
  flex: 1;
  min-height: 0;
  border-radius: 4px;
  overflow: hidden;
  
  /* Custom scrollbar for Calendly if needed */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb {
    background: #ff4d4d;
  }
`;

function ContactPage() {
  useScrollToTop();
  
  return (
    <ContactContainer>
      <DataGrid />
      
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact <span>Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We're here to help you. // Get in touch
        </motion.p>
      </Header>

      <ContactContent>
        <MainGrid>
          <ContactGrid>
            <ContactCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CornerBracket top left />
              <CornerBracket top right />
              <CornerBracket bottom left />
              <CornerBracket bottom right />
              <StatusIndicator>Email Support</StatusIndicator>
              <h3>Technical Support</h3>
              <a href="mailto:umair@artemisuav.com" className="email">umair@artemisuav.com</a>
              <span className="response-time">EST. RESPONSE: WITHIN 24H</span>
            </ContactCard>

            <ContactCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CornerBracket top left />
              <CornerBracket top right />
              <CornerBracket bottom left />
              <CornerBracket bottom right />
              <StatusIndicator>Sales Support</StatusIndicator>
              <h3>Sales Inquiries</h3>
              <a href="mailto:yazman@artemisuav.com" className="email">yazman@artemisuav.com</a>
              <span className="response-time">EST. RESPONSE: WITHIN 24H</span>
            </ContactCard>

            <ContactCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CornerBracket top left />
              <CornerBracket top right />
              <CornerBracket bottom left />
              <CornerBracket bottom right />
              <StatusIndicator>Emergency Line</StatusIndicator>
              <h3>Emergency Support</h3>
              <span className="email">+92 310-4768835</span>
              <span className="response-time">AVAILABLE 24/7</span>
            </ContactCard>
          </ContactGrid>

          <CalendlySection
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CornerBracket top left />
            <CornerBracket top right />
            <CornerBracket bottom left />
            <CornerBracket bottom right />
            
            <CalendlyHeader>
              <h2>Book a <span>Meeting</span></h2>
              <p>You Can Book a 30 Minutes Slot and Discuss Your Business Requirements!</p>
            </CalendlyHeader>

            <CalendlyWidgetWrapper>
              <InlineWidget 
                url="https://calendly.com/uavartemis/new-meeting" 
                styles={{
                  height: '100%',
                  width: '100%'
                }}
                pageSettings={{
                  backgroundColor: '000000',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: 'ff4d4d',
                  textColor: 'ffffff'
                }}
              />
            </CalendlyWidgetWrapper>
          </CalendlySection>
        </MainGrid>
      </ContactContent>
    </ContactContainer>
  );
}

export default ContactPage;