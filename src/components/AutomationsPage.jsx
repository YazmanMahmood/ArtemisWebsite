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
    background: linear-gradient(90deg, #0A84FF, #00C7BE);
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
    color: #00C7BE;
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
  background: linear-gradient(135deg, #0A84FF,rgb(199, 0, 0));
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
    border-color: #0A84FF;
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
    border-color: #0A84FF;
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
    border-color: #0A84FF;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #0A84FF, #00C7BE);
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
    box-shadow: 0 8px 25px rgba(10, 132, 255, 0.4);
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
              
              
            </AutomationCard>
          ))}
        </AutomationsGrid>
      </AutomationsContainer>

      
      
    </>
  );
}

export default AutomationsPage;
