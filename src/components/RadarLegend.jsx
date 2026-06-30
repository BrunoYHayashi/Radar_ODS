// RadarLegend.jsx
import React from 'react'
import { SZ } from '../radarGeometry'
import { ODS_BY_ID } from '../odsData'

const LEG_H     = 52
const LEG_Y_OFF = 12   // distância do radar até a legenda (no espaço extra do viewBox)
const DOT_R     = 13
const FONT_SIZE = 10
const LABEL_W   = 86   // largura reservada para o label de texto

export default function RadarLegend({ selections }) {
  const principals   = Object.entries(selections).filter(([, v]) => v === 'principal').map(([k]) => +k)
  const transversais = Object.entries(selections).filter(([, v]) => v === 'transversal').map(([k]) => +k)

  if (!principals.length && !transversais.length) return null

  // Posicionada no espaço extra abaixo do radar (translate vem do pai)
  const legY = LEG_Y_OFF
  const legX = 18
  const legW = SZ - 36
  const midX = SZ / 2
  const dotY = legY + LEG_H / 2 + 4

  return (
    <g>
      {/* Fundo */}
      <rect
        x={legX} y={legY}
        width={legW} height={LEG_H}
        rx="10"
        fill="#f5f4f3"
        stroke="#ddd"
        strokeWidth="1"
      />

      {/* Label PRINCIPAIS */}
      {principals.length > 0 && (
        <text
          x={legX + 12} y={legY + 16}
          fontSize={FONT_SIZE} fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#666"
        >
          PRINCIPAIS
        </text>
      )}

      {/* Badges principais */}
      {principals.map((n, i) => {
        const cx = legX + 12 + LABEL_W + i * (DOT_R * 2 + 5) + DOT_R
        return (
          <g key={`lp-${n}`}>
            <circle cx={cx} cy={dotY} r={DOT_R} fill={ODS_BY_ID[n].color} />
            <text
              x={cx} y={dotY + 4}
              textAnchor="middle"
              fontSize={FONT_SIZE} fontWeight="700"
              fontFamily="Arial, sans-serif"
              fill="#fff"
            >
              {n}
            </text>
          </g>
        )
      })}

      {/* Label TRANSVERSAIS */}
      {transversais.length > 0 && (
        <text
          x={midX + 8} y={legY + 16}
          fontSize={FONT_SIZE} fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#666"
        >
          TRANSVERSAIS
        </text>
      )}

      {/* Badges transversais */}
      {transversais.map((n, i) => {
        const cx = midX + 8 + LABEL_W + i * (DOT_R * 2 + 5) + DOT_R
        return (
          <g key={`lt-${n}`}>
            <circle cx={cx} cy={dotY} r={DOT_R} fill={ODS_BY_ID[n].color} />
            <text
              x={cx} y={dotY + 4}
              textAnchor="middle"
              fontSize={FONT_SIZE} fontWeight="700"
              fontFamily="Arial, sans-serif"
              fill="#fff"
            >
              {n}
            </text>
          </g>
        )
      })}
    </g>
  )
}
