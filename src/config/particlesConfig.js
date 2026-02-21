export const particlesConfig = {
  particles: {
    number: {
      value: window.innerWidth < 768 ? 40 : 80,
      density: {
        enable: true,
        value_area: 1500
      }
    },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.4,
      random: false,
      anim: {
        enable: true,
        speed: 0.8,
        opacity_min: 0.2
      }
    },
    size: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 5,
        size_min: 0.1
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.2,
      width: 0.5
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
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
};