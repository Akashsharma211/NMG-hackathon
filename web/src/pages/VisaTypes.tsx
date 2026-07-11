import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Palmtree, 
  Briefcase, 
  Activity, 
  Users, 
  GraduationCap, 
  SearchCode, 
  Home, 
  Clock, 
  Calendar, 
  FileCheck,
  Info
} from 'lucide-react';

interface VisaCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  validity: string;
  entries: string;
  documents: string[];
  recommendedFor: string;
}

export const VisaTypes: React.FC = () => {
  const visaCategories: VisaCategory[] = [
    {
      id: 'tourist',
      title: 'e-Tourist Visa',
      description: 'Designed for international travelers whose sole objective of visiting India is recreation, sightseeing, casual visit to meet friends or relatives, or attending short term yoga programs.',
      icon: <Palmtree className="w-8 h-8 text-[#FF9933]" />,
      duration: '30 Days / 1 Year / 5 Years',
      validity: 'Double (30 Days) / Multiple (1 & 5 Years)',
      entries: 'Multiple entries allowed for 1/5 year terms',
      documents: [
        'Scanned bio page of passport',
        'Recent digital photograph with white background',
        'Return flight reservation (optional check)'
      ],
      recommendedFor: 'Sightseeing, family visits, short yoga programs.'
    },
    {
      id: 'business',
      title: 'e-Business Visa',
      description: 'For business professionals coming to set up a venture, attend commercial meetings, trade fairs, recruit manpower, deliver lectures, or participate in exhibitions.',
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      duration: 'Up to 180 Days per visit',
      validity: '1 Year (Multiple Entries)',
      entries: 'Multiple entries allowed',
      documents: [
        'Scanned bio page of passport',
        'Digital passport photograph',
        'Copy of Business Card or Invitation Letter from host Indian company'
      ],
      recommendedFor: 'Commercial meetings, trade exhibitions, recruitment, setup consultancies.'
    },
    {
      id: 'medical',
      title: 'e-Medical Visa',
      description: 'For travelers seeking short-term medical treatment under recognized hospitals or treatment centers in India. Up to two medical attendants can accompany under e-Medical Attendant visas.',
      icon: <Activity className="w-8 h-8 text-emerald-600" />,
      duration: 'Up to 60 Days',
      validity: '60 Days (Triple Entries)',
      entries: 'Triple entries allowed',
      documents: [
        'Scanned bio page of passport',
        'Digital passport photograph',
        'Official referral letter from the Indian Hospital/Medical Center stating details'
      ],
      recommendedFor: 'Specialized hospital treatments, surgeries, wellness therapies.'
    },
    {
      id: 'conference',
      title: 'e-Conference Visa',
      description: 'To attend seminars, workshops, or academic conferences organized by government ministries, public universities, or certified organizations.',
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      duration: 'Up to 30 Days',
      validity: '30 Days (Single Entry)',
      entries: 'Single entry only',
      documents: [
        'Scanned bio page of passport',
        'Digital passport photograph',
        'Invitation letter from organizer',
        'Political clearance from Ministry of External Affairs (MEA)'
      ],
      recommendedFor: 'Academic workshops, government seminars, bilateral meets.'
    },
    {
      id: 'student',
      title: 'e-Student Visa (Short Term)',
      description: 'For students enrolling in short-term courses, language studies, or certified internships of less than six months duration.',
      icon: <GraduationCap className="w-8 h-8 text-rose-600" />,
      duration: 'Duration of course (Up to 180 Days)',
      validity: 'Course Specific (Multiple Entries)',
      entries: 'Multiple entries allowed',
      documents: [
        'Scanned bio page of passport',
        'Digital passport photograph',
        'Proof of admission from recognized Indian Educational Institution'
      ],
      recommendedFor: 'Summer schools, short-term internships, exchange programs.'
    },
    {
      id: 'research',
      title: 'e-Research Visa (Short Term)',
      description: 'For academic researchers and specialists conducting short field projects or presenting academic research at Indian universities.',
      icon: <SearchCode className="w-8 h-8 text-cyan-600" />,
      duration: 'Up to 90 Days',
      validity: '90 Days (Single/Double)',
      entries: 'Single or double entries',
      documents: [
        'Scanned bio page of passport',
        'Digital passport photograph',
        'Research proposal approval letter from Ministry of Education or host college'
      ],
      recommendedFor: 'Field research, academic audits, collaborative research.'
    },
    {
      id: 'family',
      title: 'e-Family Visit Visa',
      description: 'Specifically tailored for people of Indian origin (PIO) or spouses/dependents of Indian citizens visiting family members residing in India.',
      icon: <Home className="w-8 h-8 text-teal-600" />,
      duration: 'Up to 90 Days',
      validity: '1 Year (Multiple Entries)',
      entries: 'Multiple entries allowed',
      documents: [
        'Scanned bio page of passport',
        'Digital passport photograph',
        'Proof of relationship (OIC/PIO card, marriage certificate, birth certificate)'
      ],
      recommendedFor: 'Family unions, ancestral tourism, community events.'
    }
  ];

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 border border-blue-100 rounded px-2.5 py-1">Visa Categories</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            Available e-Visa Categories
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
            Select the visa type that matches the purpose of your trip. Online e-Visas eliminate physical office visits, mailing passports, or waiting in long consulate lines.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visaCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white border border-slate-200 rounded-gov shadow-gov-sm overflow-hidden flex flex-col hover:shadow-gov-md transition-shadow duration-200"
            >
              {/* Header Box */}
              <div className="p-6 md:p-8 flex items-start space-x-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center shrink-0">
                  {category.icon}
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-slate-900 leading-snug">{category.title}</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Recommended for: {category.recommendedFor}</p>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">{category.description}</p>
                </div>
              </div>

              {/* Specifications Block */}
              <div className="bg-slate-50/50 p-6 md:px-8 py-5 grid grid-cols-2 gap-4 border-b border-slate-100 text-left">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stay Duration</span>
                    <span className="text-sm font-semibold text-slate-700">{category.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Entries Allowed</span>
                    <span className="text-sm font-semibold text-slate-700">{category.validity}</span>
                  </div>
                </div>
              </div>

              {/* Required Documents checklist */}
              <div className="p-6 md:p-8 text-left flex-grow">
                <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-primary" /> Key Documents Required
                </h3>
                <ul className="space-y-2">
                  {category.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-600 font-medium">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="p-6 md:px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" /> Fees vary by nationality
                </span>
                
                <Link
                  to={`/apply?type=${category.id}`}
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                >
                  Apply Online
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
