import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  UploadCloud, 
  CreditCard, 
  CheckCircle, 
  Shield, 
  Clock, 
  CheckSquare, 
  HelpCircle, 
  DollarSign, 
  Compass,
  ArrowRight,
  Globe,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

// Custom SVG Component for the Ashok Chakra
const AshokChakra: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {Array.from({ length: 24 }).map((_, i) => (
      <path
        key={i}
        d="M 49 50 L 48.5 12 L 50 4 L 51.5 12 Z"
        fill="currentColor"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}
  </svg>
);

export const LandingPage: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Apply Online',
      description: 'Fill out the secure online application form with your personal and travel information.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
    },
    {
      number: '02',
      title: 'Upload Documents',
      description: 'Submit your scanned passport page and a passport-size photograph directly to our portal.',
      icon: <UploadCloud className="w-6 h-6 text-orange-500" />,
    },
    {
      number: '03',
      title: 'Pay Fee Securely',
      description: 'Complete the government e-Visa fee payment online using credit card, debit card, or PayPal.',
      icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
    },
    {
      number: '04',
      title: 'Receive e-Visa',
      description: 'Your approved e-Visa is sent directly to your registered email address. Print it and travel.',
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    },
  ];

  const features = [
    {
      title: 'Secure Processing',
      description: 'Bank-grade SSL encryption and secure government databases protect your sensitive personal and travel details.',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Fast Approval',
      description: 'Get your travel authorization within 72 hours for standard processing. Express processing options are available.',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Government Verified',
      description: 'Official application reviewed directly by officers of the Bureau of Immigration, Government of India.',
      icon: <CheckSquare className="w-5 h-5 text-blue-600" />,
    },
    {
      title: '24/7 Support Desk',
      description: 'Round-the-clock telephone and email assistance for application form issues or status queries.',
      icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Transparent Fees',
      description: 'Zero hidden agent charges. Clear pricing breakdown by nationality and visa category directly displayed.',
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Multiple Categories',
      description: 'Whether traveling for tourism, medical treatment, conferences, business, or studies—we have specific electronic visas.',
      icon: <Compass className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen font-sans">
      
      {/* SPLIT HERO SECTION */}
      <section className="relative bg-white flex flex-col lg:flex-row min-h-[90vh] lg:min-h-[85vh] overflow-hidden">
        
        {/* Decorative Half Ashok Chakra Background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -left-[35vh] lg:-left-[40vh] top-1/2 -translate-y-1/2 w-[70vh] h-[70vh] lg:w-[80vh] lg:h-[80vh] text-blue-900/[0.04] pointer-events-none z-0"
        >
          {/* Custom slow spin class to make it feel dynamic */}
          <AshokChakra className="w-full h-full animate-[spin_120s_linear_infinite]" />
        </motion.div>

        {/* Left Content Side (60% width on desktop) */}
        <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 pt-20 pb-28 lg:pt-24 lg:pb-36 xl:pt-28 xl:pb-40 relative z-10 order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl backdrop-blur-[2px] bg-white/30 p-4 -ml-4 rounded-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50/80 backdrop-blur-md text-blue-700 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <Globe className="w-4 h-4" />
              <span>Government of India Official Portal</span>
            </div>
            
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Your Gateway to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-blue-800">
                Incredible India
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed mb-10 max-w-xl">
              Apply securely for tourist, business, and medical e-Visas in minutes. Direct government processing with zero hidden agent fees.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-700/30"
              >
                Start Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                to="/apply?resume=true"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-base font-bold rounded-xl border-2 border-slate-200 transition-all duration-300 focus:ring-4 focus:ring-slate-200 shadow-sm"
              >
                Resume Saved Form
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-slate-200/60">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm ring-2 ring-slate-50">IN</div>
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm ring-2 ring-slate-50">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm ring-2 ring-slate-50">GOV</div>
              </div>
              <div className="text-sm text-slate-600 font-medium leading-snug">
                Processed directly by <br />
                <strong className="text-slate-900">Ministry of Home Affairs</strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Image Side (Edge to Edge) */}
        <div className="w-full lg:w-[45%] xl:w-[40%] relative h-[40vh] lg:h-auto order-1 lg:order-2 overflow-hidden">
          {/* Overlays for depth and contrast */}
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10 lg:hidden"></div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 hidden lg:block"></div>
          
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2071" 
            alt="Stunning view of the Taj Mahal representing travel to India" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* OVERLAPPING STATS BANNER */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-16 mb-16" aria-label="Portal Trust Statistics">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:p-8 backdrop-blur-sm bg-white/95">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-100">
            <div className="text-center md:px-4">
              <span className="block text-3xl lg:text-4xl font-extrabold text-blue-700 mb-1">5M+</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Visas Issued</span>
            </div>
            <div className="text-center md:px-4">
              <span className="block text-3xl lg:text-4xl font-extrabold text-blue-700 mb-1">165+</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Countries</span>
            </div>
            <div className="text-center md:px-4">
              <span className="block text-3xl lg:text-4xl font-extrabold text-blue-700 mb-1">72h</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Processing</span>
            </div>
            <div className="text-center md:px-4">
              <span className="block text-3xl lg:text-4xl font-extrabold text-blue-700 mb-1">99%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Approval Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-slate-50" aria-labelledby="process-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="process-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Your Journey Starts Here
            </h2>
            <p className="text-lg text-slate-600 mt-4 font-medium">
              A fully digital, streamlined workflow. No embassies, no paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 z-0"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mb-6 shrink-0 shadow-inner">
                  {React.cloneElement(step.icon, { 
                    className: "w-8 h-8 group-hover:text-white transition-colors duration-300" 
                  })}
                </div>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-sm font-black text-blue-600/50">{step.number}</span>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white" aria-labelledby="features-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="features-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Why Use the Official Portal?
            </h2>
            <p className="text-lg text-slate-600 mt-4 font-medium">
              We process visa request applications under strict privacy laws with direct access to official immigration checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors duration-300">
                <div className="p-3.5 bg-white shadow-sm border border-slate-100 text-blue-600 rounded-xl inline-block mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY BANNER (Footer level) */}
      <section className="py-6 bg-slate-900 text-slate-300" aria-label="Official Government Advisory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-left">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
              <Award className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Official Security Advisory</h4>
              <p className="text-xs leading-relaxed max-w-2xl">
                Beware of fraudulent websites claiming to process Indian visas. Ensure you are applying on the official portal. Official domains always end in <strong className="text-white">.gov.in</strong>.
              </p>
            </div>
          </div>
          <a 
            href="https://indianvisaonline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg border border-slate-700 transition-colors shrink-0 whitespace-nowrap"
          >
            Verify Official Domain
          </a>
        </div>
      </section>
    </main>
  );
};