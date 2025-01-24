import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Slideshow from '../components/common/Slideshow';
import { useState, useEffect } from 'react';

// Styled Components
const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  background-color: #000;
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  canvas {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
  }
`;

const BackgroundImages = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const HeroContent = styled(motion.div)`
  text-align: left;
  max-width: 1200px;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
  margin-top: -10vh;
  @media (max-width: 768px) {
    padding: 0 2rem;
    margin-top: 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  letter-spacing: -0.5px;
  
  span {
    display: block;
    font-size: 3.2rem;
    font-weight: 400;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, 
      rgba(255, 59, 48, 0.9),
      rgba(10, 132, 255, 0.9)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.95;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    span {
      font-size: 2rem;
    }
  }
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  max-width: 600px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(
    135deg,
    rgba(255, 59, 48, 0.3),
    rgba(10, 132, 255, 0.3)
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 59, 48, 0.4),
      rgba(10, 132, 255, 0.4)
    );
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 2rem;
    font-size: 0.875rem;
  }
`;

const UseCasesSection = styled.section`
  padding: 6rem 2rem;
  background: var(--light);

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const UseCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UseCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
`;

const SlideShowSection = styled.section`
  padding: 4rem 2rem;
  background: var(--light);
  
  .slideshow-wrapper {
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }
`;

const TagLine = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  margin: 2rem 0;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, 
    rgba(255, 59, 48, 0.9),
    rgba(10, 132, 255, 0.9)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const Footer = styled.footer`
  background: #121212;
  color: white;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContactInfo = styled.div`
  h4 {
    color: rgba(255,255,255,0.9);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  p {
    color: rgba(255,255,255,0.7);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #0a84ff;
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;  
`;

const droneImages = [
  '/images/drone1.webp',
  '/images/drone2.webp',
  '/images/drone3.jpeg'
];

const droneCaptions = [
  'Advanced firefighting drone in action',
  'Night vision security patrol',
  'Multi-purpose rescue operations'
];

const Section = styled(motion.section)`
  opacity: 0;
`;

const backgroundVariants = {
  initial: { 
    scale: 1.05, 
    opacity: 0 
  },
  animate: { 
    scale: 1.02,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const applications = [
  {
    id: 1,
    title: "Perimeter Security",
    description: "24/7 automated surveillance for facility perimeters",
    image: "/images/perimeter-security.jpg"
  },
  {
    id: 2,
    title: "Warehouse Surveillance",
    description: "Real-time monitoring of warehouse operations",
    image: "/images/warehouse-surveillance.jpeg"
  },
  {
    id: 3,
    title: "Intruder Detection",
    description: "AI-powered threat detection system",
    image: "/images/intruder-detection.jpeg"
  },
  {
    id: 4,
    title: "Firefighting Operations",
    description: "Thermal imaging and fire response support",
    image: "/images/firefighting.jpeg"
  },
  {
    id: 5,
    title: "Agricultural Monitoring",
    description: "Advanced crop monitoring and precision agriculture solutions",
    image: "/images/agri.webp"
  },
  {
    id: 6,
    title: "Inventory Management",
    description: "Automated inventory tracking and warehouse optimization",
    image: "/images/inventory-drone.jpg"
  }
];

const ApplicationsSection = styled.section`
  padding: 6rem 2rem;
  background: var(--light);

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--dark);
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    
    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ApplicationCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .content {
    padding: 1.5rem;
    
    h3 {
      color: var(--primary);
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }

    p {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

function HomePage() {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [particlesContainer, setParticlesContainer] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    let particlesInstance = null;

    const initParticles = () => {
      if (!window.particlesJS || !document.getElementById('particles-js')) return;

      // Cleanup existing instance
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }

      try {
        particlesInstance = window.particlesJS('particles-js', {
          particles: {
            number: {
              value: window.innerWidth < 768 ? 50 : 120,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.6,
              random: false,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3
              }
            },
            size: {
              value: window.innerWidth < 768 ? 3 : 4,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1
              }
            },
            line_linked: {
              enable: true,
              distance: window.innerWidth < 768 ? 120 : 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: window.innerWidth < 768 ? 2 : 4,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "bounce",
              bounce: true
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            }
          },
          retina_detect: true
        });
        setIsParticlesLoaded(true);
      } catch (error) {
        console.error('Particles initialization failed:', error);
      }
    };

    const loadParticles = async () => {
      if (window.particlesJS) {
        initParticles();
        return;
      }

      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        
        script.onload = () => {
          initParticles();
          window.addEventListener('resize', initParticles);
        };

        document.body.appendChild(script);
        setParticlesContainer(script);
      } catch (error) {
        console.error('Failed to load particles.js:', error);
      }
    };

    loadParticles();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', initParticles);
      if (particlesInstance) {
        particlesInstance.destroy();
      }
      if (particlesContainer) {
        document.body.removeChild(particlesContainer);
      }
      setIsParticlesLoaded(false);
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <HeroSection>
        <ParticleBackground id="particles-js" />
        <HeroContent
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroTitle>
            Industrial Drone Solutions
            <span>Transform Your Business with Cutting-Edge Drone Solutions </span>
          </HeroTitle>

          <TagLine>Stay Ahead. Stay Safe.</TagLine>
          
        </HeroContent>
      </HeroSection>

      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <ApplicationsSection>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Applications
          </motion.h2>
          <ApplicationsGrid>
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img src={app.image} alt={app.title} />
                <div className="content">
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                </div>
              </ApplicationCard>
            ))}
          </ApplicationsGrid>
        </ApplicationsSection>
      </Section>

      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        
      </Section>

      <Footer>
        <FooterContent>
          <ContactInfo>
            <h4>Contact Us</h4>
            <p>
              <a href="tel:+923104768835">+92 310 4768835</a>
            </p>
            <p>
              <a href="mailto:uavartemis@gmail.com">uavartemis@gmail.com</a>
            </p>
            <p>Johar Town, Lahore</p>
          </ContactInfo>
        </FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Artemis. All rights reserved.
        </Copyright>
      </Footer>
    </>
  );
}

export default HomePage;