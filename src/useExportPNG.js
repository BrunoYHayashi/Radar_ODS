// useExportPNG.js
export function useExportPNG(svgRef) {
  return function exportPNG() {
    const svg = svgRef.current
    if (!svg) {
      alert('SVG não encontrado')
      return
    }

    const w = svg.viewBox.baseVal.width  || svg.getBoundingClientRect().width
    const h = svg.viewBox.baseVal.height || svg.getBoundingClientRect().height
    const scale = 2

    // Clona e limpa filtros que o canvas não resolve
    const clone = svg.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width', w)
    clone.setAttribute('height', h)
    clone.querySelectorAll('[filter]').forEach(el => el.removeAttribute('filter'))
    clone.querySelectorAll('filter').forEach(f => f.remove())

    // Fundo branco inline
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    bg.setAttribute('width', w)
    bg.setAttribute('height', h)
    bg.setAttribute('fill', '#ffffff')
    clone.insertBefore(bg, clone.firstChild)

    // Serializa para string
    const svgString = new XMLSerializer().serializeToString(clone)
    console.log('[exportPNG] SVG serializado, tamanho:', svgString.length)
    console.log('[exportPNG] viewBox w/h:', w, h)

    // Converte para base64 — evita Blob URL bloqueado em dev local
    const b64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)))

    const canvas = document.createElement('canvas')
    canvas.width  = w * scale
    canvas.height = h * scale
    const ctx = canvas.getContext('2d')

    const img = new Image()

    img.onload = () => {
      console.log('[exportPNG] imagem carregada, desenhando canvas...')
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0, w, h)

      try {
        const dataURL = canvas.toDataURL('image/png')
        console.log('[exportPNG] dataURL gerado, tamanho:', dataURL.length)
        const link = document.createElement('a')
        link.download = 'radar-ods.png'
        link.href = dataURL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('[exportPNG] download disparado')
      } catch (err) {
        console.error('[exportPNG] erro no toDataURL:', err)
        alert('Erro ao gerar PNG: ' + err.message)
      }
    }

    img.onerror = (e) => {
      console.error('[exportPNG] falha ao carregar SVG como imagem:', e)
      alert('Falha ao carregar o SVG. Veja o console.')
    }

    img.src = b64
  }
}
