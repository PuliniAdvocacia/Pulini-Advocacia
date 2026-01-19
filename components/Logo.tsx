
import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

/**
 * Logo Pulini Advocacia - Versão de Precisão Óptica 2.0 (100% Reto)
 * 
 * AJUSTES DE PRECISÃO:
 * 1. ADVOCACIA: Letter-spacing de 0.6em cria um espaço vazio no final. 
 *    O dx="0.3em" (positivo) move o texto para a direita, centralizando 
 *    apenas os glifos visíveis.
 * 2. PULINI: Ajuste de dx="0.05em" para compensar o peso visual do 'P' 
 *    inicial e a finura do 'I' final, centralizando a "massa" da palavra.
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
      preserveAspectRatio="xMidYMid meet"
    >
      <title>Pulini Advocacia</title>
      <g>
        {/* 
          PULINI - Headline
          Fonte: Space Grotesk 800 (Extra Bold)
          Ajuste dx: Compensa o equilíbrio entre o P e o I final.
        */}
        <text 
          x="200" 
          y="75" 
          textAnchor="middle" 
          dx="0.05em" 
          fill={color} 
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontWeight: 800, 
            fontSize: '90px',
            letterSpacing: '-0.02em',
            textRendering: 'geometricPrecision'
          }}
        >
          PULINI
        </text>
        
        {/* 
          ADVOCACIA - Subtitle
          Letter-spacing: 0.6em
          dx="0.3em": Metade do spacing para anular o rastro à direita.
        */}
        <text 
          x="200" 
          y="118" 
          textAnchor="middle" 
          dx="0.3em"
          fill={color} 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 400, 
            fontSize: '20px',
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
