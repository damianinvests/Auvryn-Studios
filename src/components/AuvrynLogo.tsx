import React from 'react';

interface AuvrynLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AuvrynLogo: React.FC<AuvrynLogoProps> = ({
  className = '',
  size = 28,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Futuristic Metallic Silver "A" Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Auvryn Studios Logo"
      >
        <defs>
          {/* Metallic Silver Gradients */}
          <linearGradient id="silverSheen1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          <linearGradient id="silverSheen2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="silverCrossbar" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <filter id="metallicBevel" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Outer Hexagonal Subtle Guide */}
        <path
          d="M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
          fill="rgba(10, 10, 10, 0.4)"
        />

        {/* Futuristic Stylized "A" - Left Blade */}
        <path
          d="M50 14 L18 80 L32 80 L50 40 L68 80 L82 80 L50 14 Z"
          fill="url(#silverSheen1)"
          filter="url(#metallicBevel)"
        />

        {/* Futuristic Stylized "A" - Internal Facet Core */}
        <path
          d="M50 26 L34 62 L66 62 Z"
          fill="#0a0a0a"
        />

        {/* Futuristic Sharp Floating Crossbar with Silver Core */}
        <polygon
          points="25,58 75,58 70,64 30,64"
          fill="url(#silverCrossbar)"
        />

        {/* Apex Reflection Triangle */}
        <polygon
          points="50,14 44,28 56,28"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-base sm:text-lg font-medium tracking-tight text-white">
              auvryn
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50">
              studios
            </span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40 mt-0.5">
            Orlando · Nationwide
          </span>
        </div>
      )}
    </div>
  );
};
