import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { getDatabase, ref, set, get } from 'firebase/database';

const CustomizeContainer = styled.div`
  padding: 120px 2rem 80px;
  min-height: 100vh;
  background: var(--light);

  @media (max-width: 768px) {
    padding: 100px 1rem 60px;
  }
`;

const CustomizeHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;  

  h1 {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
  }
`;

const CustomizationForm = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--dark-accent);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--medium-dark);
  color: var(--text-light);
  font-size: 1rem;

  option {
    background: var(--medium-dark);
    color: var(--text-light);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--medium-dark);
  color: var(--text-light);
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--medium-dark);
  color: var(--text-light);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: var(--text-muted);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: #34C759;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
`;

const industryOptions = [
  'Agriculture', 
  'Warehouse Monitoring', 
  'Security', 
  'Forestry', 
  'Industrial Monitoring', 
  'Construction', 
  'Search & Rescue', 
  'Filmmaking', 
  'Other'
];

const droneOptions = [
  'Artemis Scout'
];

// Helper function to format timestamp in your requested format
const getFormattedTimestamp = () => {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Karachi'
  };
  return now.toLocaleDateString('en-US', options).replace(/,(\s+)(\d+:\d+:\d+)/, ' at $2');
};

// Helper function to get next custom order ID
const getNextCustomOrderId = async (db) => {
  try {
    const customOrdersRef = ref(db, 'customizeRequests');
    const snapshot = await get(customOrdersRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const keys = Object.keys(data);
      
      // Filter keys that match customorder pattern and extract numbers
      const orderNumbers = keys
        .filter(key => key.startsWith('customorder'))
        .map(key => {
          const match = key.match(/customorder(\d+)/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter(num => !isNaN(num));
      
      // Get the highest number and increment by 1
      const maxNumber = orderNumbers.length > 0 ? Math.max(...orderNumbers) : 0;
      return `customorder${maxNumber + 1}`;
    } else {
      // If no data exists, start with customorder1
      return 'customorder1';
    }
  } catch (error) {
    console.error('Error getting next custom order ID:', error);
    // Fallback to a simple counter instead of timestamp
    return `customorder${Math.floor(Math.random() * 1000) + 1}`;
  }
};

function CustomizePage() {
  useScrollToTop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    droneModel: '',
    industry: '',
    customRequirements: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const db = getDatabase();
      
      // Get the next custom order ID
      const customOrderId = await getNextCustomOrderId(db);
      
      // Create reference with the custom order ID
      const customizeRequestRef = ref(db, `customizeRequests/${customOrderId}`);
      
      // Get formatted timestamp
      const formattedTimestamp = getFormattedTimestamp();
      
      // Save the form data with formatted timestamp
      await set(customizeRequestRef, {
        orderId: customOrderId,
        customerDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company
        },
        orderDetails: {
          droneModel: formData.droneModel,
          industry: formData.industry,
          customRequirements: formData.customRequirements
        },
        timestamp: formattedTimestamp, // This will be "February 15, 2025 at 12:54:00 PM"
        status: 'pending',
        submittedAt: new Date().toISOString()
      });
      
      console.log('Saved with timestamp:', formattedTimestamp); // Debug log
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        droneModel: '',
        industry: '',
        customRequirements: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting customization request:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <CustomizeContainer>
      <CustomizeHeader>
        <h1>Customize Your Drone</h1>
        <p>Let us know your specific requirements and we'll help you build the perfect drone solution.</p>
      </CustomizeHeader>
      
      <CustomizationForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="droneModel">Select Drone Model</Label>
          <Select 
            id="droneModel" 
            name="droneModel" 
            value={formData.droneModel}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a drone model --</option>
            {droneOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="industry">Industry</Label>
          <Select 
            id="industry" 
            name="industry" 
            value={formData.industry}
            onChange={handleChange}
            required
          >
            <option value="">-- Select your industry --</option>
            {industryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="customRequirements">Custom Requirements</Label>
          <Textarea
            id="customRequirements"
            name="customRequirements"
            value={formData.customRequirements}
            onChange={handleChange}
            placeholder="Describe your specific needs and requirements..."
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="name">Your Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="company">Company Name</Label>
          <Input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </SubmitButton>
        
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your customization request has been submitted! We'll contact you shortly.
          </SuccessMessage>
        )}
      </CustomizationForm>
    </CustomizeContainer>
  );
}

export default CustomizePage;
