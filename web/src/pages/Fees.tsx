import React, { useState } from 'react';
import { 
  Calculator, 
  AlertCircle, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CountryFee {
  code: string;
  name: string;
  touristFee: number;
  businessFee: number;
  medicalFee: number;
  otherFee: number;
}

export const Fees: React.FC = () => {
  // Sample realistic country government fees (USD)
  const countries: CountryFee[] = [
    { code: 'US', name: 'United States of America', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'GB', name: 'United Kingdom', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'CA', name: 'Canada', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'AU', name: 'Australia', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'DE', name: 'Germany', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'FR', name: 'France', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'JP', name: 'Japan', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'SG', name: 'Singapore', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'ZA', name: 'South Africa', touristFee: 0, businessFee: 0, medicalFee: 0, otherFee: 0 }, // Free visa countries
    { code: 'RU', name: 'Russian Federation', touristFee: 40, businessFee: 100, medicalFee: 100, otherFee: 100 },
    { code: 'BR', name: 'Brazil', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
    { code: 'IT', name: 'Italy', touristFee: 25, businessFee: 80, medicalFee: 80, otherFee: 80 },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [selectedCategory, setSelectedCategory] = useState<string>('tourist');
  const [processingSpeed, setProcessingSpeed] = useState<'standard' | 'express'>('standard');

  const activeCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  // Calculate fees
  let baseGovFee = 25;
  if (selectedCategory === 'tourist') baseGovFee = activeCountry.touristFee;
  else if (selectedCategory === 'business') baseGovFee = activeCountry.businessFee;
  else if (selectedCategory === 'medical') baseGovFee = activeCountry.medicalFee;
  else baseGovFee = activeCountry.otherFee;

  const basePortalFee = 15; // standard official processing portal fee
  const speedFee = processingSpeed === 'express' ? 35 : 0;
  
  const totalUSD = baseGovFee + basePortalFee + speedFee;
  const usdToInrRate = 83.5;
  const totalINR = Math.round(totalUSD * usdToInrRate);

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 border border-blue-100 rounded px-2.5 py-1">Fee Structures</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            Visa Fee Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium">
            Calculate the official Government of India visa application fees. Fees are based on your country of nationality, visa type, and processing tier.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calculator Inputs - Left Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-gov p-6 md:p-8 shadow-gov-sm text-left">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" /> Application Details
            </h2>

            <div className="space-y-6">
              {/* Country Selection */}
              <div>
                <label htmlFor="country-select" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                  Country of Citizenship
                </label>
                <select
                  id="country-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                  Your nationality as displayed in your passport. Dual citizens must choose the passport they intend to travel on.
                </p>
              </div>

              {/* Visa Category */}
              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                  Visa Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'tourist', label: 'e-Tourist Visa' },
                    { id: 'business', label: 'e-Business Visa' },
                    { id: 'medical', label: 'e-Medical Visa' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-3 rounded-lg border text-sm font-semibold transition-all text-center ${
                        selectedCategory === cat.id
                          ? 'border-primary bg-blue-50/50 text-primary ring-1 ring-primary'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Processing Speed Selection */}
              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                  Processing Speed Tier
                </label>
                <div className="space-y-3">
                  {/* Standard processing */}
                  <label className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                    processingSpeed === 'standard'
                      ? 'border-primary bg-blue-50/50 text-slate-900 ring-1 ring-primary'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="processingSpeed" 
                      value="standard"
                      checked={processingSpeed === 'standard'}
                      onChange={() => setProcessingSpeed('standard')}
                      className="mt-1 mr-3 text-primary focus:ring-primary"
                    />
                    <div className="text-left">
                      <span className="block text-sm font-bold text-slate-800">Standard Processing (72 Hours)</span>
                      <span className="block text-xs text-slate-500 mt-0.5 leading-normal">
                        Application reviewed and processed by officers under the standard queue. Recommended for all travelers.
                      </span>
                    </div>
                  </label>

                  {/* Express processing */}
                  <label className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                    processingSpeed === 'express'
                      ? 'border-primary bg-blue-50/50 text-slate-900 ring-1 ring-primary'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="processingSpeed" 
                      value="express"
                      checked={processingSpeed === 'express'}
                      onChange={() => setProcessingSpeed('express')}
                      className="mt-1 mr-3 text-primary focus:ring-primary"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">Express Processing (24 Hours)</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> FAST TRACK
                        </span>
                      </div>
                      <span className="block text-xs text-slate-500 mt-0.5 leading-normal">
                        Expedited review in emergency circumstances. Subject to supplementary fast-track agency processing surcharge (+$35.00).
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Output / Pricing Card - Right Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-gov shadow-gov-sm overflow-hidden text-left sticky top-24">
            {/* Header */}
            <div className="bg-[#1F2937] text-white p-6 md:p-8">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing Overview</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">${totalUSD.toFixed(2)}</span>
                <span className="text-sm text-slate-300 font-medium">~ ₹{totalINR.toLocaleString()} INR</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Calculated at current bank conversion index</p>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Government Visa Fee ({activeCountry.code})</span>
                <span className="text-slate-800 font-bold">${baseGovFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Official Portal Processing Fee</span>
                <span className="text-slate-800 font-bold">${basePortalFee.toFixed(2)}</span>
              </div>

              {speedFee > 0 && (
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Express Processing Surcharge</span>
                  <span className="text-slate-800 font-bold">${speedFee.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-slate-100 my-2" />

              <div className="flex justify-between items-center text-base font-extrabold text-slate-900">
                <span>Total Amount Due</span>
                <span>${totalUSD.toFixed(2)}</span>
              </div>

              {/* Advisory note */}
              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-normal font-medium">
                  <strong>Non-Refundable Policy:</strong> Government visa fee and portal fees are non-refundable once submitted, irrespective of visa grant status. Please verify application details carefully before completing payments.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to={`/apply?type=${selectedCategory}`}
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 bg-[#FF9933] hover:bg-accent-hover text-white text-base font-bold rounded-lg shadow-sm transition-all duration-150"
                >
                  Proceed with Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
};
