import React from 'react';

interface PatluLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const PatluLogo: React.FC<PatluLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  showTagline = false,
}) => {
  // Height presets
  const heightClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24 md:h-28',
  };

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClasses[size]} w-auto aspect-square ${className}`}
        aria-label="PATLU ONLINE SERVICE Icon"
      >
        <defs>
          <linearGradient id="pBlueGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#0044CC" />
          </linearGradient>
          <linearGradient id="pOrangeGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>
        </defs>

        {/* Outer Orange Swoosh Crescent */}
        <path
          d="M10 65 C 5 35, 30 12, 70 12 C 85 12, 94 18, 92 23 C 90 27, 78 22, 65 22 C 32 22, 18 42, 22 68 C 24 78, 30 84, 25 86 C 18 88, 12 78, 10 65 Z"
          fill="url(#pOrangeGradIcon)"
        />

        {/* Main P Letterform */}
        <path
          d="M26 15 H 68 C 84 15, 92 25, 92 40 C 92 55, 84 65, 68 65 H 44 V 88 H 26 V 15 Z"
          fill="url(#pBlueGradIcon)"
        />

        {/* Inner Bowl Cutout */}
        <path
          d="M44 28 H 64 C 72 28, 77 33, 77 40 C 77 47, 72 52, 64 52 H 44 V 28 Z"
          fill="#FFFFFF"
        />

        {/* Globe inside bowl */}
        <circle cx="60" cy="40" r="10" stroke="#0055DD" strokeWidth="1.8" fill="#EBF3FF" />
        <ellipse cx="60" cy="40" rx="5" ry="10" stroke="#0055DD" strokeWidth="1.4" fill="none" />
        <line x1="50" y1="40" x2="70" y2="40" stroke="#0055DD" strokeWidth="1.4" />
        <line x1="53" y1="34" x2="67" y2="34" stroke="#0055DD" strokeWidth="1.2" />
        <line x1="53" y1="46" x2="67" y2="46" stroke="#0055DD" strokeWidth="1.2" />

        {/* Orange Foot Accent */}
        <rect x="44" y="65" width="18" height="23" fill="url(#pOrangeGradIcon)" rx="2" />
      </svg>
    );
  }

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <svg
        viewBox="0 0 540 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClasses[size]} w-auto max-w-full drop-shadow-xs`}
        aria-label="PATLU ONLINE SERVICE"
      >
        <defs>
          <linearGradient id="pBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0062E0" />
            <stop offset="50%" stopColor="#0055D4" />
            <stop offset="100%" stopColor="#0043B8" />
          </linearGradient>

          <linearGradient id="pOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7E00" />
            <stop offset="100%" stopColor="#FF5000" />
          </linearGradient>

          <linearGradient id="swooshBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0055D4" />
            <stop offset="70%" stopColor="#0077FF" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <linearGradient id="swooshOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5000" />
            <stop offset="50%" stopColor="#FF7E00" />
            <stop offset="100%" stopColor="#FFAA00" />
          </linearGradient>

          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* ----------------------------------------------------
            1. MONOGRAM 'P' (LEFT SECTION)
        ----------------------------------------------------- */}
        <g id="logo-p-symbol">
          {/* Upper orange swoosh arch behind/over P */}
          <path
            d="M58 20 C 105 20, 126 38, 126 50 C 126 60, 114 55, 102 46 C 90 38, 72 32, 54 32 C 40 32, 30 36, 26 40 C 29 28, 42 20, 58 20 Z"
            fill="url(#pOrangeGrad)"
          />

          {/* Lower orange swoosh crescent looping around bottom left */}
          <path
            d="M10 115 C 3 85, 20 52, 48 40 C 36 50, 22 72, 25 100 C 27 122, 42 135, 56 137 C 35 142, 16 135, 10 115 Z"
            fill="url(#pOrangeGrad)"
          />

          {/* Main Blue 'P' Body */}
          <path
            d="M32 24 H 96 C 118 24, 130 38, 130 58 C 130 78, 118 92, 96 92 H 58 V 126 H 32 V 24 Z"
            fill="url(#pBlueGrad)"
          />

          {/* Orange base block on P lower stem */}
          <path
            d="M58 92 H 84 V 144 H 58 Z"
            fill="url(#pOrangeGrad)"
            rx="2"
          />

          {/* White inner cutout of P bowl */}
          <path
            d="M58 40 H 90 C 102 40, 110 46, 110 58 C 110 70, 102 76, 90 76 H 58 V 40 Z"
            fill="#FFFFFF"
          />

          {/* Globe inside the P bowl */}
          <g transform="translate(84, 58)">
            <circle cx="0" cy="0" r="14" fill="#E8F1FF" stroke="#0055D4" strokeWidth="2.2" />
            <ellipse cx="0" cy="0" rx="7" ry="14" fill="none" stroke="#0055D4" strokeWidth="1.8" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0055D4" strokeWidth="1.8" />
            <line x1="-10.5" y1="-7" x2="10.5" y2="-7" stroke="#0055D4" strokeWidth="1.4" />
            <line x1="-10.5" y1="7" x2="10.5" y2="7" stroke="#0055D4" strokeWidth="1.4" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0055D4" strokeWidth="1.8" />
          </g>
        </g>

        {/* ----------------------------------------------------
            2. WORDMARK "PATLU"
        ----------------------------------------------------- */}
        <g id="logo-patlu-text" fill="url(#pBlueGrad)">
          {/* P */}
          <path d="M152 32 H 182 C 196 32, 204 40, 204 52 C 204 64, 196 72, 182 72 H 168 V 90 H 152 V 32 Z M 168 45 V 59 H 180 C 187 59, 190 56, 190 52 C 190 48, 187 45, 180 45 H 168 Z" />

          {/* A with Orange Triangle */}
          <path d="M228 32 L 250 90 H 234 L 229.5 76 H 212.5 L 208 90 H 192 L 214 32 H 228 Z M 221 47 L 216 63 H 226 L 221 47 Z" />
          {/* Orange triangle inside A */}
          <polygon points="221,50 215,65 227,65" fill="url(#pOrangeGrad)" />

          {/* T */}
          <path d="M242 32 H 280 V 46 H 269 V 90 H 253 V 46 H 242 V 32 Z" />

          {/* L */}
          <path d="M284 32 H 300 V 76 H 322 V 90 H 284 V 32 Z" />

          {/* U */}
          <path d="M326 32 H 342 V 70 C 342 77, 347 80, 353 80 C 359 80, 364 77, 364 70 V 32 H 380 V 70 C 380 84, 369 92, 353 92 C 337 92, 326 84, 326 70 V 32 Z" />
        </g>

        {/* ----------------------------------------------------
            3. COMPUTER MONITOR ICON WITH GLOBE & CURSOR (RIGHT)
        ----------------------------------------------------- */}
        <g id="logo-monitor-icon" transform="translate(395, 30)">
          {/* Monitor Screen Frame */}
          <rect
            x="0"
            y="4"
            width="68"
            height="46"
            rx="6"
            fill="none"
            stroke="url(#pBlueGrad)"
            strokeWidth="4"
          />

          {/* Monitor Stand Base */}
          <path
            d="M34 50 V 58 M20 58 H 48"
            stroke="url(#pBlueGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Globe inside monitor */}
          <g transform="translate(24, 26)">
            <circle cx="0" cy="0" r="11" fill="#E8F1FF" stroke="#0062E0" strokeWidth="1.8" />
            <ellipse cx="0" cy="0" rx="5.5" ry="11" fill="none" stroke="#0062E0" strokeWidth="1.4" />
            <line x1="-11" y1="0" x2="11" y2="0" stroke="#0062E0" strokeWidth="1.4" />
            <line x1="-8.5" y1="-5.5" x2="8.5" y2="-5.5" stroke="#0062E0" strokeWidth="1.2" />
            <line x1="-8.5" y1="5.5" x2="8.5" y2="5.5" stroke="#0062E0" strokeWidth="1.2" />
          </g>

          {/* Click Ray Marks */}
          <g stroke="url(#pBlueGrad)" strokeWidth="1.8" strokeLinecap="round">
            <line x1="41" y1="21" x2="45" y2="21" />
            <line x1="40" y1="16" x2="43" y2="14" />
            <line x1="40" y1="26" x2="43" y2="28" />
          </g>

          {/* Mouse Cursor Arrow clicking on screen */}
          <g transform="translate(43, 24)">
            <path
              d="M0 0 L 16 16 L 8 16 L 14 26 L 9 28 L 3 18 L -3 24 Z"
              fill="url(#pBlueGrad)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* ----------------------------------------------------
            4. "ONLINE SERVICE" WORDMARK
        ----------------------------------------------------- */}
        <g id="logo-online-service" fill="#0A0A0A" transform="translate(122, 102)">
          {/* O with center target / dot */}
          <g transform="translate(0, 0)">
            <path
              d="M12 24 C 5.4 24, 0 18.6, 0 12 C 0 5.4, 5.4 0, 12 0 C 18.6 0, 24 5.4, 24 12 C 24 18.6, 18.6 24, 12 24 Z M 12 5 C 8.1 5, 5 8.1, 5 12 C 5 15.9, 8.1 19, 12 19 C 15.9 19, 19 15.9, 19 12 C 19 8.1, 15.9 5, 12 5 Z"
            />
            {/* Center target dot */}
            <circle cx="12" cy="12" r="2.8" fill="#0A0A0A" />
          </g>

          {/* Text: NLINE SERVICE */}
          <text
            x="32"
            y="19"
            fontFamily="'Inter', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="2.5"
            fill="#0A0A0A"
          >
            NLINE SERVICE
          </text>
        </g>

        {/* ----------------------------------------------------
            5. DUAL SPEED SWOOSH UNDERLINES
        ----------------------------------------------------- */}
        {/* Top Blue Swoosh */}
        <path
          d="M95 137 C 180 130, 310 128, 430 131 C 410 133, 280 134, 105 141 Z"
          fill="url(#swooshBlue)"
        />

        {/* Bottom Orange Swoosh */}
        <path
          d="M190 144 C 260 140, 370 139, 445 141 C 430 143, 330 145, 200 148 Z"
          fill="url(#swooshOrange)"
        />
      </svg>

      {showTagline && (
        <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-blue-800 dark:text-blue-400 mt-1 pl-1">
          Online Form Filling &amp; Digital Services
        </span>
      )}
    </div>
  );
};
