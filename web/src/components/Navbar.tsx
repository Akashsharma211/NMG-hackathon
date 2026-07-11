import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Accessibility, Menu, X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  
  // Accessibility & Theme state
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [currentLang, setCurrentLang] = useState('English');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Apply', path: '/apply' },
    { name: 'Visa Types', path: '/visa-types' },
    { name: 'Track Application', path: '/track' },
    { name: 'Fees', path: '/fees' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Support', path: '/contact' }
  ];

  const languages = ['English', 'Español', 'Français', 'Deutsch', '日本語', 'हिन्दी'];

  // Toggle high contrast
  const handleContrastToggle = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  };

  // Adjust font size
  const handleFontSizeChange = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSize(size);
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('text-normal', 'text-large', 'text-xlarge');
    if (size === 'normal') {
      htmlElement.classList.add('text-normal');
      htmlElement.style.fontSize = '16px';
    } else if (size === 'large') {
      htmlElement.classList.add('text-large');
      htmlElement.style.fontSize = '18px';
    } else if (size === 'extra-large') {
      htmlElement.classList.add('text-xlarge');
      htmlElement.style.fontSize = '20px';
    }
  };

  // Close menus on route change or outside click
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 font-sans shadow-sm">
      
      {/* TOP BANNER - Official Government of India Header */}
      <div className="w-full bg-slate-900 text-slate-200 text-[11px] sm:text-xs font-medium py-1.5 px-4 flex justify-between items-center border-b border-slate-800 relative z-20">
        <div className="flex items-center space-x-3 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center space-x-2.5">
            {/* Indian Flag Strip */}
            <div className="flex flex-col h-3 w-4 rounded-sm overflow-hidden shadow-sm">
              <span className="h-1 w-full bg-orange-500"></span>
              <span className="h-1 w-full bg-white"></span>
              <span className="h-1 w-full bg-green-600"></span>
            </div>
            <span className="tracking-wide">Official Portal of the Government of India</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-5">
            <a href="#main-content" className="hover:text-white transition-colors duration-200 underline decoration-slate-600 underline-offset-2">Skip to main content</a>
            
            <div className="h-3 w-px bg-slate-700"></div>
            
            {/* Accessibility Controls */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleContrastToggle}
                className={`flex items-center gap-1.5 transition-colors duration-200 ${highContrast ? 'text-orange-400' : 'hover:text-white'}`}
                aria-label="Toggle High Contrast"
                title="Toggle High Contrast"
              >
                <Accessibility className="w-3.5 h-3.5" />
                <span className="sr-only">High Contrast</span>
              </button>
              
              <div className="flex items-center space-x-1.5 bg-slate-800 rounded px-1.5 py-0.5">
                {(['normal', 'large', 'extra-large'] as const).map((size, idx) => (
                  <button 
                    key={size}
                    onClick={() => handleFontSizeChange(size)} 
                    className={`w-5 h-5 rounded flex items-center justify-center font-bold transition-colors ${
                      fontSize === size ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                    title={`${size.charAt(0).toUpperCase() + size.slice(1)} Font Size`}
                  >
                    {idx === 0 ? 'A' : idx === 1 ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group" aria-label="Home page of e-Visa Portal">
              {/* Official State Emblem of India (Ashoka Emblem) */}
              <div className="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="State Emblem of India" 
                  className="h-12 w-auto sm:h-16 object-contain" 
                  onError={(e) => (e.currentTarget.style.opacity = '0')} 
                />
              </div>
              <div className="flex flex-col border-l-2 border-slate-300 pl-3 sm:pl-4 py-1 min-w-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-600 mb-0.5 truncate">
                  भारत सरकार / Government of India
                </span>
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-blue-900 flex flex-wrap items-center gap-1.5 leading-tight">
                  Indian e-Visa
                  <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded-sm border border-orange-200 tracking-wider">OFFICIAL</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-700 bg-blue-50/80' 
                        : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions (Language & CTA) */}
            <div className="hidden lg:flex items-center space-x-4 shrink-0">
              
              {/* Language Selector */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm text-slate-700 font-semibold bg-white transition-all hover:bg-slate-50 shadow-sm"
                  aria-expanded={langDropdownOpen}
                  aria-haspopup="true"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>{currentLang}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setCurrentLang(lang);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex justify-between items-center font-medium transition-colors ${
                            currentLang === lang ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {lang}
                          {currentLang === lang && <Check className="w-4 h-4 text-blue-600" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary Apply Button */}
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-700/30"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-600 bg-slate-50 border border-slate-200 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white border-t border-slate-200"
            >
              <div className="py-4 px-4 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`px-4 py-3.5 text-base font-bold rounded-xl transition-colors ${
                          isActive 
                            ? 'text-blue-700 bg-blue-50/70 border-l-4 border-blue-600' 
                            : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="h-px w-full bg-slate-100"></div>

                {/* Mobile Settings/Utilities */}
                <div className="bg-slate-50 rounded-2xl p-4 space-y-4 border border-slate-100">
                  {/* Language Selector */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Language
                    </span>
                    <select 
                      value={currentLang}
                      onChange={(e) => setCurrentLang(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-700 font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    {/* Contrast Mode */}
                    <div className="flex flex-col space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contrast</span>
                      <button
                        onClick={handleContrastToggle}
                        className={`flex items-center justify-between px-3 py-2 border rounded-lg transition-colors w-full ${
                          highContrast ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-sm font-bold">High Contrast Mode</span>
                        <Accessibility className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="pt-2 pb-4">
                  <Link
                    to="/apply"
                    className="flex items-center justify-center w-full px-4 py-3.5 bg-blue-700 text-white text-base font-bold rounded-xl shadow-md active:scale-[0.98] transition-transform"
                  >
                    Start Application
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};