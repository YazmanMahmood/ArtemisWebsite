import { useState, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import CustomizeCard from '../components/products/CustomizeCard';
import ProductsFilter from '../components/products/ProductsFilter';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { app } from '../firebase/config';
import { getDatabase, ref, set, get, child, serverTimestamp } from 'firebase/database';

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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

// Custom Form Styles
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

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  
  input {
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: #0A84FF;
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
`;

const SuccessMessage = styled(motion.div)`
  background-color: #34C759;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
`;

const productsData = [
  {
    id: 4,
    name: 'Artemis Scout',
    image: 'https://photos.app.goo.gl/aPUERNqMpS9tbqaN9',
    category: 'Surveillance',
    description: 'Our flagship multipurpose drone, designed for versatility and performance.',
    specs: {
      range: '10km',
      flightTime: '30 minutes',
      camera: '2K/4K options',
      maxHeight: '100m'
    },
    features: [
      'Exceptional stability',
      'Advanced flight controls',
      'Obstacle avoidance system',
      'Real-time video transmission'
    ],
    tags: ['surveillance', 'monitoring', 'versatile']
  }
];

const categories = [];
const industryOptions = ['Agriculture', 'Warehouse Monitoring', 'Security', 'Forestry', 'Industrial Monitoring', 'Construction', 'Search & Rescue', 'Filmmaking', 'Other'];

function ProductsPage() {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Customization form state
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
    setProducts(productsData);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      // If there are no specific categories, just filter by search
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      return matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, activeCategory, searchQuery]);

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get reference to Firebase database
      const database = getDatabase(app);
      const droneCustomizeRef = ref(database, 'Drone_Customize');
      
      // Get the current count of customization orders to create the next ID
      const snapshot = await get(droneCustomizeRef);
      let nextOrderId = 1;
      
      if (snapshot.exists()) {
        // Find the highest order number
        const orders = snapshot.val();
        const orderIds = Object.keys(orders)
          .filter(key => key.startsWith('customizeorder'))
          .map(key => parseInt(key.replace('customizeorder', '')));
        
        if (orderIds.length > 0) {
          nextOrderId = Math.max(...orderIds) + 1;
        }
      }
      
      // Create data object to save
      const customizationData = {
        industry,
        height: heightRequirement,
        camera: cameraQuality,
        range,
        payload: needsPayload ? payloadWeight : "None",
        description,
        timestamp: serverTimestamp()
      };
      
      // Save data with sequential order ID
      const orderKey = `customizeorder${nextOrderId}`;
      await set(child(droneCustomizeRef, orderKey), customizationData);
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form after 5 seconds
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

  return (
    <ProductsContainer>
      <ProductsHeader>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Cutting-Edge Drones
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover Artemis' flagship drone designed for surveillance, monitoring, and versatile applications.
        </motion.p>
      </ProductsHeader>

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
              <ProductCard product={product} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: filteredProducts.length * 0.1 }}
          >
            <CustomizeCard />
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
                  {industryOptions.map(option => (
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
                  <Label htmlFor="payload-check" style={{ marginBottom: 0 }}>
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
                  placeholder="Please describe your specific needs, use cases, and any additional features you might require..."
                  required
                />
              </FormGroup>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          )}
        </CustomizationContainer>
      )}
    </ProductsContainer>
  );
}

export default ProductsPage;
