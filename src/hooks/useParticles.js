import { useEffect } from 'react';

export const useParticles = () => {
  useEffect(() => {
    let particlesInstance = null;
    
    const loadParticles = async () => {
      try {
        if (typeof window.particlesJS !== 'undefined') {
          initParticles();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        script.onload = initParticles;
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading particles.js:', error);
      }
    };

    const initParticles = () => {
      if (document.getElementById('particles-js')) {
        particlesInstance = window.particlesJS('particles-js', {
          // Your existing particles config...
        });
      }
    };

    loadParticles();

    return () => {
      if (particlesInstance) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, []);
};

