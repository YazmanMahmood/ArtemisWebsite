import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, set, child } from 'firebase/database';
import { firebaseConfig } from '../firebase/config';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ... existing styled components ...

const SupportContainer = styled.div`
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
    font-size: clamp(2rem, 5vw, 4rem);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 8px;
    color: #fff;
    
    span {
      color: #ff4d4d;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

const SupportContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: rgba(15, 15, 15, 0.8);
  padding: 3rem;
  border: 1px solid rgba(255, 77, 77, 0.2);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff4d4d, transparent);
  }
`;

const CornerBracket = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #ff4d4d;
  
  ${props => props.top && 'top: -1px;'}
  ${props => props.bottom && 'bottom: -1px;'}
  ${props => props.left && 'left: -1px; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: -1px; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  label {
    font-size: 0.8rem;
    color: #ff4d4d;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  input, textarea, select {
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(30, 30, 30, 0.4);
    color: #fff;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #ff4d4d;
      box-shadow: 0 0 15px rgba(255, 77, 77, 0.2);
      background: rgba(30, 30, 30, 0.6);
    }
  }

  select {
    cursor: pointer;
    option {
      background: #111;
      color: #fff;
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1.2rem;
  background: transparent;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 77, 77, 0.2), transparent);
    transition: 0.5s;
  }

  &:hover::after {
    left: 100%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessPopup = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #000;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
  padding: 1.5rem 2.5rem;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(255, 77, 77, 0.3);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
`;

function SupportPage() {
  useScrollToTop();
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
      
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });

      // 1. Capture IP (Guaranteed)
      let visitorIP = 'unknown';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        visitorIP = ipData.ip;
      } catch (e) { console.error("IP Fetch failed"); }

      // 2. Capture Detailed Location & ISP (Fallback)
      let locationData = {};
      try {
        const locRes = await fetch(`https://ip-api.com/json/${visitorIP}`);
        const locInfo = await locRes.json();
        if (locInfo.status === 'success') {
          locationData = {
            City: locInfo.city,
            Region: locInfo.regionName,
            Country: locInfo.country,
            Latitude: locInfo.lat,
            Longitude: locInfo.lon,
            ISP: locInfo.isp
          };
        }
      } catch (e) { console.error("Location Fetch failed"); }

      // 3. Capture Unique Device Fingerprint
      let deviceID = 'unknown';
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        deviceID = result.visitorId;
      } catch (e) { console.error("Fingerprint failed"); }

      const visitorMetadata = {
        IP: visitorIP,
        ...locationData,
        DeviceID: deviceID,
        UserAgent: navigator.userAgent,
        Language: navigator.language,
        Platform: navigator.platform,
        ScreenResolution: `${window.screen.width}x${window.screen.height}`,
      };

      const submissionData = {
        Name: formData.name,
        Email: formData.email,
        Category: formData.category,
        Question: formData.question,
        timestamp: formattedTime,
        submissionNumber: currentCount,
        ...visitorMetadata
      };

      const submissionRef = ref(db, `Submissions/submission${currentCount}`);
      
      await Promise.all([
        set(counterRef, currentCount),
        set(submissionRef, submissionData)
      ]);

      setFormData({ name: '', email: '', category: '', question: '' });
      setSubmitStatus('success');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SupportContainer>
      <DataGrid />
      
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Support <span>Center</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          How can we help? // Priority Support
        </motion.p>
      </Header>

      <SupportContent>
        <CornerBracket top left />
        <CornerBracket top right />
        <CornerBracket bottom left />
        <CornerBracket bottom right />
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="ENTER YOUR NAME..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="ENTER YOUR EMAIL..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Support Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">SELECT CATEGORY...</option>
              <option value="technical">Technical Support</option>
              <option value="product">Product Information</option>
              <option value="billing">Billing</option>
              <option value="other">Other</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label>Message</label>
            <textarea
              name="question"
              placeholder="ENTER YOUR MESSAGE..."
              value={formData.question}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={isLoading}
            whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(255, 77, 77, 0.3)' }}
            whileTap={{ scale: 0.99 }}
          >
            {isLoading ? 'SENDING...' : 'SUBMIT'}
          </SubmitButton>
          
          {submitStatus === 'error' && (
            <StatusMessage>
              ERROR: UNABLE TO SEND MESSAGE.
            </StatusMessage>
          )}
        </Form>
      </SupportContent>

      <AnimatePresence>
        {showPopup && (
          <SuccessPopup
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            Message Sent Successfully
          </SuccessPopup>
        )}
      </AnimatePresence>
    </SupportContainer>
  );
}

const StatusMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #f44336;
  text-align: center;
  background: rgba(198, 40, 40, 0.1);
  color: #f44336;
  font-size: 0.8rem;
  letter-spacing: 1px;
`;

export default SupportPage;