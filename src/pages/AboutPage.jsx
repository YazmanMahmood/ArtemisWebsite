import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Link } from "react-router-dom";
import { FaBullseye, FaEye, FaMedal } from "react-icons/fa";
import GlobeAnimation from "../components/GlobeAnimation";

// ─── Styled Components ───────────────────────────────────────────────────────

const AboutContainer = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  padding: 140px 2rem 80px;
  position: relative;
  overflow-x: hidden;
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
  margin: 0 auto 6rem;
  position: relative;
  z-index: 2;

  h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 10px;
    font-weight: 700;
    
    span {
      color: #ff4d4d;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const CornerBracket = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #ff4d4d;
  z-index: 5;
  
  ${props => props.top && 'top: -5px;'}
  ${props => props.bottom && 'bottom: -5px;'}
  ${props => props.left && 'left: -5px; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: -5px; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 450px;
  border: 1px solid rgba(255, 77, 77, 0.2);
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.2) contrast(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 77, 77, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TextContent = styled(motion.div)`
  h2 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 4px;
    
    span {
      color: #ff4d4d;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 77, 77, 0.2);
  padding-top: 2rem;

  div {
    h3 {
      font-size: 2.5rem;
      color: #ff4d4d;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    p {
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 10rem;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(motion.div)`
  background: rgba(15, 15, 15, 0.6);
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 77, 77, 0.1);
  position: relative;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;

  &:hover {
    border-color: #ff4d4d;
    background: rgba(20, 20, 20, 0.8);
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.7;
    font-size: 0.9rem;
  }

  .icon {
    font-size: 2.5rem;
    color: #ff4d4d;
    filter: drop-shadow(0 0 10px rgba(255, 77, 77, 0.3));
  }
`;

const TimelineSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 10rem;
  position: relative;
  z-index: 2;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  margin-bottom: 4rem;
  position: relative;
  
  ${props => props.even ? 'flex-direction: row-reverse;' : ''}

  .year {
    width: 120px;
    font-size: 1.5rem;
    color: #ff4d4d;
    font-weight: 700;
    text-align: ${props => props.even ? 'left' : 'right'};
    padding: 0 2rem;
    flex-shrink: 0;
  }

  .content {
    background: rgba(15, 15, 15, 0.8);
    padding: 2rem;
    border-left: 3px solid #ff4d4d;
    flex: 1;
    
    ${props => props.even && 'border-left: 0; border-right: 3px solid #ff4d4d;'}

    h4 {
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #fff;
    }

    p {
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.6;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .year {
      text-align: left;
      margin-bottom: 1rem;
      padding: 0;
    }
  }
`;

const CTASection = styled.section`
  max-width: 900px;
  margin: 0 auto 10rem;
  text-align: center;
  padding: 5rem 3rem;
  background: linear-gradient(rgba(255, 77, 77, 0.05), transparent);
  border: 1px solid rgba(255, 77, 77, 0.1);
  position: relative;
  z-index: 2;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 6px;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 3rem;
    line-height: 1.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .partner-btn {
    display: inline-block;
    padding: 1.2rem 3.5rem;
    background: transparent;
    color: #ff4d4d;
    border: 1px solid #ff4d4d;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 4px;
    transition: all 0.3s ease;

    &:hover {
      background: #ff4d4d;
      color: #000;
      box-shadow: 0 0 30px rgba(255, 77, 77, 0.4);
    }
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

const AboutPage = () => {
  useScrollToTop();

  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const valuesData = [
    {
      icon: <FaBullseye />,
      title: "Mission",
      description: "To build autonomous drone systems that redefine how organizations respond to high-risk scenarios — minimizing human exposure while maximizing operational reliability."
    },
    {
      icon: <FaEye />,
      title: "Vision",
      description: "A future where intelligent aerial systems provide seamless, around-the-clock protection for critical infrastructure across every industry."
    },
    {
      icon: <FaMedal />,
      title: "Values",
      description: "Reliability, continuous innovation, and precision engineering — applied consistently across every product we build and every client we serve."
    }
  ];

  const timelineEvents = [
    {
      year: "2024",
      title: "Command Established",
      description: "Artemis Drone Technologies founded in Pakistan with a core directive to revolutionize tactical response through autonomous hardware."
    },
    {
      year: "Q1 2025",
      title: "Alpha Deployment",
      description: "Successful integration of our primary AI combat-response algorithms and first public field demonstration."
    },
    {
      year: "Q3 2025",
      title: "NIC Operations",
      description: "Selected for the National Incubation Center (Lahore) for strategic scaling and advanced sensor R&D."
    },
    {
      year: "Q4 2025",
      title: "Global Outreach",
      description: "Scaling production of the Interceptor and Scout platforms for international defense and private security sectors."
    },
    {
      year: "Q1 2026",
      title: "Tactical Integration",
      description: "Successful field demonstration and strategic collaboration with local military forces for autonomous operations."
    }
  ];

  return (
    <AboutContainer>
      <DataGrid />

      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mission <span>Intelligence</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Operational Directives & Strategic Vision // Established 2024
        </motion.p>
      </Header>

      <ContentSection ref={aboutRef}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center' }}
        >
          <GlobeAnimation />
        </motion.div>

        <TextContent
          initial={{ opacity: 0, x: 50 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Pioneering <span>Autonomous</span> Defenses</h2>
          <p>
            Artemis Drone Technologies is an elite Pakistan-based startup engineering the future of high-stakes response. We specialize in fully autonomous platforms capable of neutralizing threats in warehouses, industrial complexes, and urban environments.
          </p>
          <p>
            Our systems bypass the limitations of manual operation, utilizing neural-linked algorithms to provide 24/7 reliability where human intervention is too slow or too high-risk.
          </p>

        </TextContent>
      </ContentSection>



      <ValuesGrid>
        {valuesData.map((value, index) => (
          <ValueCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <CornerBracket top left />
            <CornerBracket bottom right />
            <div className="icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </ValueCard>
        ))}
      </ValuesGrid>

      <TimelineSection ref={timelineRef}>
        <motion.h2
          style={{ textAlign: "center", marginBottom: "5rem", textTransform: 'uppercase', letterSpacing: '6px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
        >
          Operational History
        </motion.h2>

        {timelineEvents.map((event, index) => (
          <TimelineItem
            key={index}
            even={index % 2 !== 0}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={timelineInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="year">{event.year}</div>
            <div className="content">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          </TimelineItem>
        ))}
      </TimelineSection>

      <CTASection>
        <CornerBracket top left />
        <CornerBracket top right />
        <CornerBracket bottom left />
        <CornerBracket bottom right />
        <h2>Work With Us</h2>
        <p>
          Whether you're a business, research institution, or investor — we're open to collaboration. Get in touch to learn how Artemis can work for you.
        </p>
        <Link to="/contact" className="partner-btn">
          Get In Touch
        </Link>
      </CTASection>
    </AboutContainer>
  );
};

export default AboutPage;