import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  LifeBuoy, 
  Send, 
  Building,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface EmbassyInfo {
  country: string;
  embassyName: string;
  address: string;
  phone: string;
  email: string;
}

export const Contact: React.FC = () => {
  // Embassy data mockup
  const embassies: EmbassyInfo[] = [
    {
      country: 'United States',
      embassyName: 'Embassy of India, Washington D.C.',
      address: '2107 Massachusetts Ave NW, Washington, DC 20008, United States',
      phone: '+1 202-939-7000',
      email: 'visa.washington@mea.gov.in'
    },
    {
      country: 'United Kingdom',
      embassyName: 'High Commission of India, London',
      address: 'India House, Aldwych, London WC2B 4NA, United Kingdom',
      phone: '+44 20-7836-8484',
      email: 'visa.london@mea.gov.in'
    },
    {
      country: 'Canada',
      embassyName: 'High Commission of India, Ottawa',
      address: '10 Springfield Rd, Ottawa, ON K1M 1C9, Canada',
      phone: '+1 613-744-3751',
      email: 'cons.ottawa@mea.gov.in'
    },
    {
      country: 'Australia',
      embassyName: 'High Commission of India, Canberra',
      address: '3 Moonah Pl, Yarralumla ACT 2600, Australia',
      phone: '+61 2-6273-3999',
      email: 'visa.canberra@mea.gov.in'
    },
    {
      country: 'Germany',
      embassyName: 'Embassy of India, Berlin',
      address: 'Tiergartenstraße 17, 10785 Berlin, Germany',
      phone: '+49 30-257950',
      email: 'cons.berlin@mea.gov.in'
    },
    {
      country: 'France',
      embassyName: 'Embassy of India, Paris',
      address: '15 Rue Alfred Dehodencq, 75016 Paris, France',
      phone: '+33 1-40-50-70-70',
      email: 'cons.paris@mea.gov.in'
    }
  ];

  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'technical',
    message: ''
  });

  const activeEmbassy = embassies.find(e => e.country === selectedCountry) || embassies[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
    }
  };

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 border border-blue-100 rounded px-2.5 py-1">Helpdesk</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            Contact Support & Find Embassies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
            Contact the official technical support center for application issues, or locate the nearest Indian Consulate/Embassy in your country of residence.
          </p>
        </div>

        {/* Support channels grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Tech Support */}
          <div className="bg-white border border-slate-200 rounded-gov p-6 shadow-gov-sm text-left flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-slate-900">24/7 Telephone Helpdesk</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                For urgent application process queries or payment disputes. Available in English, Hindi, and regional languages.
              </p>
              <div className="mt-4 space-y-1">
                <span className="block text-sm font-extrabold text-slate-800">+91-11-24300500</span>
                <span className="block text-sm font-extrabold text-slate-800">+91-11-24300511</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block pt-4 mt-4 border-t border-slate-100">
              International calling charges apply
            </span>
          </div>

          {/* Email Support */}
          <div className="bg-white border border-slate-200 rounded-gov p-6 shadow-gov-sm text-left flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fff5eb] border border-orange-100 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-[#FF9933]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email Support</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Submit screenshots of errors, transaction failure slips, or request clarifications on document uploads.
              </p>
              <div className="mt-4">
                <a href="mailto:indian-evisa@gov.in" className="text-sm font-extrabold text-primary hover:underline">
                  indian-evisa@gov.in
                </a>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block pt-4 mt-4 border-t border-slate-100">
              Response time: 4 to 12 Hours
            </span>
          </div>

          {/* Official Bureau */}
          <div className="bg-white border border-slate-200 rounded-gov p-6 shadow-gov-sm text-left flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Bureau of Immigration</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Headquarters under Ministry of Home Affairs. For official correspondence or visa guidelines compliance.
              </p>
              <div className="mt-4 text-xs text-slate-700 leading-normal font-medium flex items-start gap-1">
                <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                <span>East Block-VIII, Level-V, Sector-1, R.K. Puram, New Delhi - 110066, India</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block pt-4 mt-4 border-t border-slate-100">
              Physical inquiries by appointment only
            </span>
          </div>
        </div>

        {/* Form and Embassy finder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Support Ticket Form - Left */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-gov p-6 md:p-8 shadow-gov-sm text-left">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-primary" /> Log a Support Inquiry
            </h2>

            {formSubmitted ? (
              <div className="border border-green-200 bg-green-50/50 rounded-gov p-8 text-center animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Inquiry Logged Successfully</h3>
                <p className="text-sm text-slate-600 mt-2 font-medium max-w-md mx-auto">
                  We have received your support request. A support agent will review your case and respond to your email <strong>{formData.email}</strong> shortly.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase bg-slate-100 rounded px-2.5 py-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Case Ticket: #GOV-TKT-2026-X84
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', category: 'technical', message: '' });
                  }}
                  className="mt-6 px-4 py-2 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Log Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name-input" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email-input" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john.doe@example.com"
                      className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category-select" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                      Category
                    </label>
                    <select
                      id="category-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                    >
                      <option value="technical">Portal Bug / Upload Error</option>
                      <option value="payment">Fee Payment / Surcharge Issue</option>
                      <option value="correction">Application Details Correction</option>
                      <option value="status">Status Inquiry Delay</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject-input" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject-input"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Passport Photo upload failing"
                      className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message-textarea" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                    Detailed Message
                  </label>
                  <textarea
                    id="message-textarea"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your issue with error codes or Application IDs if applicable..."
                    className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Submit Support Request
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Embassy Finder - Right */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-gov p-6 md:p-8 shadow-gov-sm text-left">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" /> Indian Embassy Finder
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="embassy-country" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                  Select Country
                </label>
                <select
                  id="embassy-country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                >
                  {embassies.map(e => (
                    <option key={e.country} value={e.country}>{e.country}</option>
                  ))}
                </select>
              </div>

              {/* Embassy Address Output Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">
                  {activeEmbassy.embassyName}
                </h3>

                <div className="space-y-3 text-xs font-semibold text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{activeEmbassy.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{activeEmbassy.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${activeEmbassy.email}`} className="text-primary hover:underline">
                      {activeEmbassy.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Notification Banner */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start space-x-2.5">
                <AlertCircle className="w-4.5 h-4.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800 leading-normal font-medium">
                  <strong>Notice:</strong> e-Visa applications are NOT processed at physical embassies. If you have already applied online, do not visit or call embassies. Check your status directly using our online tracker.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
};
