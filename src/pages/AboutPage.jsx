import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Link } from "react-router-dom";

// Styled components
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
    color: var(--text-light);
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
    color: var(--text-light);
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  div {
    h3 {
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    p {
      color: var(--text-muted);
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
  background: var(--dark-accent);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    color: var(--dark);
  }

  p {
    color: var(--text-light);
    line-height: 1.6;
  }

  .icon {
    font-size: 2.5rem;
    color: var(--primary);
  }
`;

const TimelineSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto 8rem;
  position: relative;
  padding: 0 0 6rem;
  overflow: visible;
`;

const TimelineLine = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  width: 2px;
  background: var(--primary);
  transform-origin: top;

  @media (max-width: 768px) {
    left: 12px;
  }
`;

const ScrollDot = styled(motion.div)`
  position: absolute;
  left: 49.5%;
  top: 60px;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid var(--light);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
  z-index: 10;

  @media (max-width: 768px) {
    left: 12px;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.even ? "flex-end" : "flex-start")};

  @media (max-width: 768px) {
    justify-content: flex-end;
    padding-left: 60px;
  }

  .content {
    width: 45%;
    background: var(--dark-accent);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
      width: calc(100% - 20px);
    }
  }

  .content::after {
    content: "";
    position: absolute;
    top: 0;
    left: -120%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shine 1.4s ease forwards;
    animation-delay: 0.6s;
  }

  @keyframes shine {
    to {
      left: 120%;
    }
  }

  .year {
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    color: var(--text-light);
    line-height: 1.6;
  }

  .dot {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid var(--light);
    z-index: 5;

    @media (max-width: 768px) {
      left: 20px;
    }
  }

  ${(props) =>
    props.even &&
    `
    text-align: right;
    
    .content {
      margin-right: 5%;
    }
    
    @media (max-width: 768px) {
      text-align: left;
      .content {
        margin-right: 0;
      }
    }
  `}

  ${(props) =>
    !props.even &&
    `
    .content {
      margin-left: 5%;
    }
    
    @media (max-width: 768px) {
      .content {
        margin-left: 0;
      }
    }
  `}
`;

const CTASection = styled.section`
  max-width: 800px;
  margin: 6rem auto;
  text-align: center;
  padding: 3rem;
  background: var(--dark-accent);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
  }

  p {
    color: var(--text-light);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;

    a {
      display: inline-block;
      padding: 0.8rem 2rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .partner {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);

      &:hover {
        background: var(--primary);
        color: white;
        transform: translateY(-3px);
      }
    }
  }

  @media (max-width: 768px) {
    .cta-buttons {
      flex-direction: column;
      align-items: center;

      a {
        width: 80%;
      }
    }
  }
