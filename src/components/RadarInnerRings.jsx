// RadarInnerRings.jsx
// Anéis internos decorativos, pontos marcadores e círculo central "RADAR ODS".
// Separa a estrutura estática da lógica de seleção.

import React from 'react'
import {
  CX, CY,
  R_CENTER,
  R_INNER_1,
  R_INNER_2,
  R_SEG_IN,
  SPAN, GAP,
  polar,
  midAngle,
} from '../radarGeometry'
import { ODS_BY_ID } from '../odsData'

// Pontos decorativos nos eixos (como na imagem original)
const DOT_ANGLES = Array.from({ length: 9 }, (_, i) => -90 + i * SPAN * 2)

export default function RadarInnerRings({ selections }) {
  const principals   = Object.entries(selections).filter(([, v]) => v === 'principal').map(([k]) => +k)
  const transversais = Object.entries(selections).filter(([, v]) => v === 'transversal').map(([k]) => +k)

  return (
    <g>
      {/* Anel de fundo dos segmentos */}
      <circle cx={CX} cy={CY} r={R_SEG_IN - 4} fill="url(#gRing)" />

      {/* Arcos internos — Principais (sólido, anel mais interno) */}
      {principals.map(n => {
        const mid   = midAngle(n)
        const start = mid - SPAN / 2 + GAP
        const end   = mid + SPAN / 2 - GAP
        const [x1, y1] = polar(R_INNER_1, start)
        const [x2, y2] = polar(R_INNER_1, end)
        return (
          <path
            key={`arc-p-${n}`}
            d={`M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${R_INNER_1} ${R_INNER_1} 0 0 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`}
            fill="none"
            stroke={ODS_BY_ID[n].color}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}

      {/* Arcos internos — Transversais (tracejado, anel médio) */}
      {transversais.map(n => {
        const mid   = midAngle(n)
        const start = mid - SPAN / 2 + GAP
        const end   = mid + SPAN / 2 - GAP
        const [x1, y1] = polar(R_INNER_2, start)
        const [x2, y2] = polar(R_INNER_2, end)
        return (
          <path
            key={`arc-t-${n}`}
            d={`M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${R_INNER_2} ${R_INNER_2} 0 0 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`}
            fill="none"
            stroke={ODS_BY_ID[n].color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="5 4"
          />
        )
      })}

      {/* Pontos marcadores decorativos */}
      {DOT_ANGLES.map((a, i) =>
        [R_INNER_1, R_INNER_2].map((r, j) => {
          const [dx, dy] = polar(r, a)
          return (
            <circle
              key={`dot-${i}-${j}`}
              cx={dx.toFixed(3)} cy={dy.toFixed(3)}
              r="4"
              fill="#c6c2bf"
            />
          )
        })
      )}

      {/* Anel do centro (entre anéis decorativos e círculo central) */}
      <circle cx={CX} cy={CY} r={R_INNER_1 - 20} fill="#e6e3e1" />

      {/* Sombra do círculo central */}
      <circle cx={CX} cy={CY + 5} r={R_CENTER + 2} fill="rgba(0,0,0,0.07)" />

      {/* Círculo central */}
      <circle
        cx={CX} cy={CY}
        r={R_CENTER}
        fill="url(#gCenter)"
        filter="url(#fSelected)"
      />

      {/* Texto RADAR ODS */}
      <text
        x={CX} y={CY - 13}
        textAnchor="middle"
        fontSize="21"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="2"
        fill="#1a2e4a"
      >
        RADAR
      </text>
      <text
        x={CX} y={CY + 15}
        textAnchor="middle"
        fontSize="21"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="2"
        fill="#1a2e4a"
      >
        ODS
      </text>
    </g>
  )
}
