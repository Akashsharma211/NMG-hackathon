import React from 'react';

export const Emblem: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 130" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer Glow / Base Shield */}
      <path 
        d="M50 5C70 5 85 15 85 45C85 75 65 95 50 110C35 95 15 75 15 45C15 15 30 5 50 5Z" 
        fill="#0B3D91" 
        fillOpacity="0.05"
      />
      
      {/* Saffron and Navy Accent Outline */}
      <path 
        d="M50 8C67 8 80 17 80 43C80 70 62 88 50 102C38 88 20 70 20 43C20 17 33 8 50 8Z" 
        stroke="#FF9933" 
        strokeWidth="1.5"
      />

      {/* Stylized Lion Capital of Ashoka Shapes */}
      {/* Central Lion */}
      <rect x="44" y="20" width="12" height="24" rx="3" fill="#0B3D91" />
      <circle cx="50" cy="18" r="5" fill="#0B3D91" />
      <path d="M42 28H58V32H42V28Z" fill="#FF9933" />
      
      {/* Left Lion */}
      <rect x="30" y="24" width="10" height="20" rx="3" fill="#0B3D91" />
      <circle cx="35" cy="22" r="4.5" fill="#0B3D91" />
      
      {/* Right Lion */}
      <rect x="60" y="24" width="10" height="20" rx="3" fill="#0B3D91" />
      <circle cx="65" cy="22" r="4.5" fill="#0B3D91" />

      {/* Ashoka Pillar Abacus Base */}
      <rect x="25" y="48" width="50" height="6" rx="2" fill="#0B3D91" />
      
      {/* Ashoka Chakra in Center */}
      <circle cx="50" cy="58" r="6" stroke="#FF9933" strokeWidth="1.5" />
      <circle cx="50" cy="58" r="2" fill="#0B3D91" />
      {/* Chakra Spokes */}
      <line x1="50" y1="52" x2="50" y2="64" stroke="#0B3D91" strokeWidth="0.8" />
      <line x1="44" y1="58" x2="56" y2="58" stroke="#0B3D91" strokeWidth="0.8" />
      <line x1="46" y1="54" x2="54" y2="62" stroke="#0B3D91" strokeWidth="0.5" />
      <line x1="46" y1="62" x2="54" y2="54" stroke="#0B3D91" strokeWidth="0.5" />
      
      {/* Left Guardian animal (Stylized Horse outline) */}
      <path d="M33 55C31 55 29 57 29 59V61H35V59C35 57 33 55 33 55Z" fill="#0B3D91" />
      
      {/* Right Guardian animal (Stylized Bull outline) */}
      <path d="M67 55C65 55 63 57 63 59V61H69V59C69 57 67 55 67 55Z" fill="#0B3D91" />

      {/* Bottom Pedestal support */}
      <path d="M35 68H65L60 74H40L35 68Z" fill="#0B3D91" />

      {/* Satyameva Jayate (Stylized Sanskrit lettering mockup) */}
      <rect x="38" y="80" width="24" height="2" rx="0.5" fill="#0B3D91" />
      <path d="M41 84H45V85H41V84Z" fill="#0B3D91" />
      <path d="M48 84H52V85H48V84Z" fill="#0B3D91" />
      <path d="M55 84H59V85H55V84Z" fill="#0B3D91" />
      
      {/* Label "GOVERNMENT OF INDIA" */}
      <text 
        x="50" 
        y="98" 
        textAnchor="middle" 
        fill="#1F2937" 
        fontSize="6.5" 
        fontWeight="800"
        letterSpacing="0.4"
      >
        GOVT. OF INDIA
      </text>
    </svg>
  );
};
