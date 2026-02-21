// src/components/fpv/FPVPage.jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import { app } from '../../firebase/config'; // ✅ Your existing path
import { getDatabase, ref, set, get, child, serverTimestamp } from 'firebase/database';

// Container
const FPVContainer = styled.div`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const FPVHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: var(--dark);
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: inherit;
  }

  p {
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.6;
    font-family: inherit;
  }
`;

const FPVGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const InfoSection = styled(motion.div)`
  background: var(--dark-accent);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: white;
    margin-bottom: 1.5rem;
    text-align: center;
    font-family: inherit;
  }

  ul {
    list-style: none;
    padding: 0;
    max-width: 800px;
    margin: 0 auto;
  }

  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    color: var(--text-light);
    font-size: 1rem;
    font-family: inherit;
  }

  li::before {
    content: '✓';
    color: #0A84FF;
    font-weight: bold;
    margin-right: 0.75rem;
    background: rgba(10, 132, 255, 0.1);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: 3rem;

  h3 {
    color: var(--dark);
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-family: inherit;
  }

  p {
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto 1.5rem;
    font-family: inherit;
  }
`;

const Button = styled.button`
  padding: 0.9rem 2rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #0070e0;
    transform: translateY(-2px);
  }
`;

// ✅ MODAL
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--dark);
  color: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  font-family: inherit;
  &:hover { color: white; }
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  background: var(--dark);
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--dark); /* ✅ BLACK TEXT */
`;

const ModalBody = styled.div`
  padding: 0 2rem 1rem;
  overflow-y: auto;
  flex: 1;
  max-height: 60vh;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
  }
`;

const ModalFooter = styled.div`
  padding: 0 2rem 1.5rem;
  text-align: center;
  position: sticky;
  bottom: 0;
  background: var(--dark);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// ✅ ALL LABELS BLACK
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #000000; /* ✅ BLACK */
  font-size: 0.95rem;
  font-family: inherit;
`;

// ✅ INPUTS: WHITE BG + BLACK TEXT
const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  color: var(--dark);
  font-size: 1rem;
  font-family: inherit;

  &::placeholder {
    color: #666;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 0.85rem 0.85rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  color: var(--dark);
  font-size: 1rem;
  font-family: inherit;
  appearance: none;
  background-image: url("image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;

  option {
    color: var(--dark);
    background: white;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  color: var(--dark);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #666;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 1rem;
`;

const SuccessMessage = styled(motion.div)`
  background: #34C759;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-family: inherit;
`;

// ✅ DRONE DATA (unchanged)
const fpvDrones = [
  {
    id: 1,
    name: 'Artemis Racer',
    image: '/images/prod1.jpg',
    category: 'FPV Racing',
    description: 'Next-gen racing drone with intelligent flight assist and cinematic 4K capture.',
    specs: {
      flightTime: '25 min',
      camera: '4K 120fps HDR',
      range: '6 km ',
      maxSpeed: '140 km/h',
      frame: '5" Carbon Fiber w/ Modular Arm System',
    },
    features: [
      'AI-powered drift correction',
      'Modular arm system: swap in <60 sec',
      'Real-time telemetry overlay',
      'Onboard DVR + microSD (512GB)',
      'FPV Simulator-ready firmware'
    ],
    tags: ['fpv', 'racing', '4k', 'ai', 'modular']
  },
  {
    id: 2,
    name: 'Artemis Freestyle Pro',
    image: '/images/prod2.jpg',
    category: 'FPV Freestyle',
    description: 'The ultimate cinematic freestyle platform — buttery-smooth flight, professional-grade imaging.',
    specs: {
      flightTime: '35 minutes (dual hot-swap batteries)',
      camera: '4K 60fps',
      range: '10 km ',
      maxSpeed: '95 km/h',
      frame: '6"  Vibration-Damped',
    },
    features: [
      'Optional 3-axis gimbal',
      'AI Cinematic Modes: Orbit, Dolly Zoom, Follow-Me',
      'Live color grading preview',
      'Dual battery hot-swap',
      'Built-in LED sync for night filming'
    ],
    tags: ['fpv', 'freestyle', 'cinematic', '4k', 'ai']
  },
  {
    id: 3,
    name: 'Artemis Scout Mini',
    image: '/images/prod3.jpg',
    category: 'FPV Surveillance',
    description: 'Compact, long-endurance tactical FPV drone for reconnaissance and inspection.',
    specs: {
      flightTime: '40 minutes',
      camera: 'Dual 4K + Thermal',
      range: '10 km ',
      maxSpeed: '75 km/h',
      frame: 'Stealth Black Composite, IP54',

    },

    tags: ['fpv', 'surveillance', 'tactical', 'thermal', 'ai', 'long-range']
  }
];

