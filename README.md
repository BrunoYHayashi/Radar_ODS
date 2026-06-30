# Radar ODS — Gerador React

Componente interativo para gerar o Radar ODS com seleção de objetivos **Principais** e **Transversais**, exportação PNG com fundo transparente.

## Estrutura de arquivos

```
radar-ods-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Entry point React
    ├── App.jsx               # Raiz: estado global (mode, selections)
    ├── App.module.css
    ├── index.css             # Reset global
    ├── odsData.js            # Cores, rótulos e ícones Lucide de cada ODS
    ├── radarGeometry.js      # Matemática pura do SVG (polar, annularSector…)
    ├── useExportPNG.js       # Hook: SVG → Canvas → PNG transparente
    └── components/
        ├── ControlPanel.jsx      # Painel esquerdo: modo, chips, botões
        ├── ControlPanel.module.css
        ├── RadarSVG.jsx          # Monta o SVG completo
        ├── RadarDefs.jsx         # <defs>: gradientes e filtros
        ├── RadarSegment.jsx      # Um segmento ODS (path + número + ícone)
        ├── RadarInnerRings.jsx   # Anéis, pontos, arcos e círculo central
        └── RadarLegend.jsx       # Legenda inferior (Principais / Transversais)
```

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo dev
npm run dev

# 3. Build de produção
npm run build
```

Acesse `http://localhost:5173` no navegador.

## Como trocar ícones

Edite `src/odsData.js`:

```js
// Importe o novo ícone do Lucide
import { Flame } from 'lucide-react'

// Substitua o campo Icon na entrada desejada
{ id: 7, ..., Icon: Flame },
```

Para usar ícones SVG customizados (ex: oficiais da ONU), crie um wrapper:

```jsx
// src/icons/ODS7Icon.jsx
export default function ODS7Icon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="..." fill={color} />
    </svg>
  )
}
```

E importe em `odsData.js` como se fosse um componente Lucide.

## Exportação PNG

- Fundo **transparente** (sem rect branco)
- Resolução **2×** (1160 × ~1240 px) para impressão em revista
- Legenda com badges coloridos incluída automaticamente quando há seleções

## Notas sobre os ícones

Os ícones oficiais da ONU estão disponíveis em:
- https://www.un.org/sustainabledevelopment/news/communications-material/
- https://sdgs.un.org/resources

Para usá-los, baixe os SVGs e adapte como wrapper conforme o exemplo acima.
