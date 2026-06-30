// RadarDefs.jsx
// Definições SVG reutilizáveis: gradientes e filtros de sombra.
// Centralizado aqui para não poluir o componente principal.

import React from 'react'

export default function RadarDefs() {
  return (
    <defs>
      {/* Gradiente radial para o círculo central — efeito 3D suave */}
      <radialGradient id="gCenter" cx="38%" cy="32%" r="62%">
        <stop offset="0%"   stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2dfdd" />
      </radialGradient>

      {/* Gradiente para os anéis internos */}
      <radialGradient id="gRing" cx="50%" cy="38%" r="55%">
        <stop offset="0%"   stopColor="#f6f4f3" />
        <stop offset="100%" stopColor="#d8d4d2" />
      </radialGradient>

      {/* Sombra para segmentos selecionados */}
      <filter id="fSelected" x="-18%" y="-18%" width="136%" height="136%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.28)" />
      </filter>

      {/* Sombra leve para segmentos normais (profundidade 3D) */}
      <filter id="fNormal" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.10)" />
      </filter>

      {/* Sombra para o anel externo de fundo */}
      <filter id="fOuter" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.14)" />
      </filter>
    </defs>
  )
}
