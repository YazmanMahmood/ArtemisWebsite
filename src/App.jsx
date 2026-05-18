import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy-loaded routes
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CustomizePage = lazy(() => import('./pages/CustomizePage'));
const AutomationsPage = lazy(() => import('./components/AutomationsPage'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 700);
  }, []);

  useEffect(() => {
    // Update canonical tag
    const link = document.querySelector("link[rel='canonical']") || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", `https://artemisuav.com${window.location.pathname}`);
    if (!document.querySelector("link[rel='canonical']")) {
      document.head.appendChild(link);
    }
  }, [window.location.pathname]);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          isLoading={isLoading}
          onAnimationComplete={() => setShowContent(true)}
        />
      )}
      <div
        className="app-container"
        style={{ display: isLoading ? 'none' : 'block', opacity: showContent ? 1 : 0 }}
      >
        <Navbar />
        <main className="content">
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/automations" element={<AutomationsPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
