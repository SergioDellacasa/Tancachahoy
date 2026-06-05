'use client'

import { useState } from 'react'
import styles from './Noticias.module.css'

const CAT_LABELS = {
  todo: 'Todo',
  municipio: 'Municipio',
  deportes: 'Deportes',
  social: 'Social',
  campo: 'Campo',
  servicios: 'Servicios',
}

const EMOJI_CAT = {
  municipio: '🏛', deportes: '⚽', campo: '🌾',
  social: '🎭', servicios: '⚡',
}

const NOTICIAS_INIT = [
  {
    id: 1, cat: 'municipio', featured: true,
    titulo: 'El municipio anuncia nuevas obras en el acceso principal al pueblo',
    excerpt: 'La Municipalidad de Tancacha confirmó el inicio de trabajos de repavimentación en la entrada principal. Las obras comenzarán la próxima semana y durarán aproximadamente 30 días.',
    img: '', fuente: 'Municipio', fecha: 'Hace 2 horas',
  },
  {
    id: 2, cat: 'deportes', featured: false,
    titulo: 'Huracán venció 2 a 1 y sigue puntero en la liga regional',
    excerpt: 'Una tarde de fútbol, pasión y localía. El Globo se impuso con goles de Martínez y Rodríguez.',
    img: '', fuente: 'Deportes', fecha: 'Ayer',
  },
  {
    id: 3, cat: 'campo', featured: false,
    titulo: 'Lluvias registradas: 42mm en la zona sur del partido esta semana',
    excerpt: 'La estación meteorológica local registró 42mm acumulados en los últimos 7 días, beneficiando los cultivos de soja.',
    img: '', fuente: 'Campo', fecha: 'Ayer',
  },
  {
    id: 4, cat: 'social', featured: false,
    titulo: 'La feria artesanal vuelve este fin de semana a la plaza central',
    excerpt: 'Más de 20 artesanos locales participarán del evento. Entrada libre. Sábado y domingo de 10 a 20hs.',
    img: '', fuente: 'Social', fecha: 'Hace 3 días',
  },
]

