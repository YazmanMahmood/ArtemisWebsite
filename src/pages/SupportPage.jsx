import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, set } from 'firebase/database';
import { firebaseConfig } from '../firebase/config';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const SupportContainer = styled.div`
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

const SupportContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: var(--dark-accent);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: var(--text-light);
  }

  input, textarea, select {
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    font-size: 1rem;
    background: var(--medium-dark);
    color: var(--text-light);

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.2);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`;

const SuccessPopup = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
`;

function SupportPage() {
  useScrollToTop();
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    question: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const counterRef = ref(db, 'submissionCounter');
      const counterSnapshot = await get(counterRef);
      const currentCount = (counterSnapshot.exists() ? counterSnapshot.val() : 0) + 1;
      
      // Format current date and time
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const submissionData = {
        Name: formData.name,
        Email: formData.email,
        Category: formData.category,
        Question: formData.question,
        timestamp: formattedTime,
        submissionNumber: currentCount
      };

      const submissionRef = ref(db, `Submissions/submission${currentCount}`);
      
      await Promise.all([
        set(counterRef, currentCount),
        set(submissionRef, submissionData)
      ]);

      setFormData({
        name: '',
        email: '',
        category: '',
        question: ''
      });
      
      setSubmitStatus('success');
      setShowPopup(true);
      
      // Auto hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <SupportContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Support & Resources
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Need help? Submit your question below and our team will get back to you.
        </motion.p>
      </Header>

      <SupportContent>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="technical">Technical Support</option>
              <option value="product">Product Information</option>
              <option value="billing">Billing</option>
              <option value="other">Other</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label>Your Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <SubmitButton 
            type="submit" 
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Submitting...' : 'Submit Question'}
          </SubmitButton>
          
          {submitStatus === 'success' && (
            <StatusMessage success>
              Thank you! We'll get back to you soon.
            </StatusMessage>
          )}
          
          {submitStatus === 'error' && (
            <StatusMessage>
              Sorry, there was an error. Please try again.
            </StatusMessage>
          )}
        </Form>
      </SupportContent>

      {showPopup && (
        <SuccessPopup
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        >
          Message submitted successfully!
        </SuccessPopup>
      )}
    </SupportContainer>
  );
}

const StatusMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  background: ${props => props.success ? 'rgba(46, 125, 50, 0.2)' : 'rgba(198, 40, 40, 0.2)'};
  color: ${props => props.success ? '#4caf50' : '#f44336'};
`;

export default SupportPage;
