import React from 'react';

export const LichenLogo = ({ className = "w-16 h-16", color = "#10B981" }) => { // #10B981 is Emerald-500
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`animate-pulse-slow ${className}`} // Ajoute une animation de respiration lente
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* --- CERCLE 1: LA RACINE (CIRCUIT) --- */}
      <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="2" strokeOpacity="0.2" strokeDasharray="4 4" className="animate-spin-slow" />
      
      {/* --- CERCLE 2: LA STRUCTURE (GÉOMÉTRIE E8) --- */}
      <path 
        d="M100 20 L170 60 V140 L100 180 L30 140 V60 Z" 
        stroke={color} 
        strokeWidth="1" 
        strokeOpacity="0.5"
      />
      <path 
        d="M100 20 V180 M30 60 L170 140 M170 60 L30 140" 
        stroke={color} 
        strokeWidth="0.5" 
        strokeOpacity="0.3"
      />

      {/* --- CERCLE 3: LE VIVANT (SPORES ORGANIQUES) --- */}
      {/* Noyau Central Pulsant */}
      <circle cx="100" cy="100" r="15" fill={color} fillOpacity="0.8">
        <animate attributeName="r" values="15;18;15" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Spores Satellites (Fractale Phi) */}
      <circle cx="100" cy="50" r="4" fill={color} />
      <circle cx="143" cy="75" r="4" fill={color} />
      <circle cx="143" cy="125" r="4" fill={color} />
      <circle cx="100" cy="150" r="4" fill={color} />
      <circle cx="57" cy="125" r="4" fill={color} />
      <circle cx="57" cy="75" r="4" fill={color} />

      {/* --- SPIRALE FRACTALE (OVERLAY) --- */}
      <path
        d="M100 100 Q 130 100 130 130 Q 130 160 100 160 Q 60 160 60 110 Q 60 50 120 50"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.9"
        fill="none"
        className="path-draw" // Nécessite CSS pour animer le tracé si tu veux
      />
    </svg>
  );
};
