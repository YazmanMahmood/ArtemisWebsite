import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import VimeoEmbed from './common/VimeoEmbed';


const glitchClip1 = keyframes`
  0%   { clip-path: inset(20% 0 60% 0); transform: translateX(-6px); }
  25%  { clip-path: inset(60% 0 10% 0); transform: translateX(6px); }
  50%  { clip-path: inset(40% 0 30% 0); transform: translateX(-3px); }
  75%  { clip-path: inset(10% 0 70% 0); transform: translateX(5px); }
  100% { clip-path: inset(20% 0 60% 0); transform: translateX(-6px); }
`;

const glitchClip2 = keyframes`
  0%   { clip-path: inset(55% 0 20% 0); transform: translateX(5px); }
  25%  { clip-path: inset(10% 0 65% 0); transform: translateX(-5px); }
  50%  { clip-path: inset(70% 0 5%  0); transform: translateX(4px); }
  75%  { clip-path: inset(30% 0 45% 0); transform: translateX(-6px); }
  100% { clip-path: inset(55% 0 20% 0); transform: translateX(5px); }
`;

const redFlicker = keyframes`
  0%, 100% { opacity: 1; }
  48%       { opacity: 1; }
  50%       { opacity: 0.3; }
  52%       { opacity: 1; }
  88%       { opacity: 1; }
  90%       { opacity: 0.5; }
  92%       { opacity: 1; }
`;

const hudPulse = keyframes`
  0%, 100% { border-color: rgba(255,77,77,0.3); }
  50%       { border-color: rgba(255,77,77,0.8); box-shadow: 0 0 16px rgba(255,77,77,0.2); }
`;

const pingDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.3; transform: scale(0.5); }
`;

const slideInLeft = keyframes`
  0%   { opacity: 0; transform: translateX(-24px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  0%   { opacity: 0; transform: translateX(24px); }
  100% { opacity: 1; transform: translateX(0); }
`;

// ── New title animation keyframes ─────────────────────────────────────────────

// Flash when a redacted block declassifies
const declassifyFlash = keyframes`
  0%   { background: #ff4d4d; color: #ff4d4d; }
  40%  { background: transparent; color: #ff4d4d; }
  100% { background: transparent; color: #ff4d4d; }
`;

// Redacted block pulse before reveal
const redactedPulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
`;

// Letter settle after declassify
const letterSettle = keyframes`
  0%   { transform: scaleX(1.15) translateY(-2px); filter: blur(3px); color: #fff; }
  60%  { transform: scaleX(0.97) translateY(1px); filter: blur(0); color: #ff4d4d; }
  100% { transform: scaleX(1) translateY(0); color: #ff4d4d; }
`;

// Intro line — types in from left with a cursor
const typeIn = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;

const cursorBlink = keyframes`
  0%, 100% { border-right-color: rgba(255,77,77,0.8); }
  50%       { border-right-color: transparent; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const SectionWrapper = styled.section`
  background-color: #000;
  position: relative;
  height: 160vh;
  font-family: 'Share Tech Mono', monospace;
  color: #fff;
  overflow: hidden;

  @media (max-width: 1400px) {
    height: 150vh;
  }

  @media (max-width: 900px) {
    height: auto;
    padding-bottom: 4rem;
  }
`;

const StickyContent = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 5% 20px;
  justify-content: space-between;
  overflow: visible;

  @media (max-width: 1400px) {
    padding: 72px 4% 15px;
  }

  @media (max-height: 700px) {
    padding: 72px 4% 10px;
  }

  @media (max-height: 600px) {
    padding: 65px 4% 5px;
  }

  @media (max-width: 900px) {
    position: relative;
    height: auto;
    padding-top: 72px;
    padding-bottom: 2rem;
    justify-content: center;
  }
`;

// Typewriter intro line
const IntroLineWrapper = styled(motion.div)`
  overflow: hidden;
  white-space: nowrap;
  display: block;
  margin: 0 0 1.5rem 0;
`;

const IntroLineText = styled.span`
  display: inline-block;
  font-size: clamp(0.85rem, 1.8vw, 1.2rem);
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-style: italic;
  overflow: hidden;
  white-space: nowrap;
  animation: ${props => props.$active ? css`${typeIn} 1.4s cubic-bezier(0.2, 0, 0.2, 1) both` : 'none'},
             ${props => props.$active ? css`${cursorBlink} 0.6s step-end infinite` : 'none'};
  animation-delay: 0ms, 0ms;
  border-right: 2px solid rgba(255,77,77,0.8);
  padding-right: 3px;
  max-width: ${props => props.$active ? '100%' : '0'};
`;

const GlitchWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: default;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    letter-spacing: 10px;
    text-transform: uppercase;
    white-space: nowrap;
    pointer-events: none;
  }

  &::before {
    color: #ff0000;
    animation: ${glitchClip1} 3.5s infinite linear;
    animation-play-state: var(--glitch-play, paused);
    opacity: 0.7;
  }

  &::after {
    color: #ffffff;
    animation: ${glitchClip2} 2.9s infinite linear;
    animation-play-state: var(--glitch-play, paused);
    opacity: 0.5;
  }

  &:hover { --glitch-play: running; }
`;

// Each letter slot — shows redacted block, then flashes to letter
const LetterSlot = styled.span`
  display: inline-block;
  position: relative;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: 10px;
  text-transform: uppercase;
  line-height: 1;
  min-width: 0.65em;
  text-align: center;
  vertical-align: bottom;

  /* Redacted state */
  background: ${props => props.$revealed ? 'transparent' : 'rgba(255,77,77,0.85)'};
  color: ${props => props.$revealed ? '#ff4d4d' : 'transparent'};
  border-radius: 2px;
  transition: background 0s;

  animation: ${props => props.$revealed
    ? css`${declassifyFlash} 0.25s ease forwards, ${letterSettle} 0.5s 0.15s ease forwards, ${redFlicker} 6s ${props.$delay * 0.4}ms infinite`
    : css`${redactedPulse} 1s ease-in-out infinite`};
  animation-delay: ${props => props.$revealed ? `0ms, 0ms, ${props.$delay * 0.5}ms` : '0ms'};
`;

const MainTitle = styled.h2`
  margin: 0;
  line-height: 1;
  /* letter-spacing handled per LetterSlot */
`;


const ClassifiedBar = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #ff4d4d;
  transform-origin: left center;
  z-index: 25;
`;

const TitleRevealContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

// Declassified stamp — appears briefly over the title block
const DeclassifiedStamp = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-12deg);
  border: 3px solid rgba(255, 77, 77, 0.6);
  color: rgba(255, 77, 77, 0.55);
  font-size: clamp(0.55rem, 1.2vw, 0.75rem);
  letter-spacing: 6px;
  padding: 4px 14px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 40;
  font-weight: 700;
`;

const TitleBlock = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 0;
  z-index: 10;
  position: relative;

  @media (max-width: 1400px) {
    margin-bottom: 0.25rem;
  }

  @media (max-width: 900px) {
    margin-bottom: 0.5rem;
  }
`;

// ── HUD 3-column layout ──────────────────────────────────────────────────────

const HUDLayout = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr 190px;
  width: 100%;
  max-width: 1300px;
  flex: 1;
  min-height: 0;
  margin: 1rem 0;

  @media (max-width: 1400px) {
    grid-template-columns: 120px 1fr 120px;
    max-width: 95vw;
  }
  @media (max-width: 1100px) {
    grid-template-columns: 90px 1fr 90px;
    max-width: 98vw;
  }
  @media (max-width: 900px)  { grid-template-columns: 1fr; height: auto; flex: none; }
`;

const SidePanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 14px;
  background: rgba(0,0,0,0.9);
  border: 1px solid rgba(255, 77, 77, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff4d4d, transparent);
  }

  @media (max-width: 900px) { display: none; }
`;

const PanelTitle = styled.div`
  font-size: 0.52rem;
  color: #ff4d4d;
  letter-spacing: 3px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,77,77,0.2);
  padding-bottom: 8px;
  margin-bottom: 14px;
`;

const StatRow = styled.div`
  margin-bottom: 14px;
  animation: ${props => css`${props.$right ? slideInRight : slideInLeft} 0.4s ease both`};
  animation-delay: ${props => props.$delay || 0}ms;
  animation-play-state: ${props => props.$play ? 'running' : 'paused'};

  @media (max-width: 1400px) {
    margin-bottom: 8px;
  }

  @media (max-height: 700px) {
    margin-bottom: 6px;
  }
`;

const StatLabel = styled.div`
  font-size: 0.5rem;
  color: rgba(255, 77, 77, 0.65);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: ${props => props.$right ? 'flex-end' : 'flex-start'};

  &::before {
    content: '';
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #ff4d4d;
    flex-shrink: 0;
    animation: ${pingDot} 1.8s ease-in-out infinite;
    animation-delay: ${props => props.$ping || 0}ms;
    order: ${props => props.$right ? 2 : 0};
  }
`;

const StatValue = styled.div`
  font-size: ${props => props.$large ? '1.1rem' : '0.85rem'};
  color: ${props => props.$red ? '#ff4d4d' : '#fff'};
  font-weight: 700;
  letter-spacing: 2px;
  text-align: ${props => props.$right ? 'right' : 'left'};
`;

const HDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255,77,77,0.12);
  margin: 4px 0 14px;

  @media (max-width: 1400px) {
    margin: 2px 0 8px;
  }

  @media (max-height: 700px) {
    margin: 2px 0 6px;
  }
`;

const HexStream = styled.div`
  font-size: 0.42rem;
  color: rgba(255,77,77,0.2);
  letter-spacing: 1px;
  line-height: 1.7;
  overflow: hidden;
  flex: 1;
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
`;

// ── Video ────────────────────────────────────────────────────────────────────

const HUDContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: clamp(510px, 60vh, 710px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 77, 77, 0.25);
  border-bottom: 1px solid rgba(255, 77, 77, 0.25);
  overflow: hidden;
  animation: ${hudPulse} 4s ease-in-out infinite;

  @media (max-width: 1400px) {
    min-height: clamp(410px, 52vh, 550px);
  }

  @media (max-height: 700px) {
    min-height: clamp(320px, 48vh, 420px);
  }

  @media (max-height: 600px) {
    min-height: clamp(260px, 42vh, 340px);
  }

  @media (max-width: 900px) {
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: unset;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%),
      linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%);
    pointer-events: none;
    z-index: 2;
  }
`;

const CornerBracket = styled(motion.div)`
  position: absolute;
  width: 24px; height: 24px;
  border: 2px solid #ff4d4d;
  z-index: 20;
  filter: drop-shadow(0 0 5px #ff4d4d);
  ${props => props.top && 'top: 8px;'}
  ${props => props.bottom && 'bottom: 8px;'}
  ${props => props.left && 'left: 8px; border-right: 0; border-bottom: 0;'}
  ${props => props.right && 'right: 8px; border-left: 0; border-bottom: 0;'}
  ${props => props.bottom && props.left && 'border-top: 0; border-right: 0;'}
  ${props => props.bottom && props.right && 'border-top: 0; border-left: 0;'}
`;

const HUDBar = styled(motion.div)`
  position: absolute;
  left: 30px; right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 15;
  pointer-events: none;
  ${props => props.$top ? 'top: 8px;' : 'bottom: 8px;'}
`;

const HUDBarText = styled.div`
  font-size: 0.47rem;
  color: rgba(255, 77, 77, 0.55);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Crosshair = styled(motion.div)`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; height: 50px;
  z-index: 10;
  pointer-events: none;

  &::before, &::after {
    content: '';
    position: absolute;
    background: rgba(255,77,77,0.45);
  }
  &::before { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }
  &::after  { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-50%); }
`;

const CrosshairRing = styled(motion.div)`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70px; height: 70px;
  border: 1px solid rgba(255,77,77,0.25);
  border-radius: 50%;
  z-index: 10;
  pointer-events: none;
`;

const Tagline = styled(motion.p)`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: clamp(0.9rem, 1.2vw, 1.15rem);
  color: rgba(255,255,255,0.75);
  max-width: 800px;
  text-align: center;
  letter-spacing: 1.5px;
  line-height: 1.6;
  position: relative;
  z-index: 10;
  transform: translateY(40px);

  @media (max-width: 1400px) {
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
    transform: translateY(40px);
  }

  @media (max-height: 700px) {
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    transform: translateY(30px);
  }

  @media (max-height: 600px) {
    margin-top: 0.25rem;
    margin-bottom: 0.1rem;
    transform: translateY(20px);
    font-size: 0.85rem;
  }

  @media (max-width: 900px) {
    margin-top: 1rem;
    margin-bottom: 0;
    transform: none;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const TITLE = 'INTERCEPTOR';

export default function InterceptorSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const barScaleX = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px"
  });

  const [scanActive, setScanActive] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(false);

  // Per-letter declassify state
  const [revealedLetters, setRevealedLetters] = useState(Array(TITLE.length).fill(false));
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    if (isInView) {
      setScanActive(true);
      setTimeout(() => setPanelsVisible(true), 300);

      // Stagger declassify per letter
      TITLE.split('').forEach((_, i) => {
        setTimeout(() => {
          setRevealedLetters(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * 30);
      });

      // Show DECLASSIFIED stamp briefly after all letters reveal
      setTimeout(() => setShowStamp(true), TITLE.length * 30 + 100);
      setTimeout(() => setShowStamp(false), TITLE.length * 30 + 1200);
    }
  }, [isInView]);

  const [dataStream, setDataStream] = useState(() =>
    Array.from({ length: 24 }, () => Math.random().toString(16).substring(2, 10).toUpperCase())
  );
  useEffect(() => {
    const id = setInterval(() => {
      setDataStream(prev => [
        ...prev.slice(-22),
        Math.random().toString(16).substring(2, 10).toUpperCase(),
        Math.random().toString(16).substring(2, 10).toUpperCase(),
      ]);
    }, 500);
    return () => clearInterval(id);
  }, []);

  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().substring(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionWrapper ref={containerRef}>
      <StickyContent style={{ opacity }}>

        {/* Title block */}
        <TitleBlock>
          <IntroLineWrapper>
            <IntroLineText $active={scanActive}>
              Introducing our AI Powered
            </IntroLineText>
          </IntroLineWrapper>

          <TitleRevealContainer>
            <ClassifiedBar style={{ scaleX: barScaleX }} />

            {/* DECLASSIFIED watermark stamp */}
            <DeclassifiedStamp
              initial={{ opacity: 0, scale: 0.7 }}
              animate={showStamp ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              DECLASSIFIED
            </DeclassifiedStamp>

            <GlitchWrapper data-text={TITLE}>
              <MainTitle>
                {TITLE.split('').map((ch, i) => (
                  <LetterSlot
                    key={i}
                    $revealed={revealedLetters[i]}
                    $delay={i * 40}
                  >
                    {ch}
                  </LetterSlot>
                ))}
              </MainTitle>
            </GlitchWrapper>
          </TitleRevealContainer>

          <motion.div
            initial={{ width: 0 }}
            animate={panelsVisible ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ height: 2, background: '#ff4d4d', margin: '0.5rem auto 0', boxShadow: '0 0 12px #ff4d4d' }}
          />
        </TitleBlock>

        {/* HUD: left | video | right */}
        <HUDLayout>

          {/* Left panel — Target Data */}
          <SidePanel
            initial={{ opacity: 0, x: -20 }}
            animate={panelsVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <PanelTitle>// PERFORMANCE</PanelTitle>

            <StatRow $delay={400} $play={panelsVisible}>
              <StatLabel $ping={0}>Top Speed</StatLabel>
              <StatValue $large>230 KM/H</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $delay={550} $play={panelsVisible}>
              <StatLabel $ping={300}>Op. Range</StatLabel>
              <StatValue $large>8 KM</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $delay={700} $play={panelsVisible}>
              <StatLabel $ping={600}>Endurance</StatLabel>
              <StatValue $large>25 MIN</StatValue>
            </StatRow>
            <HDivider />

            <HexStream>
              {dataStream.map((line, i) => (
                <div key={i}>0x{line} :: SIG_{String(i).padStart(3, '0')}</div>
              ))}
            </HexStream>
          </SidePanel>

          {/* Video */}
          <HUDContainer>
            <CornerBracket top left initial={{ scale: 0 }} animate={panelsVisible ? { scale: 1 } : {}} transition={{ delay: 0.1 }} />
            <CornerBracket top right initial={{ scale: 0 }} animate={panelsVisible ? { scale: 1 } : {}} transition={{ delay: 0.15 }} />
            <CornerBracket bottom left initial={{ scale: 0 }} animate={panelsVisible ? { scale: 1 } : {}} transition={{ delay: 0.2 }} />
            <CornerBracket bottom right initial={{ scale: 0 }} animate={panelsVisible ? { scale: 1 } : {}} transition={{ delay: 0.25 }} />

            <HUDBar $top initial={{ opacity: 0 }} animate={panelsVisible ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
              <HUDBarText>SYS: ONLINE</HUDBarText>
              <HUDBarText>UTC {time}</HUDBarText>
              <HUDBarText>FEED: LIVE</HUDBarText>
            </HUDBar>

            <HUDBar initial={{ opacity: 0 }} animate={panelsVisible ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              <HUDBarText>LAT 33.8688° N</HUDBarText>
              <HUDBarText>ARTEMIS DEFENSE SYSTEMS</HUDBarText>
              <HUDBarText>LON 151.2093° E</HUDBarText>
            </HUDBar>

            <VimeoEmbed
              src="https://player.vimeo.com/video/1192991312?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&autopause=0&dnt=1"
              title="Interceptor Action Video"
              lazy
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none', zIndex: 1 }}
            />
          </HUDContainer>

          {/* Right panel — System Status (LIDAR removed) */}
          <SidePanel
            initial={{ opacity: 0, x: 20 }}
            animate={panelsVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ borderLeft: 'none' }}
          >
            <PanelTitle>// CAPABILITIES</PanelTitle>

            <StatRow $right $delay={450} $play={panelsVisible}>
              <StatLabel $right $ping={100}>Pursuit</StatLabel>
              <StatValue $right>AUTONOMOUS</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $right $delay={600} $play={panelsVisible}>
              <StatLabel $right $ping={400}>Target Lock</StatLabel>
              <StatValue $right>VISION AI</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $right $delay={750} $play={panelsVisible}>
              <StatLabel $right $ping={200}>GPS Dep.</StatLabel>
              <StatValue $right $red>NONE</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $right $delay={900} $play={panelsVisible}>
              <StatLabel $right $ping={500}>Operator</StatLabel>
              <StatValue $right $red>ZERO</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $right $delay={1050} $play={panelsVisible}>
              <StatLabel $right $ping={700}>Neural Link</StatLabel>
              <StatValue $right>SYNCED</StatValue>
            </StatRow>
            <HDivider />

            <StatRow $right $delay={1150} $play={panelsVisible}>
              <StatLabel $right $ping={900}>Strike Mode</StatLabel>
              <StatValue $right $red>ARMED</StatValue>
            </StatRow>
          </SidePanel>

        </HUDLayout>

        <Tagline
          initial={{ opacity: 0 }}
          animate={panelsVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          Detects, locks, and neutralizes hostile aerial targets without operator input.
        </Tagline>

      </StickyContent>
    </SectionWrapper>
  );
}