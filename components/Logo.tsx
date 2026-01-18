
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
      style={{ overflow: 'visible' }}
    >
      <g>
        {/* 
          PULINI 
          - x="148": Compensação de -2px para o letter-spacing negativo (-0.05em)
          - FontWeight 800: Para máxima autoridade visual
        */}
        <text 
          x="148" 
          y="62" 
          textAnchor="middle" 
          fill={color} 
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontWeight: 800, 
            fontSize: '78px',
            letterSpacing: '-0.05em',
            textRendering: 'geometricPrecision'
          }}
        >
          PULINI
        </text>
        
        {/* 
          ADVOCACIA 
          - x="157": Compensação matemática de +7px. 
            Como o letter-spacing é 0.6em (aprox 14px), o último caractere 
            "empurra" o bloco 14px para a esquerda. Deslocamos metade (7px) 
            para a direita para centralizar o peso visual.
        */}
        <text 
          x="157" 
          y="102" 
          textAnchor="middle" 
          fill={color} 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 300, 
            fontSize: '24px',
            letterSpacing: '0.6em', 
            textRendering: 'geometricPrecision',
            textTransform: 'uppercase'
          }}
        >
          ADVOCACIA
        </text>
      </g>
    </svg>
  );
};

export default Logo;
