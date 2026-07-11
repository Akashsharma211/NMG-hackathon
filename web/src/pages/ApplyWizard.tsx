import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Map, 
  Image, 
  ClipboardCheck, 
  CreditCard, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  AlertCircle,
  FileCheck2,
  Trash2,
  Lock,
  Save,
  Loader2
} from 'lucide-react';

interface WizardState {
  // Step 1: Personal
  givenName: string;
  surname: string;
  gender: string;
  dob: string;
  birthCountry: string;
  nationality: string;
  
  // Step 2: Passport
  passportNumber: string;
  passportIssuePlace: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportFile: File | null;
  passportFileName: string;

  // Step 3: Travel
  arrivalDate: string;
  portOfEntry: string;
  addressInIndia: string;
  contactInIndia: string;

  // Step 4: Documents
  photoFile: File | null;
  photoFileName: string;
  
  // Step 5: Review
  declaration: boolean;
}

export const ApplyWizard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isResume = searchParams.get('resume') === 'true';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [saveTime, setSaveTime] = useState<string>('');
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form State
  const [formData, setFormData] = useState<WizardState>({
    givenName: '',
    surname: '',
    gender: '',
    dob: '',
    birthCountry: 'United States',
    nationality: 'United States',
    passportNumber: '',
    passportIssuePlace: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportFile: null,
    passportFileName: '',
    arrivalDate: '',
    portOfEntry: 'Delhi Airport (DEL)',
    addressInIndia: '',
    contactInIndia: '',
    photoFile: null,
    photoFileName: '',
    declaration: false,
  });

  // Payment Form State
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Generated Application ID
  const [generatedId, setGeneratedId] = useState<string>('');

  // Autosave simulation effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSaveTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Pre-fill if resuming application
  useEffect(() => {
    if (isResume) {
      setFormData(prev => ({
        ...prev,
        givenName: 'Marcus',
        surname: 'Aurelius',
        gender: 'Male',
        dob: '1985-04-26',
        passportNumber: 'A9283741',
        passportIssuePlace: 'Rome',
        passportIssueDate: '2020-01-10',
        passportExpiryDate: '2030-01-10',
        passportFileName: 'passport_scan.pdf',
        arrivalDate: '2026-08-15',
        portOfEntry: 'Mumbai Airport (BOM)',
        addressInIndia: 'Taj Mahal Palace, Colaba, Mumbai 400001',
        contactInIndia: '+91 22 6665 3366',
        photoFileName: 'profile_pic.jpg',
      }));
      setCurrentStep(3); // Jump to Travel step
    }
  }, [isResume]);

  const stepsList = [
    { num: 1, name: 'Personal Details', icon: <User className="w-4 h-4" /> },
    { num: 2, name: 'Passport info', icon: <FileText className="w-4 h-4" /> },
    { num: 3, name: 'Travel details', icon: <Map className="w-4 h-4" /> },
    { num: 4, name: 'Upload Photo', icon: <Image className="w-4 h-4" /> },
    { num: 5, name: 'Review Form', icon: <ClipboardCheck className="w-4 h-4" /> },
    { num: 6, name: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
    { num: 7, name: 'Confirmation', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'passportFile' | 'photoFile') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const nameField = field === 'passportFile' ? 'passportFileName' : 'photoFileName';
      setFormData(prev => ({
        ...prev,
        [field]: file,
        [nameField]: file.name
      }));
    }
  };

  const removeUploadedFile = (field: 'passportFile' | 'photoFile') => {
    const nameField = field === 'passportFile' ? 'passportFileName' : 'photoFileName';
    setFormData(prev => ({
      ...prev,
      [field]: null,
      [nameField]: ''
    }));
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!formData.givenName) errs.givenName = 'Given Name is required';
      if (!formData.surname) errs.surname = 'Surname is required';
      if (!formData.gender) errs.gender = 'Gender selection is required';
      if (!formData.dob) errs.dob = 'Date of birth is required';
    } else if (step === 2) {
      if (!formData.passportNumber) errs.passportNumber = 'Passport number is required';
      if (!formData.passportIssuePlace) errs.passportIssuePlace = 'Place of issue is required';
      if (!formData.passportIssueDate) errs.passportIssueDate = 'Issue date is required';
      if (!formData.passportExpiryDate) errs.passportExpiryDate = 'Expiry date is required';
      if (!formData.passportFileName) errs.passportFileName = 'Scanned copy of passport is required';
    } else if (step === 3) {
      if (!formData.arrivalDate) errs.arrivalDate = 'Expected arrival date is required';
      if (!formData.addressInIndia) errs.addressInIndia = 'Accommodation address in India is required';
      if (!formData.contactInIndia) errs.contactInIndia = 'Contact phone number is required';
    } else if (step === 4) {
      if (!formData.photoFileName) errs.photoFileName = 'Passport size photo upload is required';
    } else if (step === 5) {
      if (!formData.declaration) errs.declaration = 'Declaration check is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
      alert('Please fill out all payment details.');
      return;
    }

    setIsSubmittingPayment(true);

    // Simulate Stripe Gateway Authorization Check
    setTimeout(() => {
      // Generate a dynamic e-Visa Application ID
      const digits = Math.floor(1000 + Math.random() * 9000);
      const hex = Math.random().toString(36).substring(2, 6).toUpperCase();
      const newId = `IND-EVISA-2026-${hex}${digits}`;
      setGeneratedId(newId);

      // Save application details in localstorage to support immediate retrieval in /track
      const savedAppsStr = localStorage.getItem('evisa_applications');
      const apps = savedAppsStr ? JSON.parse(savedAppsStr) : [];
      apps.push({
        id: newId,
        passportNumber: formData.passportNumber || 'A9283741',
        fullName: `${formData.givenName} ${formData.surname}`,
        visaType: 'e-Tourist Visa',
        status: 'submitted',
        submitDate: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem('evisa_applications', JSON.stringify(apps));

      setIsSubmittingPayment(false);
      setCurrentStep(7); // Go to Confirmation
    }, 2500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Step 1: Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="givenName" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Given Name(s) (as in Passport)</label>
                <input
                  type="text"
                  id="givenName"
                  name="givenName"
                  value={formData.givenName}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.givenName ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                  placeholder="First and middle names"
                />
                {errors.givenName && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.givenName}</span>}
              </div>

              <div>
                <label htmlFor="surname" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Surname / Last Name</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.surname ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                  placeholder="Family name"
                />
                {errors.surname && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.surname}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.gender ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender / Other</option>
                </select>
                {errors.gender && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.gender}</span>}
              </div>

              <div>
                <label htmlFor="dob" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.dob ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                />
                {errors.dob && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.dob}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="birthCountry" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Country of Birth</label>
                <input
                  type="text"
                  id="birthCountry"
                  name="birthCountry"
                  value={formData.birthCountry}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="nationality" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Current Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Step 2: Passport Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="passportNumber" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Passport Number</label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. L8374921"
                  className={`w-full bg-slate-50 border ${errors.passportNumber ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                />
                {errors.passportNumber && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.passportNumber}</span>}
              </div>

              <div>
                <label htmlFor="passportIssuePlace" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Place of Issue</label>
                <input
                  type="text"
                  id="passportIssuePlace"
                  name="passportIssuePlace"
                  value={formData.passportIssuePlace}
                  onChange={handleInputChange}
                  placeholder="Issuing authority or city"
                  className={`w-full bg-slate-50 border ${errors.passportIssuePlace ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                />
                {errors.passportIssuePlace && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.passportIssuePlace}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="passportIssueDate" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Date of Issue</label>
                <input
                  type="date"
                  id="passportIssueDate"
                  name="passportIssueDate"
                  value={formData.passportIssueDate}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.passportIssueDate ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                />
                {errors.passportIssueDate && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.passportIssueDate}</span>}
              </div>

              <div>
                <label htmlFor="passportExpiryDate" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Date of Expiry</label>
                <input
                  type="date"
                  id="passportExpiryDate"
                  name="passportExpiryDate"
                  value={formData.passportExpiryDate}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.passportExpiryDate ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                />
                {errors.passportExpiryDate && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.passportExpiryDate}</span>}
              </div>
            </div>

            {/* Passport Upload Area */}
            <div>
              <label className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Upload Scanned Passport (Bio Page)</label>
              
              {formData.passportFileName ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded border border-blue-200 text-primary">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-bold text-slate-800">{formData.passportFileName}</span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">PDF Scan Document • Ready</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeUploadedFile('passportFile')}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 hover:border-primary bg-slate-50/50 transition-colors text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,image/jpeg,image/png"
                    onChange={(e) => handleFileChange(e, 'passportFile')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-700">Drag and drop passport scan copy</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Supports PDF, JPG, PNG up to 3MB</p>
                </div>
              )}
              {errors.passportFileName && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.passportFileName}</span>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Step 3: Travel Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="arrivalDate" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Expected Date of Arrival</label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.arrivalDate ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
                />
                {errors.arrivalDate && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.arrivalDate}</span>}
              </div>

              <div>
                <label htmlFor="portOfEntry" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Designated Port of Entry</label>
                <select
                  id="portOfEntry"
                  name="portOfEntry"
                  value={formData.portOfEntry}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                >
                  <option>Delhi Airport (DEL)</option>
                  <option>Mumbai Airport (BOM)</option>
                  <option>Bengaluru Airport (BLR)</option>
                  <option>Chennai Airport (MAA)</option>
                  <option>Kolkata Airport (CCU)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="addressInIndia" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Primary Accommodation Address in India</label>
              <textarea
                id="addressInIndia"
                name="addressInIndia"
                value={formData.addressInIndia}
                onChange={handleInputChange}
                rows={3}
                placeholder="Full address of hotel, host household, or organization details"
                className={`w-full bg-slate-50 border ${errors.addressInIndia ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
              ></textarea>
              {errors.addressInIndia && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.addressInIndia}</span>}
            </div>

            <div>
              <label htmlFor="contactInIndia" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Contact Number in India</label>
              <input
                type="text"
                id="contactInIndia"
                name="contactInIndia"
                value={formData.contactInIndia}
                onChange={handleInputChange}
                placeholder="Hotel contact or host phone number"
                className={`w-full bg-slate-50 border ${errors.contactInIndia ? 'border-red-500' : 'border-slate-300'} focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none`}
              />
              {errors.contactInIndia && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.contactInIndia}</span>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Step 4: Upload Photograph</h3>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-2.5 text-left text-xs text-blue-700 font-medium">
              <AlertCircle className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <strong>Official Photo Advisory:</strong> Recent color photo, facing front directly, white plain background only. No spectacles, caps, or patterns. Alignment must show head top to chin.
              </div>
            </div>

            {/* Photo Upload Area */}
            <div>
              {formData.photoFileName ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded border border-blue-200 text-primary">
                      <Image className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-bold text-slate-800">{formData.photoFileName}</span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">JPEG Image • Ready</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeUploadedFile('photoFile')}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 hover:border-primary bg-slate-50/50 transition-colors text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange(e, 'photoFile')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-700">Drag and drop passport photograph</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Supports JPG, PNG up to 1MB</p>
                </div>
              )}
              {errors.photoFileName && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.photoFileName}</span>}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-5 text-left animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Step 5: Review Application</h3>
            
            <div className="space-y-4">
              {/* Personal Block */}
              <div className="border border-slate-200 rounded-lg p-4 relative bg-slate-50/30">
                <button onClick={() => setCurrentStep(1)} className="absolute right-4 top-4 text-xs font-bold text-primary hover:underline">Edit</button>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">Personal Particulars</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                  <div><span className="text-slate-400 text-xs">Given Name:</span> <span className="text-slate-700 block">{formData.givenName}</span></div>
                  <div><span className="text-slate-400 text-xs">Surname:</span> <span className="text-slate-700 block">{formData.surname}</span></div>
                  <div><span className="text-slate-400 text-xs">Gender:</span> <span className="text-slate-700 block">{formData.gender}</span></div>
                  <div><span className="text-slate-400 text-xs">Date of Birth:</span> <span className="text-slate-700 block">{formData.dob}</span></div>
                </div>
              </div>

              {/* Passport Block */}
              <div className="border border-slate-200 rounded-lg p-4 relative bg-slate-50/30">
                <button onClick={() => setCurrentStep(2)} className="absolute right-4 top-4 text-xs font-bold text-primary hover:underline">Edit</button>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">Passport Details</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                  <div><span className="text-slate-400 text-xs">Passport Number:</span> <span className="text-slate-700 block">{formData.passportNumber}</span></div>
                  <div><span className="text-slate-400 text-xs">Place of Issue:</span> <span className="text-slate-700 block">{formData.passportIssuePlace}</span></div>
                  <div><span className="text-slate-400 text-xs">Issue Date:</span> <span className="text-slate-700 block">{formData.passportIssueDate}</span></div>
                  <div><span className="text-slate-400 text-xs">Expiry Date:</span> <span className="text-slate-700 block">{formData.passportExpiryDate}</span></div>
                  <div className="col-span-2"><span className="text-slate-400 text-xs">Scan Copy:</span> <span className="text-slate-700 block">{formData.passportFileName}</span></div>
                </div>
              </div>

              {/* Travel Block */}
              <div className="border border-slate-200 rounded-lg p-4 relative bg-slate-50/30">
                <button onClick={() => setCurrentStep(3)} className="absolute right-4 top-4 text-xs font-bold text-primary hover:underline">Edit</button>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">Travel & Accommodation</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                  <div><span className="text-slate-400 text-xs">Expected Arrival:</span> <span className="text-slate-700 block">{formData.arrivalDate}</span></div>
                  <div><span className="text-slate-400 text-xs">Port of Entry:</span> <span className="text-slate-700 block">{formData.portOfEntry}</span></div>
                  <div className="col-span-2"><span className="text-slate-400 text-xs">Address in India:</span> <span className="text-slate-700 block">{formData.addressInIndia}</span></div>
                  <div className="col-span-2"><span className="text-slate-400 text-xs">Contact in India:</span> <span className="text-slate-700 block">{formData.contactInIndia}</span></div>
                </div>
              </div>

              {/* Photos Block */}
              <div className="border border-slate-200 rounded-lg p-4 relative bg-slate-50/30">
                <button onClick={() => setCurrentStep(4)} className="absolute right-4 top-4 text-xs font-bold text-primary hover:underline">Edit</button>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">Uploaded Photo</h4>
                <span className="text-sm font-medium text-slate-700 block">{formData.photoFileName}</span>
              </div>

              {/* Declaration Checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, declaration: e.target.checked }));
                    if (errors.declaration) setErrors({});
                  }}
                  className="mt-1 focus:ring-primary text-primary"
                />
                <span className="text-xs text-slate-600 font-medium leading-relaxed">
                  I hereby declare that all details entered in this electronic visa application are complete, true, and match the information printed in my passport. I understand that misrepresentation of travel intentions will lead to immediate cancellation of travel authorizations.
                </span>
              </label>
              {errors.declaration && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.declaration}</span>}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Step 6: Government Fee Payment</h3>
            
            {isSubmittingPayment ? (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                <h4 className="text-base font-bold text-slate-800">Processing Visa Payment Transaction...</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-semibold">
                  Validating payment authorization tokens with gateway. Secure database is assigning a new application tracking signature. Do not refresh or exit.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Payment Form Details */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-extrabold uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5 text-slate-400" /> SECURE STRIPE GATEWAY
                  </div>

                  <div>
                    <label htmlFor="card-name" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      id="card-name"
                      required
                      value={cardData.name}
                      onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="card-number" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      required
                      value={cardData.number}
                      onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">Expiry Date</label>
                      <input
                        type="text"
                        id="card-expiry"
                        required
                        value={cardData.expiry}
                        onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                        placeholder="MM / YY"
                        className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="card-cvv" className="block text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2">CVV / CVC</label>
                      <input
                        type="password"
                        id="card-cvv"
                        required
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                        placeholder="•••"
                        className="w-full bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-slate-800 font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Amount details breakdown - Right */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider border-b border-slate-200 pb-2">Fee Summary</h4>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                      <span>e-Tourist Visa Government Fee</span>
                      <span>$25.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                      <span>Official Portal Surcharge</span>
                      <span>$15.00</span>
                    </div>
                    <hr className="border-slate-200" />
                    <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                      <span>Total Amount Due</span>
                      <span>$40.00</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-colors text-center"
                  >
                    Pay & Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      case 7:
        return (
          <div className="py-10 text-center space-y-6 animate-in scale-in duration-200">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto shadow-gov-sm">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">Application Submitted Successfully</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto font-medium">
                Thank you. Your visa application has been registered into the Bureau of Immigration registry for review.
              </p>
            </div>

            {/* Generated ID Info box */}
            <div className="bg-slate-50 border border-slate-200 rounded-gov p-6 max-w-md mx-auto text-left space-y-4 shadow-gov-sm">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Application Tracking ID</span>
                <span className="text-xl font-extrabold text-slate-800">{generatedId || 'IND-EVISA-2026-X8F9'}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Applicant Name</span>
                  <span>{formData.givenName} {formData.surname}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Passport Number</span>
                  <span>{formData.passportNumber}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-normal">
              A copy of your submission tracking receipt and updates has been dispatched to <strong>{formData.givenName.toLowerCase()}@example.com</strong>.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => navigate(`/track?appId=${generatedId}`)}
                className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
              >
                Track Status Now
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-slate-200 text-slate-700 hover:text-slate-900 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step tracker horizontal stepper */}
        <div className="mb-8 overflow-x-auto pb-2" aria-label="Application Progress Tracker">
          <div className="flex items-center space-x-1.5 min-w-[700px] border-b border-slate-200 pb-3">
            {stepsList.map((step) => {
              const isCurrent = step.num === currentStep;
              const isCompleted = step.num < currentStep;
              return (
                <div 
                  key={step.num}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    isCurrent 
                      ? 'bg-primary text-white shadow-sm' 
                      : isCompleted 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'text-slate-400 bg-white border border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : step.icon}
                  <span>{step.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Form container card */}
        <div className="bg-white border border-slate-200 rounded-gov shadow-gov-sm overflow-hidden">
          {/* Header section with Autosave indicator */}
          <div className="px-6 md:px-8 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">e-Visa Secure Form Wizard</span>
            
            {currentStep < 7 && (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold uppercase">
                <Save className="w-3 h-3 text-green-500 animate-pulse" />
                <span>Auto-saved at {saveTime}</span>
              </div>
            )}
          </div>

          {/* Form Content body */}
          <div className="p-6 md:p-8">
            {renderStepContent()}
          </div>

          {/* Form footer actions */}
          {currentStep < 6 && (
            <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 disabled:opacity-30 text-slate-600 hover:text-slate-800 disabled:hover:bg-transparent bg-white text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                {currentStep === 5 ? 'Confirm & Go to Payment' : 'Continue'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
