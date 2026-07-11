import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { VisaTypes } from './pages/VisaTypes';
import { Fees } from './pages/Fees';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { TrackApplication } from './pages/TrackApplication';
import { ApplyWizard } from './pages/ApplyWizard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* Sticky Header Nav */}
        <Navbar />
        
        {/* Router Content Outlet */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apply" element={<ApplyWizard />} />
            <Route path="/visa-types" element={<VisaTypes />} />
            <Route path="/track" element={<TrackApplication />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        
        {/* Official Government Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
