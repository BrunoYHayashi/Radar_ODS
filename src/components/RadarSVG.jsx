// RadarSVG.jsx
import React from 'react'
import { SZ, CX, CY, R_SEG_OUT } from '../radarGeometry'
import { ODS_LIST } from '../odsData'
import RadarDefs       from './RadarDefs'
import RadarSegment    from './RadarSegment'
import RadarInnerRings from './RadarInnerRings'
import RadarLegend     from './RadarLegend'

const LEG_SPACE = 76  // espaço extra abaixo do radar para a legenda (12 gap + 52 altura + 12 margem)

export default function RadarSVG({ selections, svgRef }) {
  const hasLegend = Object.values(selections).some(v => v === 'principal' || v === 'transversal')

  const svgHeight = hasLegend ? SZ + LEG_SPACE : SZ

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SZ} ${svgHeight}`}
      width={SZ}
      height={svgHeight}
      xmlns="http://www.w3.org/2000/svg"
      id="radarSVG"
    >
      <RadarDefs />

      {/* Anel externo de fundo */}
      <circle
        cx={CX} cy={CY}
        r={R_SEG_OUT + 7}
        fill="#e6e3e1"
        filter="url(#fOuter)"
      />

      {/* Segmentos dos 17 ODS */}
      {ODS_LIST.map(ods => (
        <RadarSegment
          key={ods.id}
          ods={ods}
          state={selections[ods.id] ?? null}
        />
      ))}

      {/* Anéis internos, pontos e círculo central */}
      <RadarInnerRings selections={selections} />

      {/* Legenda abaixo do radar — translate para o espaço extra */}
      {hasLegend && (
        <g transform={`translate(0, ${SZ})`}>
          <RadarLegend selections={selections} />
        </g>
      )}
    </svg>
  )
}
