import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutContainer = styled.div`
  padding: 80px 2rem;
  min-height: 100vh;
  background: var(--light);
`;

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 6rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContent = styled(motion.div)`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
  }

  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  text-align: center;

  div {
    h3 {
      font-size: 2.5rem;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    p {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
`;

const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    color: var(--dark);
  }

  p {
    color: #666;
    line-height: 1.6;
  }

  .icon {
    font-size: 2.5rem;
    color: var(--primary);
  }
`;

function AboutPage() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <AboutContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Mission and Vision
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          At Artemis, we believe in making the world safer through innovation.
        </motion.p>
      </Header>

      <ContentSection ref={ref}>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <img src="/images/aboutusdrone.jpeg" alt="About Us Drone" />
        </ImageContainer>
        <TextContent
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Pioneering the Future of Safety</h2>
          <p>
            Founded in 2024, Artemis Drone Solutions was born from a mission to revolutionize 
            emergency response and security through cutting-edge drone technology. Based in 
            Pakistan, our agile team of 10 passionate innovators combines expertise in aerospace 
            engineering, artificial intelligence, and emergency operations to tackle real-world 
            challenges.
          </p>
          <p>
            While we're just getting started, our commitment to creating autonomous, efficient, 
            and reliable drone solutions is unwavering. Together, we're redefining how 
            firefighting and security challenges are approached, one breakthrough at a time.
          </p>
          <Stats>
            <div>
              <h3>10+</h3>
              <p>Team Members</p>
            </div>
            <div>
              <h3>🇵🇰</h3>
              <p>Operations in Pakistan</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </Stats>
        </TextContent>
      </ContentSection>

      <Values>
        {[
          {
            icon: "🎯",
            title: "Mission",
            description: "Empowering communities with reliable, efficient drone solutions for enhanced safety and security."
          },
          {
            icon: "👁️",
            title: "Vision",
            description: "Creating a safer tomorrow through innovative aerial technology and autonomous systems."
          },
          {
            icon: "⭐",
            title: "Values",
            description: "Innovation, reliability, and commitment to excellence in everything we do."
          }
        ].map((value, index) => (
          <ValueCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </ValueCard>
        ))}
      </Values>
    </AboutContainer>
  );
}

export default AboutPage; 