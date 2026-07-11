import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileQuestion, HelpCircle, Shield, CreditCard, Clock } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'application' | 'payment' | 'documents';
}

export const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: 'What is an Indian e-Visa?',
      answer: 'An Indian e-Visa is an official document permitting entry into and travel within India. It is electronically linked to your passport and eliminates the need for physical stickers or embassy interviews.',
      category: 'general'
    },
    {
      question: 'Who is eligible to apply for an e-Visa?',
      answer: 'Citizens of 165+ eligible countries holding ordinary passports valid for at least six months from the date of arrival in India. Diplomacy and service passport holders are not eligible.',
      category: 'general'
    },
    {
      question: 'How long before my travel date should I apply?',
      answer: 'For e-Tourist Visa (30 days), apply between 4 to 30 days prior to travel. For 1-year and 5-year Tourist or Business Visas, you can apply up to 120 days in advance of your scheduled entry.',
      category: 'application'
    },
    {
      question: 'Can I track my application status online?',
      answer: 'Yes. You can track your application status using the Application ID generated during submission and your Passport Number on the "Track Application" tab of this portal.',
      category: 'application'
    },
    {
      question: 'What are the photo and passport upload requirements?',
      answer: 'Your photo must be a recent color image, clear, with a plain white background, in JPG format (up to 1MB). Your passport bio page must be a clear PDF copy (up to 3MB) displaying all details and photo.',
      category: 'documents'
    },
    {
      question: 'Is the visa application fee refundable?',
      answer: 'No. The government visa application fee is a processing fee and is non-refundable regardless of whether your visa application is approved, rejected, or withdrawn.',
      category: 'payment'
    },
    {
      question: 'Which ports of entry are eligible for e-Visa holders?',
      answer: 'e-Visa holders can enter India through 28 designated international airports (including Delhi, Mumbai, Bengaluru, Chennai, Kolkata) and 5 designated seaports.',
      category: 'general'
    },
    {
      question: 'What should I do if my payment fails?',
      answer: 'If your payment fails but your card was charged, do not reapply immediately. Wait up to 2 hours for our systems to sync with the payment gateway. If still unpaid, you can log in using "Resume Application" and try paying again.',
      category: 'payment'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'application' | 'payment' | 'documents'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' ? true : faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const categories = [
    { id: 'all', label: 'All FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', label: 'General Information', icon: <Shield className="w-4 h-4" /> },
    { id: 'application', label: 'Application Process', icon: <Clock className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents Upload', icon: <FileQuestion className="w-4 h-4" /> },
    { id: 'payment', label: 'Fees & Payments', icon: <CreditCard className="w-4 h-4" /> }
  ];

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 border border-blue-100 rounded px-2.5 py-1">Support</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 mt-3">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-600 mt-2 font-medium">
            Find answers to common queries regarding eligibility, registration, documentation, fees, and processing times.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs by keywords (e.g. refund, passport, photo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl shadow-gov-sm font-medium text-slate-800 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setExpandedIndex(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-slate-200 rounded-gov shadow-gov-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isExpanded}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-5 pt-1 text-left border-t border-slate-50 animate-in fade-in duration-200">
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-slate-200 rounded-gov p-8 text-center text-slate-500 font-medium">
              No results found matching "{searchQuery}". Try searching for alternative keywords.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
