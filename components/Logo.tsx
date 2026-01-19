
import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

/**
 * Logo Pulini Advocacia
 * 
 * ALINHAMENTO ÓPTICO (Explicação Técnica):
 * No SVG, o 'letter-spacing' é aplicado APÓS cada caractere, incluindo o último.
 * Isso causa um deslocamento lateral que faz o texto parecer "torto" mesmo com text-anchor="middle".
 * 
 * A solução aplicada usa dx para compensar exatamente metade do valor do letter-spacing:
 * 1. Para 'PULINI' (tracking negativo): deslocamos para a esquerda (dx negativo).
 * 2. Para 'ADVOCACIA' (tracking positivo): deslocamos para a direita (dx positivo).
 */
const Logo: React.FC<LogoProps> = ({ className = "h-8", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 400 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ overflow: 'visible' }}
      aria-label="Logo Pulini Advocacia"
      role="img"
    >
      <title>Pulini Advocacia</title>
      <g>
        {/* 
          PULINI
          Font: Space Grotesk (Bold 800)
          Letter-spacing: -0.05em
          Compensação (dx): -0.025em (metade do tracking para centralizar o corpo)
        */}
        <text 
          x="50%" 
          y="70" 
          textAnchor="middle" 
          dx="-0.025em"
          fill={color} 
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontWeight: 800, 
            fontSize: '92px',
            letterSpacing: '-0.05em',
            textRendering: 'geometricPrecision'
          }}
        >
          PULINI
        </text>
        
        {/* 
          ADVOCACIA
          Font: Inter (Regular 400)
          Letter-spacing: 0.48em (elegância e respiro)
          Compensação (dx): 0.24em (metade do tracking para anular o vazio à direita do último 'A')
        */}
        <text 
          x="50%" 
          y="112" 
          textAnchor="middle" 
          dx="0.24em"
          fill={color} 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 400, 
            fontSize: '26px',
            letterSpacing: '0.48em', 
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
