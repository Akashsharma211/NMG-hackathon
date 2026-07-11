import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Download, 
  FileText, 
  ArrowRight,
  User,
  ShieldAlert,
  Loader2
} from 'lucide-react';

interface MockApplication {
  id: string;
  passportNumber: string;
  fullName: string;
  visaType: string;
  status: 'submitted' | 'verified' | 'processing' | 'approved';
  submitDate: string;
  approvedDate?: string;
}

export const TrackApplication: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlAppId = searchParams.get('appId') || '';

  const [appId, setAppId] = useState(urlAppId);
  const [passportNumber, setPassportNumber] = useState('');
  
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [foundApp, setFoundApp] = useState<MockApplication | null>(null);

  // Pre-seed an approved application in local storage if not present
  useEffect(() => {
    const existing = localStorage.getItem('evisa_applications');
    const defaultApps: MockApplication[] = [
      {
        id: 'IND-EVISA-2026-X8F9',
        passportNumber: 'L8374921',
        fullName: 'Elizabeth Vance',
        visaType: 'e-Tourist Visa',
        status: 'approved',
        submitDate: '2026-07-05',
        approvedDate: '2026-07-08'
      },
      {
        id: 'IND-EVISA-2026-Y4H2',
        passportNumber: 'A9283741',
        fullName: 'Marcus Aurelius',
        visaType: 'e-Business Visa',
        status: 'processing',
        submitDate: '2026-07-09'
      }
    ];

    if (!existing) {
      localStorage.setItem('evisa_applications', JSON.stringify(defaultApps));
    }
  }, []);

  // Handle URL App ID auto-search
  useEffect(() => {
    if (urlAppId) {
      triggerSearch(urlAppId, '');
    }
  }, [urlAppId]);

  const triggerSearch = (searchId: string, searchPassport: string) => {
    setIsLoading(true);
    setSearchSubmitted(false);

    // Simulate official secure search query delay
    setTimeout(() => {
      const stored = localStorage.getItem('evisa_applications');
      const apps: MockApplication[] = stored ? JSON.parse(stored) : [];
      
      // Find matching application. If passport number is provided, check both.
      // If coming from confirmation page, passport is blank, so we check just ID.
      const match = apps.find(app => 
        app.id.trim().toUpperCase() === searchId.trim().toUpperCase() &&
        (searchPassport === '' || app.passportNumber.trim().toUpperCase() === searchPassport.trim().toUpperCase())
      );

      if (match) {
        setFoundApp(match);
      } else {
        // If they just entered anything to try out, give a fallback mock processing application
        if (searchId.length > 5) {
          setFoundApp({
            id: searchId.toUpperCase(),
            passportNumber: searchPassport || 'MOCKED999',
            fullName: 'Applicant Guest',
            visaType: 'e-Tourist Visa',
            status: 'processing',
            submitDate: new Date().toISOString().split('T')[0]
          });
        } else {
          setFoundApp(null);
        }
      }
      setIsLoading(false);
      setSearchSubmitted(true);
    }, 1200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appId) {
      triggerSearch(appId, passportNumber);
    }
  };

  // Mock downloading digital PDF visa
  const handleDownloadVisa = () => {
    if (!foundApp) return;
    
    // Create simple printable window / iframe mock for the visa PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Electronic Travel Authorization (ETA) - India</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1F2937; line-height: 1.5; }
            .header { border-bottom: 3px double #0B3D91; padding-bottom: 20px; text-align: center; }
            .logo { font-size: 24px; font-weight: bold; color: #0B3D91; text-transform: uppercase; letter-spacing: 1px; }
            .title { font-size: 20px; margin-top: 20px; font-weight: bold; text-align: center; color: #1F2937; }
            .eta-box { border: 2px solid #E5E7EB; border-radius: 12px; padding: 24px; margin-top: 30px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
            .label { font-size: 11px; text-transform: uppercase; color: #6B7280; font-weight: bold; }
            .value { font-size: 15px; font-weight: bold; color: #111827; margin-top: 4px; }
            .barcode { background: #111827; color: white; padding: 10px; font-family: monospace; text-align: center; font-size: 18px; margin-top: 30px; letter-spacing: 8px; }
            .stamp { border: 3px solid #16A34A; color: #16A34A; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 22px; text-transform: uppercase; width: fit-content; transform: rotate(-5deg); margin: 30px auto; }
            .footer { border-top: 1px solid #E5E7EB; padding-top: 20px; margin-top: 40px; font-size: 10px; color: #6B7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Government of India</div>
            <div style="font-size: 12px; color: #6B7280; font-weight: bold; margin-top: 4px;">BUREAU OF IMMIGRATION (MINISTRY OF HOME AFFAIRS)</div>
            <div class="title">ELECTRONIC TRAVEL AUTHORIZATION (ETA)</div>
          </div>
          
          <div class="stamp">GRANTED / APPROVED</div>
          
          <div class="eta-box">
            <div style="font-size: 16px; font-weight: bold; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; color: #0B3D91;">ETA Details</div>
            <div class="grid">
              <div>
                <div class="label">ETA Application ID</div>
                <div class="value">${foundApp.id}</div>
              </div>
              <div>
                <div class="label">Passport Number</div>
                <div class="value">${foundApp.passportNumber}</div>
              </div>
              <div>
                <div class="label">Full Name of Applicant</div>
                <div class="value">${foundApp.fullName}</div>
              </div>
              <div>
                <div class="label">Visa Type / Category</div>
                <div class="value">${foundApp.visaType}</div>
              </div>
              <div>
                <div class="label">Issue Date</div>
                <div class="value">${foundApp.submitDate}</div>
              </div>
              <div>
                <div class="label">Validity Term</div>
                <div class="value">365 Days from arrival</div>
              </div>
            </div>
            
            <div class="barcode">||||||| | ||||| | |||| |||| |||| ${foundApp.id}</div>
          </div>
          
          <div class="footer">
            <strong>Advisory:</strong> This e-Visa (ETA) is valid for entry into India only via designated international airports or seaports. The holder must carry a printed copy of this document at the port of boarding and entry.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 border border-blue-100 rounded px-2.5 py-1">Visa Tracker</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 mt-3">
            Track e-Visa Application
          </h1>
          <p className="text-base text-slate-600 mt-2 font-medium">
            Search for your submitted application to view real-time document validation logs, security clearance progress, and download your e-Visa certificate.
          </p>
        </div>

        {/* Tracker Search Box */}
        <div className="bg-white border border-slate-200 rounded-gov p-6 md:p-8 shadow-gov-sm text-left mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="appId-input" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                  Application ID
                </label>
                <input
                  type="text"
                  id="appId-input"
                  required
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="e.g. IND-EVISA-2026-X8F9"
                  className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="passport-input" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">
                  Passport Number (Optional)
                </label>
                <input
                  type="text"
                  id="passport-input"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="e.g. L8374921"
                  className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">
                Tip: Enter <strong>IND-EVISA-2026-X8F9</strong> to test an approved case.
              </span>
              <button
                type="submit"
                disabled={isLoading || !appId}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover disabled:bg-slate-300 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Checking Bureau Registry...
                  </>
                ) : (
                  <>
                    Retrieve Status <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tracker Search Results */}
        {isLoading && (
          <div className="bg-white border border-slate-200 rounded-gov p-12 text-center shadow-gov-sm">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-700">Connecting to secure Government Bureau of Immigration database...</p>
            <p className="text-xs text-slate-400 mt-1">Verifying digital signatures and clearance hashes.</p>
          </div>
        )}

        {!isLoading && searchSubmitted && (
          foundApp ? (
            <div className="bg-white border border-slate-200 rounded-gov shadow-gov-sm overflow-hidden text-left animate-in fade-in duration-200">
              
              {/* Application Header Info */}
              <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Application Dossier</span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{foundApp.id}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {foundApp.fullName}</span>
                    <span>•</span>
                    <span>{foundApp.visaType}</span>
                    <span>•</span>
                    <span>Passport: {foundApp.passportNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Current State:</span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase border ${
                    foundApp.status === 'approved' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {foundApp.status === 'approved' ? 'Approved & Issued' : 'Under Review'}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-6 md:p-8">
                <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-6">Processing Status Timeline</h3>
                
                <div className="relative border-l border-slate-200 pl-6 ml-3 space-y-8">
                  {/* Step 1: Submitted */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-green-600 border-4 border-white ring-1 ring-green-600 flex items-center justify-center"></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        Application Submitted <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">Completed on {foundApp.submitDate}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">
                        Portal verified applicant forms, registered passport codes, and authorized visa fee payment.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Documents Verified */}
                  <div className="relative">
                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-4 border-white ring-1 flex items-center justify-center ${
                      foundApp.status !== 'submitted' ? 'bg-green-600 ring-green-600' : 'bg-slate-200 ring-slate-300'
                    }`}></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        Biometrics & Passport Copy Verified 
                        {foundApp.status !== 'submitted' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {foundApp.status !== 'submitted' ? `Completed on ${foundApp.submitDate}` : 'Pending Verification'}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">
                        Optical character recognition (OCR) validation checked photo alignment and matching passport MRZ hashes.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Security Review / Processing */}
                  <div className="relative">
                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-4 border-white ring-1 flex items-center justify-center ${
                      foundApp.status === 'approved' 
                        ? 'bg-green-600 ring-green-600' 
                        : foundApp.status === 'processing' 
                          ? 'bg-blue-600 ring-blue-500 animate-pulse' 
                          : 'bg-slate-200 ring-slate-300'
                    }`}></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        Bureau Security Clearance
                        {foundApp.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        {foundApp.status === 'processing' && <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 animate-pulse">ACTIVE REVIEW</span>}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {foundApp.status === 'approved' ? `Completed on ${foundApp.approvedDate}` : foundApp.status === 'processing' ? 'Currently Under Review' : 'Awaiting Review Queue'}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">
                        Cross-checking databases against travel advisories, security lookups, and host invitation clearances.
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Approved */}
                  <div className="relative">
                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-4 border-white ring-1 flex items-center justify-center ${
                      foundApp.status === 'approved' ? 'bg-green-600 ring-green-600' : 'bg-slate-200 ring-slate-300'
                    }`}></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        e-Visa (ETA) Granted & Generated
                        {foundApp.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {foundApp.status === 'approved' ? `Completed on ${foundApp.approvedDate}` : 'Pending Grant'}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">
                        Electronic Travel Authorization (ETA) signed, generated, and dispatched to applicant's primary registered email address.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grant Certificate Box */}
                {foundApp.status === 'approved' && (
                  <div className="mt-8 border border-green-200 bg-green-50/50 rounded-lg p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-slate-800">Electronic Travel Authorization (ETA)</h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Size: PDF format (~184 KB)</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleDownloadVisa}
                      className="inline-flex items-center justify-center px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download e-Visa PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-gov p-8 text-center text-slate-500 font-medium shadow-gov-sm">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <ShieldAlert className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">No Application Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal">
                We couldn't retrieve any records for ID <strong>{appId}</strong>. Double check the character spelling. Official e-Visa IDs are alphanumeric.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
};