const ProductCardWithOrder = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ProductCard product={product} />
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '0.8rem',
          background: '#ff3b30',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: '1rem',
          fontFamily: 'inherit'
        }}
      >
        Order Now
      </motion.button>

      {isModalOpen && <OrderModal drone={product} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

// ✅ CRITICAL: Firebase save logic with fpvorder1, fpvorder2...
const OrderModal = ({ drone, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    preferredContact: 'phone',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const db = getDatabase(app);
      const fpvOrdersRef = ref(db, 'fpvorders'); // ✅ Node name: 'fpvorders'

      // Get all existing keys to find max number
      const snapshot = await get(fpvOrdersRef);
      let nextId = 1;

      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        // Extract numbers from keys like 'fpvorder5'
        const ids = keys
          .map(key => {
            const match = key.match(/^fpvorder(\d+)$/);
            return match ? parseInt(match[1], 10) : 0;
          })
          .filter(id => id > 0);

        if (ids.length > 0) {
          nextId = Math.max(...ids) + 1;
        }
      }

      // ✅ Save as fpvorder1, fpvorder2, ...
      const orderKey = `fpvorder${nextId}`;
      await set(child(fpvOrdersRef, orderKey), {
        droneId: drone.id,
        droneName: drone.name,
        name: formData.name,
        contact: formData.contact,
        address: formData.address,
        preferredContact: formData.preferredContact,
        message: formData.message || '',
        timestamp: serverTimestamp(),
        status: 'pending-contact'
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 4000);
    } catch (err) {
      console.error('Firebase order save error:', err);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalHeader>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#ff3b30', fontFamily: 'inherit' }}>
            Order <span style={{ color: '#000000' }}>{drone.name}</span>
          </h2>
        </ModalHeader>

        <ModalBody>
          {submitSuccess ? (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✅ Thank you! Our representative will contact you shortly.
            </SuccessMessage>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Alex Johnson"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contact">Email or Phone *</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="e.g., alex@example.com or +1 555-123-4567"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address">Shipping Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Street, City, State, ZIP, Country"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                >
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="teams">Microsoft Teams</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Configuration Notes (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g., Need thermal camera, DJI Goggles compatibility..."
                />
              </FormGroup>
            </form>
          )}
        </ModalBody>

        {!submitSuccess && (
          <ModalFooter>
            <SubmitButton type="submit" disabled={isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </SubmitButton>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const FPVPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInquirySubmit = async () => {
    setIsSubmitting(true);
    try {
      const db = getDatabase(app);
      const inquiriesRef = ref(db, 'FPV_Inquiries');
      const snapshot = await get(inquiriesRef);
      let nextId = 1;
      if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val());
        const ids = keys.map(k => parseInt(k.replace('fpv_inquiry_', ''))).filter(n => !isNaN(n));
        if (ids.length > 0) nextId = Math.max(...ids) + 1;
      }

      await set(child(inquiriesRef, `fpv_inquiry_${nextId}`), {
        type: 'FPV Info Request',
        timestamp: serverTimestamp(),
        status: 'pending'
      });

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      console.error('FPV inquiry error:', err);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FPVContainer>
      <FPVHeader
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Professional-Grade FPV Systems</h1>
        <p>
          Engineered for performance: up to <strong>40 minutes flight time</strong>,
          <strong>4K HDR video</strong>, <strong>10 km range</strong>, and AI-powered flight intelligence.
        </p>
      </FPVHeader>

      <FPVGrid>
        {fpvDrones.map((drone, index) => (
          <motion.div
            key={drone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <ProductCardWithOrder product={drone} />
          </motion.div>
        ))}
      </FPVGrid>




    </FPVContainer>
  );
};

export default FPVPage;