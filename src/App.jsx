import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/common/LoadingScreen';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import CustomizePage from './pages/CustomizePage';
import AutomationsPage from './components/AutomationsPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 700);
  }, []);

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/automations" element={<AutomationsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