`;

// Component
const AboutPage = () => {
  useScrollToTop();
  const timelineSectionRef = useRef(null);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const [dotPositions, setDotPositions] = useState([]);

  const [aboutRef, aboutInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [timelineRef, timelineInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Calculate timeline height
  useEffect(() => {
    if (timelineSectionRef.current) {
      const height = timelineSectionRef.current.scrollHeight - 60;
      setTimelineHeight(height);
    }
  }, [timelineInView]);

  // Calculate dot positions based on timeline items
  useEffect(() => {
    if (timelineSectionRef.current && timelineHeight > 0) {
      const items = timelineSectionRef.current.querySelectorAll('.timeline-item-dot');
      const positions = Array.from(items).map(item => {
        const rect = item.getBoundingClientRect();
        const containerRect = timelineSectionRef.current.getBoundingClientRect();
        return rect.top - containerRect.top - 60;
      });
      setDotPositions(positions);
    }
  }, [timelineHeight, timelineInView]);

  // Scroll progress for timeline
  const { scrollYProgress } = useScroll({
    target: timelineSectionRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(
    smoothProgress,
    [0, 1],
    [0, timelineHeight]
  );

  // Create smooth snapping effect for the dot
  const dotY = useTransform(
    smoothProgress,
    dotPositions.length > 0 
      ? dotPositions.map((_, i) => i / (dotPositions.length - 1))
      : [0, 1],
    dotPositions.length > 0 
      ? dotPositions 
      : [0, timelineHeight]
  );

  const valuesData = [
    {
      icon: "🎯",
      title: "Mission",
      description:
        "Empowering communities with reliable, efficient drone solutions for enhanced safety and security.",
    },
    {
      icon: "👁️",
      title: "Vision",
      description:
        "Creating a safer tomorrow through innovative aerial technology and autonomous systems.",
    },
    {
      icon: "⭐",
      title: "Values",
      description:
        "Innovation, reliability, and commitment to excellence in everything we do.",
    },
  ];

  const timelineEvents = [
    {
      year: "2024",
      title: "Company Founded",
      description:
        "Artemis Drone Technologies was established in Pakistan with a mission to revolutionize emergency response and security using advanced drone technology.",
    },
    {
      year: "January 2025",
      title: "First Prototype",
      description:
        "Successfully developed our first prototype and made our first public appearance showcasing our AI-powered drone solutions.",
    },
    {
      year: "July 2025",
      title: "National Incubation Center",
      description:
        "Accepted into the prestigious National Incubation Center Lahore, gaining access to world-class resources and mentorship.",
    },
    {
      year: "End of 2025",
      title: "Investment & Partnerships",
      description:
        "Actively seeking investment opportunities and partnerships to scale our operations and expand our impact.",
    },
  ];

  const statsData = [
    { value: "5", label: "Team Members" },
    { value: "🇵🇰", label: "Operations in Pakistan" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <AboutContainer>
      {/* Header Section */}
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

      {/* Content Section */}
      <ContentSection ref={aboutRef}>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <img src="/images/aboutusdrone.jpeg" alt="About Us Drone" />
        </ImageContainer>
        <TextContent
          initial={{ opacity: 0, x: 50 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Pioneering the Future of Aviation</h2>
          <p>
            Artemis Drone Technologies, founded in 2024, is a forward-thinking
            startup based in Pakistan with a mission to transform emergency
            response and security using advanced drone technology. Our team of
            passionate innovators is dedicated to creating AI-powered drones
            that can assist in critical areas like firefighting in warehouses,
            buildings, and factories, as well as providing enhanced security
            surveillance. With expertise in design, development, artificial
            intelligence, and emergency operations, we are tackling real-world
            challenges to make a safer, smarter future possible.
          </p>
          <p>
            While we're just getting started, our commitment to creating
            autonomous, efficient, and reliable drone solutions is unwavering.
            Together, we're redefining how emergency responses and security
            challenges are approached, one breakthrough at a time.
          </p>
          <Stats>
            {statsData.map((stat, index) => (
              <div key={index}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </Stats>
        </TextContent>
      </ContentSection>

      {/* Values Section */}
      <Values>
        {valuesData.map((value, index) => (
          <ValueCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </ValueCard>
        ))}
      </Values>

      {/* Timeline Section */}
      <TimelineSection
        ref={(el) => {
          timelineSectionRef.current = el;
          timelineRef(el);
        }}
      >
        <motion.h2
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            marginTop: "0",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={timelineInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 90, damping: 15 }}
        >
          Our Journey
        </motion.h2>

        {/* Animated timeline line */}
        <TimelineLine style={{ height: lineHeight }} />

        {/* Scrolling dot */}
        <ScrollDot style={{ y: dotY }} />

        {timelineEvents.map((event, index) => (
          <TimelineItem
            key={index}
            even={index % 2 === 0}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -120 : 120,
              skewY: 10,
              rotate: index % 2 === 0 ? -10 : 10,
            }}
            animate={
              timelineInView ? { opacity: 1, x: 0, skewY: 0, rotate: 0 } : {}
            }
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: index * 0.25,
            }}
          >
            <div className="content">
              <div className="year">{event.year}</div>
              <div className="title">{event.title}</div>
              <div className="description">{event.description}</div>
            </div>
            <div className="dot timeline-item-dot"></div>
          </TimelineItem>
        ))}
      </TimelineSection>

      {/* CTA Section */}
      <CTASection>
        <h2>Join Us in Shaping the Future</h2>
        <p>
          We're looking for investors who believe in our vision and partners who
          want to collaborate in creating safer communities through innovative
          drone technology.
        </p>
        <div className="cta-buttons">
          <Link to="/contact" className="partner">
            Become a Partner
          </Link>
        </div>
      </CTASection>
    </AboutContainer>
  );
};

export default AboutPage;
