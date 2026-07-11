import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, HelpCircle, Landmark } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F2937] text-white border-t-4 border-[#FF9933]">
      {/* Upper Footer - Important government notices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-[#FF9933] mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Secure Service</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                This is a secure HTTPS portal. Data transmitted during your application is encrypted and stored safely inside Government of India certified servers.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <HelpCircle className="w-6 h-6 text-blue-400 mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Support Center</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Need help with your application? Call our 24/7 technical helpdesk or search the official knowledge base.
              </p>
              <Link to="/contact" className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline mt-2 block">
                Support Helpline Details
              </Link>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Landmark className="w-6 h-6 text-green-400 mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Embassy Verification</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                e-Visa statuses can be validated directly by airlines and border control authorities via secure official validation mechanisms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Services</span>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
              <li><Link to="/apply" className="hover:text-white transition-colors">New Application</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Check Application Status</Link></li>
              <li><Link to="/fees" className="hover:text-white transition-colors">Visa Fee Calculator</Link></li>
              <li><Link to="/visa-types" className="hover:text-white transition-colors">Eligible Countries & Types</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Important Directories</span>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="https://mha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Ministry of Home Affairs <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://mea.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Ministry of External Affairs <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://tourism.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Ministry of Tourism <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  National Portal of India <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Policies & Terms</span>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund & Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-sm font-extrabold uppercase tracking-wider text-slate-400">National Initiatives</span>
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="border border-slate-700 bg-slate-800 rounded px-2.5 py-1.5 flex items-center justify-center text-[10px] font-bold text-[#FF9933] border-l-4 border-l-[#FF9933]">
                Digital India
              </div>
              <div className="border border-slate-700 bg-slate-800 rounded px-2.5 py-1.5 flex items-center justify-center text-[10px] font-bold text-white border-l-4 border-l-white">
                DigiLocker
              </div>
              <div className="border border-slate-700 bg-slate-800 rounded px-2.5 py-1.5 flex items-center justify-center text-[10px] font-bold text-green-400 border-l-4 border-l-green-400">
                Incredible India
              </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Designed in collaboration with National Informatics Centre (NIC) and Bureau of Immigration (BoI), India.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright and Credits */}
      <div className="bg-[#111827] text-slate-500 py-6 text-xs px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-center md:text-left leading-relaxed">
            <p>© {new Date().getFullYear()} Government of India. Bureau of Immigration. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-600 mt-0.5">Content on this site is published and managed by Bureau of Immigration, Ministry of Home Affairs, India.</p>
          </div>
          <div className="flex space-x-4">
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-mono">v4.2.0-2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
