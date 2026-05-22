import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { app } from '../firebase/config';
import { getDatabase, ref, set, get, child, serverTimestamp } from 'firebase/database';

const AutomationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AutomationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: minmax(300px, 1fr);
  }
`;

const AutomationCard = styled(motion.div)`
  background: linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(237, 19, 19, 0.8);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff4d4d, #ff8c42);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg,rgb(255, 10, 10),rgb(158, 36, 36));
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }
`;

const CardTitle = styled.h2`
  color: var(--dark);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CardDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  &:before {
    content: '✓';
    color: #ff4d4d;
    font-weight: bold;
    font-size: 1.1rem;
    margin-right: 0.8rem;
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
`;

const FeatureText = styled.span`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const RequestQuoteButton = styled.button`
  background: linear-gradient(135deg, #ff4d4d,rgb(199, 0, 0));
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(10, 132, 255, 0.4);
    
    &:before {
      left: 100%;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-light);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: var(--dark);
  }
`;

const FormTitle = styled.h2`
  color: var(--dark);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--dark);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #ff4d4d;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #ff4d4d;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #ff4d4d;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ff4d4d, #ff8c42);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 77, 77, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #34C759, #30D158);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 1rem;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(145deg, rgba(18, 18, 18, 0.95), rgba(10, 10, 10, 0.98));
  border: 1px solid rgba(255, 77, 77, 0.3);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 77, 77, 0.08);

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 77, 77, 0.3);
    border-radius: 3px;
  }

  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

const automationsData = [
  {
    id: 1,
    title: 'Smart Greenhouse Monitoring Solution',
    icon: '🌱',
    description: 'Optimize your greenhouse operations with our advanced monitoring and control system. Ensure ideal growing conditions and improve crop yield through precision agriculture technology.',
    features: [
      'Real-time monitoring of humidity, soil moisture, and temperature',
      'Automated control of fans and water sprinklers',
      'Web-based dashboard for data visualization',
      'Remote control capabilities via mobile or web',
      'Advanced analytics for improved crop growth'
    ]
  },
  {
    id: 2,
    title: 'Shrimp Farm Monitoring System',
    icon: '🦐',
    description: 'Maximize the efficiency and yield of your shrimp farming operations with our comprehensive monitoring solution. Monitor critical water parameters and control equipment from anywhere.',
    features: [
      'Monitor temperature, TDS, dissolved oxygen, and pH levels',
      'Manual and automatic aerator fan control',
      'Real-time data visualization on web dashboard',
      'Alert system for parameter threshold violations',
      'Historical data analysis for optimizing farm conditions'
    ]
  }
];

function AutomationsPage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    automationType: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleRequestQuote = (automation) => {
    setSelectedAutomation(automation);
    setFormData(prev => ({ ...prev, automationType: automation.title }));
    setShowQuoteForm(true);
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    setShowQuoteForm(false);
    setSelectedAutomation(null);
    if (formSubmitted) {
      setFormData({ name: '', email: '', phone: '', company: '', automationType: '', requirements: '' });
      setFormSubmitted(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const database = getDatabase(app);
      const automationQuotesRef = ref(database, 'Automation_Quotes');

      // Get the current count to create the next ID
      const snapshot = await get(automationQuotesRef);
      let nextQuoteId = 1;

      if (snapshot.exists()) {
        const quotes = snapshot.val();
        const quoteIds = Object.keys(quotes)
          .filter(key => key.startsWith('quote'))
          .map(key => parseInt(key.replace('quote', '')));

        if (quoteIds.length > 0) {
          nextQuoteId = Math.max(...quoteIds) + 1;
        }
      }

      // Save data with sequential quote ID
      const quoteKey = `quote${nextQuoteId}`;
      await set(child(automationQuotesRef, quoteKey), {
        ...formData,
        timestamp: serverTimestamp()
      });

      setFormSubmitted(true);


    } catch (error) {
      console.error("Error saving quote request:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AutomationsContainer>
        <AutomationsGrid>
          {automationsData.map((automation, index) => (
            <AutomationCard
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CardHeader>
                <CardIcon>{automation.icon}</CardIcon>
                <CardTitle>{automation.title}</CardTitle>
              </CardHeader>

              <CardDescription>{automation.description}</CardDescription>

              <FeaturesList>
                {automation.features.map((feature, idx) => (
                  <FeatureItem key={idx}>
                    <FeatureText>{feature}</FeatureText>
                  </FeatureItem>
                ))}
              </FeaturesList>

              <RequestQuoteButton onClick={() => handleRequestQuote(automation)}>
                Request a Quote
              </RequestQuoteButton>
            </AutomationCard>
          ))}
        </AutomationsGrid>
      </AutomationsContainer>

      {/* Quote Request Modal */}
      {showQuoteForm && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleCloseModal} style={{ color: 'rgba(255,255,255,0.5)' }}>✕</CloseButton>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <FormTitle style={{ color: '#fff', fontFamily: "'Share Tech Mono', monospace" }}>
                  {selectedAutomation ? selectedAutomation.title : 'Request a Quote'}
                </FormTitle>

                <FormGroup>
                  <Label style={{ color: 'rgba(255,255,255,0.7)' }}>Full Name *</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,77,77,0.2)', color: '#fff' }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,77,77,0.2)', color: '#fff' }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label style={{ color: 'rgba(255,255,255,0.7)' }}>Phone Number</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,77,77,0.2)', color: '#fff' }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label style={{ color: 'rgba(255,255,255,0.7)' }}>Company / Organization</Label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,77,77,0.2)', color: '#fff' }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label style={{ color: 'rgba(255,255,255,0.7)' }}>Automation Type</Label>
                  <Select
                    name="automationType"
                    value={formData.automationType}
                    onChange={handleInputChange}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,77,77,0.2)', color: '#fff' }}
                  >
                    {automationsData.map(a => (
                      <option key={a.id} value={a.title} style={{ background: '#121212' }}>{a.title}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ color: 'rgba(255,255,255,0.7)' }}>Specific Requirements</Label>
                  <Textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Describe your specific needs, scale of operations, timeline, or any customization requirements..."
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,77,77,0.2)', color: '#fff' }}
                  />
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </SubmitButton>
              </form>
            ) : (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✓</div>
                <h3 style={{ margin: '0 0 0.5rem' }}>Quote Request Submitted</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>Our team will review your requirements and get back to you shortly.</p>
              </SuccessMessage>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default AutomationsPage;