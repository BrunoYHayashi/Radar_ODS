// radarGeometry.js
// Funções matemáticas puras para construção do SVG do radar.

export const SZ        = 580    // viewBox total
export const CX        = SZ / 2
export const CY        = SZ / 2 - 8  // centro ligeiramente acima da base

export const R_CENTER  = 92    // círculo central "RADAR ODS"
export const R_INNER_1 = 118   // anel decorativo interno (arcos principais)
export const R_INNER_2 = 138   // anel decorativo médio (arcos transversais)
export const R_SEG_IN  = 155   // borda interna dos segmentos
export const R_SEG_OUT = 260   // borda externa dos segmentos

export const TOTAL = 17
export const SPAN  = 360 / TOTAL   // ~21.18° por segmento
export const GAP   = 2.4           // graus de gap entre segmentos

export const toRad = deg => deg * Math.PI / 180

// Coordenada cartesiana a partir de raio + ângulo (graus)
export function polar(r, deg) {
  const a = toRad(deg)
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

const f = v => Number(v).toFixed(3)

// Path de setor anelar (annular sector)
export function annularSectorPath(rIn, rOut, startDeg, endDeg) {
  const s1    = polar(rIn,  startDeg)
  const s2    = polar(rOut, startDeg)
  const e1    = polar(rOut, endDeg)
  const e2    = polar(rIn,  endDeg)
  const large = (endDeg - startDeg) > 180 ? 1 : 0
  return [
    `M ${f(s1[0])} ${f(s1[1])}`,
    `L ${f(s2[0])} ${f(s2[1])}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${f(e1[0])} ${f(e1[1])}`,
    `L ${f(e2[0])} ${f(e2[1])}`,
    `A ${rIn}  ${rIn}  0 ${large} 0 ${f(s1[0])} ${f(s1[1])}`,
    'Z',
  ].join(' ')
}

// Ângulo central do ODS n (ODS 17 no topo = -90°)
export function midAngle(n) {
  const idx = n === 17 ? 0 : n
  return -90 + idx * SPAN
}

// Centro geométrico do segmento
export function segmentCenter(n) {
  return polar((R_SEG_IN + R_SEG_OUT) / 2, midAngle(n))
}
