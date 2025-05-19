import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--dark);
    text-align: center;
  }

  p {
    color: var(--text-light);
    margin-bottom: 2rem;
    line-height: 1.6;
    text-align: center;
  }
`;

const ContactCard = styled(motion.div)`
  background: var(--dark-accent);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  }

  h3 {
    color: var(--dark);
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  .email {
    color: var(--primary);
    font-weight: 500;
    margin-bottom: 0.8rem;
    display: block;
    font-size: 1.1rem;
  }

  .response-time {
    color: var(--text-muted);
    font-size: 0.9rem;
  }
`;

function ContactPage() {
  useScrollToTop();
  
  return (
    <ContactContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get in touch with our dedicated support teams
        </motion.p>
      </Header>

      <ContactContent>
        <ContactInfo>
          <h2>Direct Contact</h2>
          <p>For immediate assistance, you can reach our support team at:</p>
          
          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Technical Support</h3>
            <span className="email">uavartemis@gmail.com</span>
            <span className="response-time">Response time: Within 24 hours</span>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Sales Inquiries</h3>
            <span className="email">uavartemis@gmail.com</span>
            <span className="response-time">Response time: Within 24 hours</span>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Emergency Support</h3>
            <span className="email">+92 310-4768835</span>
            <span className="response-time">24/7 emergency support line</span>
          </ContactCard>
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
}

export default ContactPage;
