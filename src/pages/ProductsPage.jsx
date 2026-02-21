// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import CustomizeCard from '../components/products/CustomizeCard';
import ProductsFilter from '../components/products/ProductsFilter';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { app } from '../firebase/config';
import { getDatabase, ref, set, get, child, serverTimestamp } from 'firebase/database';
import { outdoorResponseDrones, publicSafetyDrones, allProductsData } from '../data/products';

const categories = ['Outdoor Response', 'Public Safety', 'All Products'];

// ====== STYLED COMPONENTS ======
const ProductsContainer = styled.div`
  padding: 80px 2rem;
  min-height: 100vh;
  background: var(--light);

  @media (max-width: 768px) {
    padding: 60px 1rem;
  }
`;

const ProductsHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;  

  h1 {
    color: var(--dark);
  }

  p {
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
  }
`;

// ✅ 3 cards per row on desktop
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ✅ 3 per row */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const OrderButton = styled(motion.button)`
  width: 100%;
  margin-top: auto;
  padding: 0.8rem 1rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  text-align: center;

  &:hover {
    background: #0070e0;
    transform: translateY(-2px);
  }
`;

const CustomizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CustomizeButton = styled(motion.button)`
  width: 100%;
  margin-top: auto;
  padding: 0.8rem 1rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  text-align: center;

  &:hover {
    background: #0070e0;
    transform: translateY(-2px);
  }
`;

const CatalogueButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 4px 15px rgba(255, 59, 48, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: var(--secondary);
    box-shadow: 0 6px 20px rgba(255, 59, 48, 0.4);
    transform: translateY(-2px);
  }
`;

const CustomizationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--dark-accent);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: var(--dark);
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// ✅ Label: BLACK TEXT
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #000000; /* ✅ BLACK */
  font-weight: 600;
  font-size: 1rem;
`;

// ✅ Input: WHITE BG + BLACK TEXT
const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  color: #000000; /* ✅ BLACK TEXT */
  font-size: 1rem;
  font-family: inherit;

  &::placeholder {
    color: #666; /* ✅ visible placeholder */
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 0.85rem 0.85rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  color: #000000; /* ✅ BLACK TEXT */
  font-size: 1rem;
  font-family: inherit;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;

  option {
    color: #000000;
    background: white;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  color: #000000; /* ✅ BLACK TEXT */
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #666;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  
  input {
    margin-right: 0.5rem;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0070e0;
  }
`;

const FreeQuoteHeader = styled.div`
  background: linear-gradient(135deg, #0A84FF, #0055a5);
  color: white;
  padding: 1rem 0;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  h2 {
    margin: 0;
    font-size: 1.8rem;
  }
  
  p {
    margin: 0.5rem 0 0;
    opacity: 0.9;
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

// ✅ MODAL STYLES — ALL TEXT BLACK
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
  background: white; /* ✅ Changed from var(--dark) to WHITE for contrast */
  color: #000000; /* ✅ BLACK TEXT */
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
  color: #777;
  font-size: 1.5rem;
  cursor: pointer;
  font-family: inherit;
  &:hover { color: #000; }
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #000000;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem 2rem;
  overflow-y: auto;
  flex: 1;
  max-height: 60vh;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
`;

const ModalFooter = styled.div`
  padding: 0 2rem 1.5rem;
  text-align: center;
  position: sticky;
  bottom: 0;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

// ✅ Modal-specific form components — all black text
const ModalLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #000000;
  font-size: 0.95rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  color: #000000;
  font-size: 1rem;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }
`;

const ModalSelect = styled.select`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  color: #000000;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  color: #000000;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e02e23;
    transform: translateY(-2px);
  }
`;

