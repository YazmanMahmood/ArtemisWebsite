import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import styled from '@emotion/styled';

const GlobeWrapper = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  background: transparent;
  margin: 0;
  
  .city-label {
    display: inline-flex;
    align-items: center;
    background: rgba(15, 15, 15, 0.85);
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
    pointer-events: auto;
    position: relative;
    border: 1px solid rgba(255, 77, 77, 0.3);
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 1px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    z-index: 100;
  }
`;

const GlobeAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let isRotating = false;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 2000);
    camera.position.set(0.5, 0.5, 1).setLength(15);

    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(container.offsetWidth, container.offsetHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = "none";
    container.appendChild(labelRenderer.domElement);

    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      labelRenderer.setSize(container.offsetWidth, container.offsetHeight);
      adjustCameraForScreen();
    };

    window.addEventListener("resize", onWindowResize);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed *= 0.25;

    let globalUniforms = { time: { value: 0 } };

    const isMobileDevice = () => /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let isMobile = isMobileDevice();
    const desiredTotalPoints = isMobile ? 5000 : 40000;
    const ringCount = isMobile ? 50 : 140;
    const rad = 5;
    const baseSize = 0.1;

    let sph = new THREE.Spherical();
    let pts = [], uvs = [], scales = [];
    const approxEquatorCount = Math.max(4, Math.ceil(desiredTotalPoints / ringCount));

    for (let i = 0; i < ringCount; i++) {
      const phi = (i + 0.5) / ringCount * Math.PI;
      const countInRing = Math.max(3, Math.round(approxEquatorCount * Math.sin(phi)));
      for (let j = 0; j < countInRing; j++) {
        const theta = (j / countInRing) * Math.PI * 2;
        const p = new THREE.Vector3().setFromSphericalCoords(rad, phi, theta);
        pts.push(p);
        sph.setFromVector3(p);
        uvs.push((sph.theta + Math.PI) / (Math.PI * 2), 1.0 - sph.phi / Math.PI);
        scales.push(Math.random());
      }
    }

    let g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(uvs), 2));
    g.setAttribute("aScale", new THREE.Float32BufferAttribute(new Float32Array(scales), 1));

    const textureLoader = new THREE.TextureLoader();
    const globeTex = textureLoader.load("/images/repair4.png");

    let m = new THREE.PointsMaterial({
      size: baseSize,
      vertexColors: false,
      color: 0xff4d4d, // Artemis Red
      transparent: true,
      opacity: 0.8,
      onBeforeCompile: (shader) => {
        shader.uniforms.globeTexture = { value: globeTex };
        shader.uniforms.landMinScale = { value: isMobile ? 0.2 : 0.1 };
        shader.uniforms.landMaxScale = { value: isMobile ? 0.35 : 0.25 };
        shader.uniforms.waterScale = { value: isMobile ? 0.1 : 0.05 };

        shader.vertexShader = `
          attribute float aScale;
          uniform sampler2D globeTexture;
          uniform float landMinScale;
          uniform float landMaxScale;
          uniform float waterScale;
          varying float vVisibility;
          varying vec3 vNormal;
          varying vec3 vMvPosition;
          ${shader.vertexShader}
        `.replace(`gl_PointSize = size;`, `
          vVisibility = texture(globeTexture, uv).g;
          vNormal = normalMatrix * normalize(position);
          vMvPosition = -mvPosition.xyz;
          float perspectiveScale = 0.4 + dot(normalize(vMvPosition), vNormal) * 0.6;
          float landSize = landMinScale + aScale * (landMaxScale - landMinScale);
          float waterSize = waterScale;
          gl_PointSize = (vVisibility < 0.5 ? landSize : waterSize) * perspectiveScale;
        `);

        shader.fragmentShader = `
          varying float vVisibility;
          varying vec3 vNormal;
          varying vec3 vMvPosition;
          ${shader.fragmentShader}
        `.replace(`vec4 diffuseColor = vec4( diffuse, opacity );`, `
          bool circ = length(gl_PointCoord - 0.5) > 0.5;
          bool vis = dot(vMvPosition, vNormal) < 0.;
          if (circ || vis) discard;
          vec4 diffuseColor = vec4(diffuse, opacity);
        `);
      }
    });

    let globe = new THREE.Points(g, m);
    scene.add(globe);

    let icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(rad + 0.5, 1),
      new THREE.MeshBasicMaterial({ color: 0xff4d4d, wireframe: true, opacity: 0.1, transparent: true })
    );
    globe.add(icosahedron);

    let vertexPositions = icosahedron.geometry.attributes.position;
    let vertexGroup = new THREE.Group();
    for (let i = 0; i < vertexPositions.count; i++) {
      let v = new THREE.Vector3().fromBufferAttribute(vertexPositions, i);
      let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff4d4d })
      );
      sphere.position.copy(v);
      vertexGroup.add(sphere);
    }
    globe.add(vertexGroup);

    function latLonToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = lon * (Math.PI / 180);
      return new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    }

    const plus_svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.48117 12V4H8.51883V12H7.48117ZM4 8.51883V7.49791H12V8.51883H4Z" fill="#ff4d4d"/><mask id="path-2-inside-1_4005_7204" fill="white"><path d="M13 0H16V3H13V0Z"/></mask><path d="M16 0H16.4V-0.4H16V0ZM13 0V0.4H16V0V-0.4H13V0ZM16 0H15.6V3H16H16.4V0H16Z" fill="#ff4d4d" mask="url(#path-2-inside-1_4005_7204)"/><mask id="path-4-inside-2_4005_7204" fill="white"><path d="M13 13H16V16H13V13Z"/></mask><path d="M16 16V16.4H16.4V16H16ZM16 13H15.6V16H16H16.4V13H16ZM16 16V15.6H13V16V16.4H16V16Z" fill="#ff4d4d" mask="url(#path-4-inside-2_4005_7204)"/><mask id="path-6-inside-3_4005_7204" fill="white"><path d="M0 13H3V16H0V13Z"/></mask><path d="M0 16H-0.4V16.4H0V16ZM3 16V15.6H0V16V16.4H3V16ZM0 16H0.4V13H0H-0.4V16H0Z" fill="#ff4d4d" mask="url(#path-6-inside-3_4005_7204)"/><mask id="path-8-inside-4_4005_7204" fill="white"><path d="M0 0H3V3H0V0Z"/></mask><path d="M0 0V-0.4H-0.4V0H0ZM0 0V0.4H3V0V-0.4H0V0ZM0 3H0.4V0H0H-0.4V3H0Z" fill="#ff4d4d" mask="url(#path-8-inside-4_4005_7204)"/></svg>`;

    const minus_svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8.90708V7.09296H12V8.90708H4Z" fill="#ff4d4d"/><mask id="path-2-inside-1_4086_10833" fill="white"><path d="M13 0H16V3H13V0Z"/></mask><path d="M16 0H16.4V-0.4H16V0ZM13 0V0.4H16V0V-0.4H13V0ZM16 0H15.6V3H16H16.4V0H16Z" fill="#ff4d4d" mask="url(#path-2-inside-1_4086_10833)"/><mask id="path-4-inside-2_4086_10833" fill="white"><path d="M13 13H16V16H13V13Z"/></mask><path d="M16 16V16.4H16.4V16H16ZM16 13H15.6V16H16H16.4V13H16ZM16 16V15.6H13V16V16.4H16V16Z" fill="#ff4d4d" mask="url(#path-4-inside-2_4086_10833)"/><mask id="path-6-inside-3_4086_10833" fill="white"><path d="M0 13H3V16H0V13Z"/></mask><path d="M0 16H-0.4V16.4H0V16ZM3 16V15.6H0V16V16.4H3V16ZM0 16H0.4V13H0H-0.4V16H0Z" fill="#ff4d4d" mask="url(#path-6-inside-3_4086_10833)"/><mask id="path-8-inside-4_4086_10833" fill="white"><path d="M0 0H3V3H0V0Z"/></mask><path d="M0 0V-0.4H-0.4V0H0ZM0 0V0.4H3V0V-0.4H0V0ZM0 3H0.4V0H0H-0.4V3H0Z" fill="#ff4d4d" mask="url(#path-8-inside-4_4086_10833)"/></svg>`;

    const cities = [
      {
        name: "LAHORE,PAKISTAN",
        lat: 31.5497,
        lon: 74.3436,
        img: "/images/lab.png",
        desc: "ArtemisUAV headquarters. Home to our core engineering, R&D, and operations team."
      }
    ];

    const allIcons = [];

    cities.forEach(city => {
      const pos = latLonToVector3(city.lat, city.lon, rad + 0.1);

      const div = document.createElement("div");
      div.className = "city-label";

      const icon = document.createElement("span");
      icon.innerHTML = plus_svg;
      icon.style.cssText = "display:inline-block;width:16px;height:16px;cursor:pointer;margin-right:8px;";

      const text = document.createElement("span");
      text.textContent = city.name;

      div.appendChild(icon);
      div.appendChild(text);

      const extraDiv = document.createElement("div");
      extraDiv.style.cssText = "display:none;background:rgba(15,15,15,0.9);padding:0 0 0 0px;width:343px;color:#fff;position:absolute;top:100%;left:0;z-index:1000;font-size:11px;text-align:left;backdrop-filter:blur(8px);box-shadow:0 4px 25px rgba(0,0,0,0.6);border:1px solid rgba(255,77,77,0.2);margin-top:10px;";

      const extraContent = document.createElement("div");
      extraContent.style.cssText = "display:flex;justify-content:space-between;align-items:stretch;height:100%;";

      const left = document.createElement("div");
      left.style.flex = "1";
      left.style.padding = "12px";

      function formatLatLon(lat, lon) {
        function toDMS(deg, isLat) {
          const absolute = Math.abs(deg);
          const d = Math.floor(absolute);
          const mFloat = (absolute - d) * 60;
          const m = Math.floor(mFloat);
          const s = ((mFloat - m) * 60).toFixed(3);
          const direction = isLat ? (deg >= 0 ? "N" : "S") : (deg >= 0 ? "E" : "W");
          return `${d}° ${m}' ${s}" ${direction}`;
        }
        return `${toDMS(lat, true)} ${toDMS(lon, false)}`;
      }

      const coords = document.createElement("div");
      coords.textContent = formatLatLon(city.lat, city.lon);
      coords.style.cssText = "margin-bottom:8px;color:#ff4d4d;font-weight:700;";

      const desc = document.createElement("div");
      desc.textContent = city.desc;
      desc.style.cssText = "line-height:1.5;opacity:0.8;";

      left.appendChild(coords);
      left.appendChild(desc);

      const img = document.createElement("img");
      img.src = city.img;
      img.style.cssText = "width:100px;height:auto;object-fit:cover;border-left:1px solid rgba(255,77,77,0.2);";

      extraContent.appendChild(left);
      extraContent.appendChild(img);
      extraDiv.appendChild(extraContent);
      div.appendChild(extraDiv);

      const label = new CSS2DObject(div);
      label.position.copy(pos);
      scene.add(label);

      allIcons.push({ div, img, coords, desc, icon, text, city, extraDiv, label });

      div.addEventListener("mousedown", e => e.stopPropagation());
      extraDiv.addEventListener("mousedown", e => e.stopPropagation());

      div.addEventListener("click", () => {
        if (isRotating) return;
        if (icon.dataset.state === "plus" || !icon.dataset.state) {
          allIcons.forEach(({ icon: o, text: t, city: c, extraDiv: e }) => {
            o.innerHTML = plus_svg; o.dataset.state = "plus"; t.textContent = c.name; e.style.display = "none";
          });
          icon.innerHTML = minus_svg;
          icon.dataset.state = "minus";
          extraDiv.style.display = "block";
          controls.autoRotate = false;
          rotateCameraToLabel(label.position, isMobile ? 0.8 : 1.2);
        } else {
          icon.innerHTML = plus_svg;
          icon.dataset.state = "plus";
          text.textContent = city.name;
          extraDiv.style.display = "none";
          controls.autoRotate = true;
        }
      });
    });

    let clock = new THREE.Clock();
    let animId;
    const animate = () => {
      globalUniforms.time.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    function rotateCameraToLabel(labelPosition, duration = 1.0) {
      if (isRotating) return;
      isRotating = true;
      const camPos = camera.position.clone().sub(controls.target);
      const labelDir = labelPosition.clone().sub(controls.target).normalize();
      const spherical = new THREE.Spherical().setFromVector3(camPos);
      const targetSph = new THREE.Spherical();
      targetSph.radius = spherical.radius;
      targetSph.phi = Math.acos(labelDir.y);
      targetSph.theta = Math.atan2(labelDir.x, labelDir.z);
      const startPhi = spherical.phi;
      const startTheta = spherical.theta;
      let elapsed = 0;
      const step = (delta) => {
        elapsed += delta;
        const t = Math.min(elapsed / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        spherical.phi = startPhi + (targetSph.phi - startPhi) * ease;
        spherical.theta = startTheta + (targetSph.theta - startTheta) * ease;
        camera.position.setFromSpherical(spherical).add(controls.target);
        camera.lookAt(controls.target);
        if (t < 1) requestAnimationFrame(() => step(clock.getDelta()));
        else isRotating = false;
      };
      step(0);
    }

    function adjustCameraForScreen() {
      if (!container) return;
      const w = container.offsetWidth;
      if (w < 450) {
        camera.position.setLength(25);
        allIcons.forEach(({ extraDiv, coords, desc }) => {
          extraDiv.style.width = "260px";
          extraDiv.style.left = "50%"; extraDiv.style.transform = "translateX(-50%)";
        });
      } else if (w < 800) {
        camera.position.setLength(20);
        allIcons.forEach(({ extraDiv }) => {
          extraDiv.style.width = "300px";
          extraDiv.style.left = "0"; extraDiv.style.transform = "";
        });
      } else {
        camera.position.setLength(15);
        allIcons.forEach(({ extraDiv }) => {
          extraDiv.style.width = "343px";
          extraDiv.style.left = "0"; extraDiv.style.transform = "";
        });
      }
    }

    adjustCameraForScreen();

    const handleGlobalMouseDown = (event) => {
      if (!allIcons.some(({ extraDiv }) => extraDiv.style.display === "block")) return;
      const clickedInside = allIcons.some(({ div, extraDiv }) => div.contains(event.target) || extraDiv.contains(event.target));
      if (!clickedInside) {
        allIcons.forEach(({ icon, text, city, extraDiv }) => {
          icon.innerHTML = plus_svg; icon.dataset.state = "plus";
          text.textContent = city.name; extraDiv.style.display = "none";
        });
        controls.autoRotate = true;
      }
    };

    container.addEventListener("mousedown", handleGlobalMouseDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onWindowResize);
      container.removeEventListener("mousedown", handleGlobalMouseDown);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (container.contains(labelRenderer.domElement)) container.removeChild(labelRenderer.domElement);
      scene.clear();
    };
  }, []);

  return <GlobeWrapper id="globeContainer" ref={containerRef} />;
};

export default GlobeAnimation;
