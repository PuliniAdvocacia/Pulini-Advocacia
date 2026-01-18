
import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 300 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* PULINI - Bold Sans Serif Style */}
      <text 
        x="50%" 
        y="65" 
        textAnchor="middle" 
        fill={color} 
        style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontWeight: 800, 
          fontSize: '72px',
          letterSpacing: '-0.02em'
        }}
      >
        PULINI
      </text>
      
      {/* ADVOCACIA - Spaced, Medium weight */}
      <text 
        x="50%" 
        y="105" 
        textAnchor="middle" 
        fill={color} 
        style={{ 
          fontFamily: "'Inter', sans-serif", 
          fontWeight: 400, 
          fontSize: '28px',
          letterSpacing: '0.42em'
        }}
      >
        ADVOCACIA
      </text>
    </svg>
  );
};

export default Logo;
