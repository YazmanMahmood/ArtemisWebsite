import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ApplicationsContainer = styled.div`
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
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ApplicationCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.div`
  height: 300px;
  position: relative;
  overflow: hidden;

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
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.5)
    );
  }
`;

const CardContent = styled.div`
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: #444;

    &::before {
      content: '✓';
      margin-right: 0.5rem;
      color: var(--primary);
      font-weight: bold;
    }
  }
`;

const applications = [
  {
    id: 1,
    title: 'Emergency Operations',
    image: '/images/fdrone.webp',
    description: 'Advanced thermal imaging and precision water deployment for efficient fire control.',
    features: [
      'Real-time fire detection and mapping',
      'Thermal hotspot identification',
      'Water and retardant deployment',
      'Search and rescue assistance',
      'Smoke penetration capabilities'
    ]
  },
  {
    id: 2,
    title: 'Security Surveillance & Detection',
    image: '/images/sproduct.webp',
    description: 'AI-powered surveillance ensuring 24/7 monitoring and threat detection.',
    features: [
      'Autonomous perimeter patrols',
      'AI threat detection',
      'Night vision capabilities',
      'Real-time alert system',
      'Secure data transmission'
    ]
  }
];

function ApplicationsPage() {
  useScrollToTop();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <ApplicationsContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Applications
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover how our drones are revolutionizing various industries
        </motion.p>
      </Header>

      <ApplicationsGrid ref={ref}>
        {applications.map((app, index) => (
          <ApplicationCard
            key={app.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <CardImage>
              <img src={app.image} alt={app.title} />
            </CardImage>
            <CardContent>
              <h2>{app.title}</h2>
              <p>{app.description}</p>
              <FeatureList>
                {app.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </FeatureList>
            </CardContent>
          </ApplicationCard>
        ))}
      </ApplicationsGrid>
    </ApplicationsContainer>
  );
}

export default ApplicationsPage;