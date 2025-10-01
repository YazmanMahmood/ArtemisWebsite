import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import twitterImg from '/images/twitter.png';

const Footer = styled.footer`
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 3rem 2rem;
  font-family: var(--font-primary);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  @media (max-width: 768px) {
    padding: 2.2rem 1.2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContactInfo = styled.div`
  h4 {
    color: #fff;
    margin-bottom: 1.2rem;
    font-size: 1.3rem;
    font-weight: 600;
    font-family: var(--font-primary);
  }
  p {
    color: #fff;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: normal;
    font-family: var(--font-primary);
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        color: #4fc3f7;
        text-decoration: underline;
      }
    }
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.6rem;
  a {
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  a:hover {
    color: #4fc3f7;
    border-color: #4fc3f7;
    transform: translateY(-1px);
  }
  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2.2rem;
  padding-top: 2.2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.95rem;
  font-weight: normal;
  font-family: var(--font-primary);
`;

function FooterComponent() {
  return (
    <Footer>
      <FooterContent>
        <ContactInfo>
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:uavartemis@gmail.com">uavartemis@gmail.com</a></p>
          <p>Phone: <a href="tel:+923104768835">+92 310-4768835</a></p>
          <p>Address: National Incubation Center, Vogue Towers, Gulberg, Lahore, Pakistan</p>
        </ContactInfo>
        <ContactInfo>
          <h4>Need a Custom Solution?</h4>
          <p>Our engineering team can develop specialized drone systems tailored to your unique requirements.</p>
          <Link to="/contact">
            <button style={{
              marginTop: '1.2rem',
              padding: '0.85rem 1.7rem',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'var(--font-primary)',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
            onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
            >
              Contact Us
            </button>
          </Link>
          <Socials>
            <a
              href="https://www.linkedin.com/company/artemisuav/?"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ArtemisUAV on LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://x.com/artemis_uav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ArtemisUAV on X (Twitter)"
            >
              <img src={twitterImg} alt="X (Twitter)" loading="lazy" />
            </a>
          </Socials>
        </ContactInfo>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} Artemis UAV. All rights reserved.
      </Copyright>
    </Footer>
  );
}

export default FooterComponent;

