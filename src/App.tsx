import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccentProvider } from '@/context/AccentContext';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import KeyPage from '@/pages/KeyPage';
import LoginPage from '@/pages/LoginPage';

function App() {
  return (
    <AccentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/key/:keyName" element={<KeyPage />} />
          <Route path="/docs" element={<LandingPage />} />
          <Route path="/terms" element={<LandingPage />} />
          <Route path="/privacy" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AccentProvider>
  );
}

export default App;
