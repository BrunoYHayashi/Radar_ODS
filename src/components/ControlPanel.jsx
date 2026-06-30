// ControlPanel.jsx
// Painel de controle: modo de seleção, grid de chips dos ODS,
// botões de exportar e resetar, e legenda visual.

import React from 'react'
import { ODS_LIST } from '../odsData'
import styles from './ControlPanel.module.css'

export default function ControlPanel({ mode, onModeChange, selections, onToggle, onExport, onReset }) {
  return (
    <aside className={styles.panel}>

      {/* Modo de seleção */}
      <p className={styles.sectionLabel}>Modo de seleção</p>
      <div className={styles.modeRow}>
        <button
          className={`${styles.modeBtn} ${mode === 'principal' ? styles.activeP : ''}`}
          onClick={() => onModeChange('principal')}
        >
          <span className={styles.dot} style={{ background: mode === 'principal' ? '#fff' : '#c0392b' }} />
          Principal
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'transversal' ? styles.activeT : ''}`}
          onClick={() => onModeChange('transversal')}
        >
          <span className={styles.dot} style={{ background: mode === 'transversal' ? '#fff' : '#8e44ad' }} />
          Transversal
        </button>
        <button
          className={`${styles.modeBtn} ${styles.clearBtn} ${mode === 'clear' ? styles.activeC : ''}`}
          onClick={() => onModeChange('clear')}
        >
          ✕
        </button>
      </div>

      {/* Grid de ODS */}
      <p className={styles.sectionLabel}>ODS</p>
      <div className={styles.odsGrid}>
        {ODS_LIST.map(({ id, short, color }) => {
          const state = selections[id]
          return (
            <button
              key={id}
              className={`${styles.chip} ${state === 'principal' ? styles.chipP : ''} ${state === 'transversal' ? styles.chipT : ''}`}
              style={{
                '--ods-color': color,
                background:   state === 'principal'   ? color : '',
                borderColor:  state !== undefined      ? color : '',
                color:        state === 'transversal'  ? color : '',
              }}
              onClick={() => onToggle(id)}
              title={`ODS ${id}`}
            >
              <span className={styles.chipNum}
                style={{ color: state === 'principal' ? '#fff' : state === 'transversal' ? color : '' }}
              >
                {id}
              </span>
              <span className={styles.chipLabel}
                style={{ color: state === 'principal' ? '#fff' : state === 'transversal' ? color : '' }}
              >
                {short}
              </span>
            </button>
          )
        })}
      </div>

      {/* Ações */}
      <button className={styles.btnExport} onClick={onExport}>
        ⬇ Exportar PNG
      </button>
      <button className={styles.btnReset} onClick={onReset}>
        Resetar tudo
      </button>

      {/* Legenda visual */}
      <div className={styles.legendBox}>
        <div className={styles.legRow}>
          <span className={`${styles.legSwatch} ${styles.swatchP}`} />
          <span>Principal — cor sólida, ícone branco</span>
        </div>
        <div className={styles.legRow}>
          <span className={`${styles.legSwatch} ${styles.swatchT}`} />
          <span>Transversal — cor translúcida</span>
        </div>
        <div className={styles.legRow}>
          <span className={`${styles.legSwatch} ${styles.swatchN}`} />
          <span>Não selecionado</span>
        </div>
      </div>

    </aside>
  )
}
