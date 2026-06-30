// App.jsx
// Componente raiz: gerencia estado global (mode, selections) e
// conecta ControlPanel ↔ RadarSVG ↔ exportPNG.

import React, { useState, useRef, useCallback } from 'react'
import ControlPanel from './components/ControlPanel'
import RadarSVG     from './components/RadarSVG'
import { useExportPNG } from './useExportPNG'
import styles from './App.module.css'

export default function App() {
  const [mode, setMode]           = useState('principal')
  const [selections, setSelections] = useState({})
  const svgRef = useRef(null)
  const exportPNG = useExportPNG(svgRef)

  const handleToggle = useCallback((id) => {
    setSelections(prev => {
      const next = { ...prev }
      if (mode === 'clear') {
        delete next[id]
      } else if (next[id] === mode) {
        delete next[id]   // clique duplo deseleciona
      } else {
        next[id] = mode
      }
      return next
    })
  }, [mode])

  const handleReset = useCallback(() => {
    setSelections({})
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Radar ODS</h1>
        <p>Selecione os ODS e classifique como <strong>Principal</strong> ou <strong>Transversal</strong></p>
      </header>

      <main className={styles.body}>
        <ControlPanel
          mode={mode}
          onModeChange={setMode}
          selections={selections}
          onToggle={handleToggle}
          onExport={exportPNG}
          onReset={handleReset}
        />

        <section className={styles.radarPanel}>
          <RadarSVG
            svgRef={svgRef}
            selections={selections}
          />
          <p className={styles.hint}>PNG exportado com fundo transparente, resolução 2×</p>
        </section>
      </main>
    </div>
  )
}