export default function Noticias() {
  const [noticias, setNoticias] = useState(NOTICIAS_INIT)
  const [filtro, setFiltro] = useState('todo')
  const [modal, setModal] = useState(false)

  const lista = filtro === 'todo' ? noticias : noticias.filter(n => n.cat === filtro)
  const featured = lista.find(n => n.featured) || lista[0]
  const resto = lista.filter(n => n !== featured)

  return (
    <section className={styles.wrap} id="noticias">
      <div className={styles.header}>
        <div>
          <h2 className={styles.titulo}>Lo que pasa<br />en el pueblo</h2>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.subtitle}>Tancacha · Córdoba</span>
          <button className={styles.addBtn} onClick={() => setModal(true)}>
            + Cargar con IA
          </button>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className={styles.cats}>
        {Object.entries(CAT_LABELS).map(([k, v]) => (
          <button
            key={k}
            className={`${styles.cat} ${filtro === k ? styles.catActive : ''}`}
            onClick={() => setFiltro(k)}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Grid editorial */}
      <div className={styles.grid}>
        {featured && (
          <div className={`${styles.card} ${styles.featured}`}>
            <div className={styles.cardImg}>
              {featured.img
                ? <img src={featured.img} alt={featured.titulo} />
                : <span className={styles.cardEmoji}>{EMOJI_CAT[featured.cat] || '📰'}</span>
              }
            </div>
            <div className={styles.cardBody}>
              <div className={styles.kicker}>
                <span className={styles.kickerLine} />
                {featured.fuente}
              </div>
              <h3 className={styles.cardTitle}>{featured.titulo}</h3>
              <p className={styles.cardExcerpt}>{featured.excerpt}</p>
              <div className={styles.cardMeta}>{featured.fecha}</div>
              <div className={styles.cardLeer}>Leer más →</div>
            </div>
          </div>
        )}

        {resto.map(n => (
          <div key={n.id} className={styles.card}>
            <div className={styles.cardImg} style={{ minHeight: '140px' }}>
              {n.img
                ? <img src={n.img} alt={n.titulo} />
                : <span className={styles.cardEmoji}>{EMOJI_CAT[n.cat] || '📰'}</span>
              }
            </div>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              {n.fuente}
            </div>
            <h3 className={styles.cardTitle}>{n.titulo}</h3>
            <div className={styles.cardMeta}>{n.fecha}</div>
            <div className={styles.cardLeer}>Leer más →</div>
          </div>
        ))}
      </div>

      {/* Modal de carga con IA */}
      {modal && (
        <ModalNoticias
          onClose={() => setModal(false)}
          onPublicar={(nueva) => {
            setNoticias(prev => [{ ...nueva, id: Date.now() }, ...prev])
            setModal(false)
          }}
        />
      )}
    </section>
  )
}

function ModalNoticias({ onClose, onPublicar }) {
  const [url, setUrl] = useState('')
  const [texto, setTexto] = useState('')
  const [titulo, setTitulo] = useState('')
  const [textoFinal, setTextoFinal] = useState('')
  const [cat, setCat] = useState('municipio')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)

  async function transformar() {
    if (!texto && !url) return
    setLoading(true)
    try {
      const prompt = `Sos el redactor de MiTancacha, el portal de Tancacha, Córdoba, Argentina.
Tu estilo: urbano, moderno, cercano, simple, directo. Como si le contaras la noticia a un vecino.
${url ? 'Enlace: ' + url : ''}
${texto ? 'Texto: ' + texto : ''}

Reescribí al estilo MiTancacha.
TITULAR: [máximo 10 palabras, impactante]
CUERPO: [2-3 párrafos cortos, directos]`

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const data = await res.json()
      const txt = data.content[0].text
      const tMatch = txt.match(/TITULAR:\s*(.+)/)
      const cMatch = txt.match(/CUERPO:\s*([\s\S]+)/)
      if (tMatch) setTitulo(tMatch[1].trim())
      if (cMatch) setTextoFinal(cMatch[1].trim())
    } catch {
      alert('Error al conectar con IA. Revisá tu conexión.')
    }
    setLoading(false)
  }

  function handleImg(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImg(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(12,9,5,.75)',
      z: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', zIndex: 200,
    }}>
      <div style={{ background: 'var(--cream)', maxWidth: 580, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ background: 'var(--ink)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--paper)' }}>
            Cargar noticia con IA
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '.78rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Pegá el enlace o el texto. La IA lo transforma al estilo MiTancacha.
          </p>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://enlace de la noticia..."
            style={{ width: '100%', border: '1px solid var(--line)', padding: '.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '.82rem', marginBottom: '1px', background: 'var(--paper)', outline: 'none' }} />
          <textarea value={texto} onChange={e => setTexto(e.target.value)} placeholder="O pegá el texto aquí..."
            style={{ width: '100%', border: '1px solid var(--line)', padding: '.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '.82rem', minHeight: 80, resize: 'vertical', background: 'var(--paper)', outline: 'none', marginBottom: '1px' }} />
          <button onClick={transformar} disabled={loading}
            style={{ width: '100%', background: 'var(--blue, #1A5276)', color: 'var(--paper)', border: 'none', padding: '.9rem', fontFamily: 'var(--sans)', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '1px', opacity: loading ? .5 : 1 }}>
            {loading ? 'Transformando...' : 'Transformar con IA →'}
          </button>
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Titular (editable)"
            style={{ width: '100%', border: '1px solid var(--line)', padding: '.75rem 1rem', fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 700, marginBottom: '1px', background: 'var(--paper)', outline: 'none' }} />
          <textarea value={textoFinal} onChange={e => setTextoFinal(e.target.value)} placeholder="Texto editado..."
            style={{ width: '100%', border: '1px solid var(--line)', padding: '.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '.82rem', minHeight: 90, resize: 'vertical', background: 'var(--paper)', outline: 'none', marginBottom: '1px' }} />
          <select value={cat} onChange={e => setCat(e.target.value)}
            style={{ width: '100%', border: '1px solid var(--line)', padding: '.75rem 1rem', fontFamily: 'var(--sans)', fontSize: '.82rem', marginBottom: '1px', background: 'var(--paper)', outline: 'none' }}>
            {Object.entries(CAT_LABELS).filter(([k]) => k !== 'todo').map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={handleImg} style={{ marginBottom: '1px', fontSize: '.78rem', width: '100%' }} />
          {img && <img src={img} alt="preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', marginBottom: '1px' }} />}
          <button onClick={() => onPublicar({ cat, titulo, excerpt: textoFinal.slice(0, 120), img, fuente: CAT_LABELS[cat], fecha: 'Recién publicado', featured: false })}
            style={{ width: '100%', background: 'var(--terra)', color: 'var(--paper)', border: 'none', padding: '1rem', fontFamily: 'var(--sans)', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Publicar noticia
          </button>
        </div>
      </div>
    </div>
  )
}