const ModalSuccessMessage = styled(motion.div)`
  background: #34C759;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

// ====== MAIN COMPONENT ======
function ProductsPage() {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);

  const [industry, setIndustry] = useState('');
  const [heightRequirement, setHeightRequirement] = useState('');
  const [cameraQuality, setCameraQuality] = useState('');
  const [range, setRange] = useState('');
  const [needsPayload, setNeedsPayload] = useState(false);
  const [payloadWeight, setPayloadWeight] = useState('');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setProducts(allProductsData);
  }, []);

  useEffect(() => {
    let result = products;

    if (activeCategory !== 'All Products' && activeCategory !== 'Customize') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    setFilteredProducts(result);
  }, [products, activeCategory, searchQuery]);

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const database = getDatabase(app);
      const droneCustomizeRef = ref(database, 'Drone_Customize');

      const snapshot = await get(droneCustomizeRef);
      let nextOrderId = 1;

      if (snapshot.exists()) {
        const orders = snapshot.val();
        const orderIds = Object.keys(orders)
          .filter(key => key.startsWith('customizeorder'))
          .map(key => parseInt(key.replace('customizeorder', '')));

        if (orderIds.length > 0) {
          nextOrderId = Math.max(...orderIds) + 1;
        }
      }

      const customizationData = {
        industry,
        height: heightRequirement,
        camera: cameraQuality,
        range,
        payload: needsPayload ? payloadWeight : "None",
        description,
        timestamp: serverTimestamp()
      };

      const orderKey = `customizeorder${nextOrderId}`;
      await set(child(droneCustomizeRef, orderKey), customizationData);

      setFormSubmitted(true);

      setTimeout(() => {
        setIndustry('');
        setHeightRequirement('');
        setCameraQuality('');
        setRange('');
        setNeedsPayload(false);
        setPayloadWeight('');
        setDescription('');
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error saving data to Firebase:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        const fpvOrdersRef = ref(db, 'fpvorders');

        const snapshot = await get(fpvOrdersRef);
        let nextId = 1;

        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
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
            <h2>
              Order <strong>{drone.name}</strong>
            </h2>
          </ModalHeader>

          <ModalBody>
            {submitSuccess ? (
              <ModalSuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Thank you! Our representative will contact you shortly.
              </ModalSuccessMessage>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <ModalLabel htmlFor="name">Full Name *</ModalLabel>
                  <ModalInput
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Alex Johnson"
                  />
                </FormGroup>

                <FormGroup>
                  <ModalLabel htmlFor="contact">Email or Phone *</ModalLabel>
                  <ModalInput
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="e.g., alex@example.com or +1 555-123-4567"
                  />
                </FormGroup>

                <FormGroup>
                  <ModalLabel htmlFor="address">Shipping Address *</ModalLabel>
                  <ModalTextarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street, City, State, ZIP, Country"
                  />
                </FormGroup>

                <FormGroup>
                  <ModalLabel htmlFor="preferredContact">Preferred Contact Method</ModalLabel>
                  <ModalSelect
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                  >
                    <option value="phone">Phone Call</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="teams">Microsoft Teams</option>
                  </ModalSelect>
                </FormGroup>

                <FormGroup>
                  <ModalLabel htmlFor="message">Special Instructions (Optional)</ModalLabel>
                  <ModalTextarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific delivery instructions or customizations..."
                  />
                </FormGroup>

                <ModalFooter>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Confirm Order'}
                  </SubmitButton>
                </ModalFooter>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  };

  const renderDronesSection = () => (
    <>
      <ProductsFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {activeCategory !== 'Customize' ? (
        <ProductsGrid>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductWrapper>
                <ProductCard product={product} />
                <OrderButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedDrone(product);
                    setIsModalOpen(true);
                  }}
                >
                  Order Now
                </OrderButton>
              </ProductWrapper>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: filteredProducts.length * 0.1 }}
          >
            <CustomizeWrapper>
              <CustomizeCard />
              <CustomizeButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory('Customize')}
              >
                Customize Your Drone
              </CustomizeButton>
            </CustomizeWrapper>
          </motion.div>
        </ProductsGrid>
      ) : (
        <CustomizationContainer>
          <FreeQuoteHeader>
            <h2>Get a Free Quote</h2>
            <p>Tell us your requirements and we'll design the perfect drone solution for you</p>
          </FreeQuoteHeader>

          <FormTitle>Customize Your Drone</FormTitle>

          {formSubmitted ? (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Thank you for your request!</h3>
              <p>Our team will contact you shortly with a customized quote.</p>
            </SuccessMessage>
          ) : (
            <form onSubmit={handleCustomSubmit}>
              <FormGroup>
                <Label htmlFor="industry">Industry/Use Case</Label>
                <Select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                >
                  <option value="">Select Industry</option>
                  {[
                    'Agriculture', 'Warehouse Monitoring', 'Security', 'Forestry',
                    'Industrial Monitoring', 'Construction', 'Search & Rescue',
                    'Filmmaking', 'Other'
                  ].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="height">Maximum Height Requirement (meters)</Label>
                <Input
                  id="height"
                  type="number"
                  min="0"
                  placeholder="e.g., 100"
                  value={heightRequirement}
                  onChange={(e) => setHeightRequirement(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="camera">Camera Quality</Label>
                <Select
                  id="camera"
                  value={cameraQuality}
                  onChange={(e) => setCameraQuality(e.target.value)}
                  required
                >
                  <option value="">Select Camera Quality</option>
                  <option value="1080p">1080p HD</option>
                  <option value="2k">2K</option>
                  <option value="4k">4K</option>
                  <option value="8k">8K</option>
                  <option value="thermal">Thermal Imaging</option>
                  <option value="multispectral">Multispectral</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="range">Operational Range (kilometers)</Label>
                <Input
                  id="range"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g., 10"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Checkbox>
                  <input
                    id="payload-check"
                    type="checkbox"
                    checked={needsPayload}
                    onChange={() => setNeedsPayload(!needsPayload)}
                  />
                  <Label htmlFor="payload-check" style={{ marginBottom: 0, color: '#000000' }}>
                    Requires payload capacity (for carrying goods)
                  </Label>
                </Checkbox>
              </FormGroup>

              {needsPayload && (
                <FormGroup>
                  <Label htmlFor="payload">Payload Weight (kg)</Label>
                  <Input
                    id="payload"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 5"
                    value={payloadWeight}
                    onChange={(e) => setPayloadWeight(e.target.value)}
                    required={needsPayload}
                  />
                </FormGroup>
              )}

              <FormGroup>
                <Label htmlFor="description">Description of Your Requirements</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your specific needs..."
                  required
                />
              </FormGroup>

              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </PrimaryButton>
            </form>
          )}
        </CustomizationContainer>
      )}
    </>
  );

  return (
    <ProductsContainer>
      <ProductsHeader>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Cutting-Edge Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover Artemis' advanced drones — from professional surveillance to immersive FPV systems — and tailored automation solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: '2rem' }}
        >
          <a href="/images/ArtemisUAV_Catalogue.pdf" download="ArtemisUAV_Catalogue.pdf" style={{ textDecoration: 'none' }}>
            <CatalogueButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              📥 Download Catalogue
            </CatalogueButton>
          </a>
        </motion.div>
      </ProductsHeader>

      {renderDronesSection()}

      {isModalOpen && selectedDrone && (
        <OrderModal
          drone={selectedDrone}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDrone(null);
          }}
        />
      )}
    </ProductsContainer>
  );
}

export default ProductsPage;