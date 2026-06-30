// odsData.js
// Icon removido — ícones são SVG nativos em RadarSegment.jsx
export const ODS_LIST = [
  { id: 1,  label: 'Erradicação da Pobreza',      short: 'Pobreza',        color: '#E5243B' },
  { id: 2,  label: 'Fome Zero',                   short: 'Fome Zero',      color: '#DDA63A' },
  { id: 3,  label: 'Saúde e Bem-Estar',           short: 'Saúde',          color: '#4C9F38' },
  { id: 4,  label: 'Educação de Qualidade',       short: 'Educação',       color: '#C5192D' },
  { id: 5,  label: 'Igualdade de Gênero',         short: 'Gênero',         color: '#FF3A21' },
  { id: 6,  label: 'Água Potável e Saneamento',   short: 'Água',           color: '#26BDE2' },
  { id: 7,  label: 'Energia Limpa e Acessível',   short: 'Energia',        color: '#FCC30B' },
  { id: 8,  label: 'Trabalho Decente',            short: 'Trabalho',       color: '#A21942' },
  { id: 9,  label: 'Indústria e Inovação',        short: 'Inovação',       color: '#FD6925' },
  { id: 10, label: 'Redução das Desigualdades',   short: 'Desigualdades',  color: '#DD1367' },
  { id: 11, label: 'Cidades Sustentáveis',        short: 'Cidades',        color: '#FD9D24' },
  { id: 12, label: 'Consumo Responsável',         short: 'Consumo',        color: '#BF8B2E' },
  { id: 13, label: 'Ação Climática',              short: 'Clima',          color: '#3F7E44' },
  { id: 14, label: 'Vida na Água',                short: 'Vida Aquática',  color: '#0A97D9' },
  { id: 15, label: 'Vida Terrestre',              short: 'Vida Terrestre', color: '#56C02B' },
  { id: 16, label: 'Paz, Justiça e Instituições', short: 'Paz',            color: '#00689D' },
  { id: 17, label: 'Parcerias e Meios de Impl.',  short: 'Parcerias',      color: '#19486A' },
]

export const ODS_BY_ID = Object.fromEntries(ODS_LIST.map(o => [o.id, o]))
