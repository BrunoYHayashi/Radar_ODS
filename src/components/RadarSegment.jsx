// RadarSegment.jsx
// Ícones como SVG nativo (sem foreignObject) — obrigatório para export PNG via canvas.
import React from 'react'
import {
  annularSectorPath,
  midAngle,
  polar,
  R_SEG_IN,
  R_SEG_OUT,
  SPAN,
  GAP,
} from '../radarGeometry'

// Paths SVG nativos dos ícones (viewBox 0 0 24 24, stroke-based)
const ICON_PATHS = {
  1:  [['path','M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'],['circle','cx=9 cy=7 r=4'],['path','M22 21v-2a4 4 0 0 0-3-3.87'],['path','M16 3.13a4 4 0 0 1 0 7.75']],
  2:  [['path','M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z'],['path','M7 21h10'],['path','M19.5 12 22 6'],['path','M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62'],['path','M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62'],['path','M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62']],
  3:  [['path','M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],['path','M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27']],
  4:  [['path','M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'],['path','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z']],
  5:  [['line','x1=5 x2=19 y1=9 y2=9'],['line','x1=5 x2=19 y1=15 y2=15']],
  6:  [['path','M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z'],['path','M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97']],
  7:  [['circle','cx=12 cy=12 r=4'],['path','M12 2v2'],['path','M12 20v2'],['path','m4.93 4.93 1.41 1.41'],['path','m17.66 17.66 1.41 1.41'],['path','M2 12h2'],['path','M20 12h2'],['path','m6.34 17.66-1.41 1.41'],['path','m19.07 4.93-1.41 1.41']],
  8:  [['polyline','points=22 7 13.5 15.5 8.5 10.5 2 17'],['polyline','points=16 7 22 7 22 13']],
  9:  [['path','M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z'],['path','m7 16.5-4.74-2.85'],['path','m7 16.5 5-3'],['path','M7 16.5v5.17'],['path','M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z'],['path','m17 16.5-5-3'],['path','m17 16.5 4.74-2.85'],['path','M17 16.5v5.17'],['path','M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z'],['path','M12 8 7.26 5.15'],['path','m12 8 4.74-2.85'],['path','M12 13.5V8']],
  10: [['circle','cx=12 cy=12 r=10'],['path','M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8'],['path','M12 18V6']],
  11: [['path','M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z'],['path','M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2'],['path','M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2'],['path','M10 6h4'],['path','M10 10h4'],['path','M10 14h4'],['path','M10 18h4']],
  12: [['path','M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z']],
  13: [['path','M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'],['circle','cx=12 cy=12 r=3']],
  14: [['path','M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z'],['path','M18 12v.5'],['path','M16 17.93a9.77 9.77 0 0 1 0-11.86'],['path','M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33'],['path','M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4'],['path','m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98']],
  15: [['path','M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z'],['path','M7 16v6'],['path','M13 19v3'],['path','M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5']],
  16: [['path','M16 7h.01'],['path','M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20'],['path','m20 7 2 .5-2 .5'],['path','M10 18v3'],['path','M14 17.75V21'],['path','M7 18a6 6 0 0 0 3.84-10.61']],
  17: [['rect','x=16 y=16 width=6 height=6 rx=1'],['rect','x=2 y=16 width=6 height=6 rx=1'],['rect','x=9 y=2 width=6 height=6 rx=1'],['path','M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3'],['path','M12 12V8']],
}

function parseAttrs(str) {
  const obj = {}
  str.trim().split(/\s+/).forEach(pair => {
    const eq = pair.indexOf('=')
    if (eq > 0) obj[pair.slice(0, eq)] = pair.slice(eq + 1)
  })
  return obj
}

function NativeIcon({ id, color, size }) {
  const elements = ICON_PATHS[id]
  if (!elements) return null
  const scale = size / 24
  return (
    <g
      fill="none"
      stroke={color}
      strokeWidth={1.6 / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`scale(${scale})`}
    >
      {elements.map(([tag, attrStr], i) => {
        const attrs = parseAttrs(attrStr)
        if (tag === 'circle')   return <circle   key={i} {...attrs} />
        if (tag === 'line')     return <line     key={i} x1={attrs.x1} y1={attrs.y1} x2={attrs.x2} y2={attrs.y2} />
        if (tag === 'polyline') return <polyline key={i} points={attrs.points} />
        if (tag === 'rect')     return <rect     key={i} {...attrs} />
        return <path key={i} d={attrs.d ?? attrStr} />
      })}
    </g>
  )
}

export default function RadarSegment({ ods, state }) {
  const { id, color } = ods
  const mid   = midAngle(id)
  const start = mid - SPAN / 2 + GAP / 2
  const end   = mid + SPAN / 2 - GAP / 2

  let fill, fillOpacity, stroke, strokeWidth, filter
  if (state === 'principal') {
    fill = color; fillOpacity = 1; stroke = 'none'; strokeWidth = 0; filter = 'url(#fSelected)'
  } else if (state === 'transversal') {
    fill = color; fillOpacity = 0.38; stroke = color; strokeWidth = 2.5; filter = 'url(#fSelected)'
  } else {
    fill = '#f2f0ef'; fillOpacity = 1; stroke = '#e0dedd'; strokeWidth = 1; filter = 'url(#fNormal)'
  }

  const iconColor = state === 'principal' ? '#fff'
                  : state === 'transversal' ? color
                  : '#5a6a7a'

  const numR   = (R_SEG_IN + R_SEG_OUT) / 2 - 22
  const [nx, ny] = polar(numR, mid)

  const iconSize = 26
  const iconR    = (R_SEG_IN + R_SEG_OUT) / 2 + 10
  const [ix, iy] = polar(iconR, mid)

  return (
    <g data-ods={id}>
      <path
        d={annularSectorPath(R_SEG_IN, R_SEG_OUT, start, end)}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        filter={filter}
        style={{ transition: 'fill 0.22s, fill-opacity 0.22s' }}
      />

      <text
        x={nx} y={ny}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        fill={iconColor}
        style={{ transition: 'fill 0.22s', userSelect: 'none' }}
      >
        {id}
      </text>

      {/* Ícone SVG nativo — sem foreignObject, sem contaminação do canvas */}
      <g transform={`translate(${ix - iconSize / 2}, ${iy - iconSize / 2})`}>
        <NativeIcon id={id} color={iconColor} size={iconSize} />
      </g>
    </g>
  )
}
