import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { guardar, idVerso, leer, nombreLibro, urlVersiculo } from '../api'
 
export default function Detalle() {
  const { libro, cap, num } = useParams()
  const navigate = useNavigate()
  const [verso, setVerso] = useState(null)
  const [traduccion, setTraduccion] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [, refrescar] = useState(0)
 
  const id = idVerso(libro, cap, num)
  const esFavorito = leer('favoritos').some((f) => f.id === id)
  const enDiario = leer('diario').some((f) => f.id === id)
 
  useEffect(() => {
    setVerso(null)
    setError('')
    fetch(urlVersiculo(libro, cap, num))
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.verses || d.verses.length === 0) throw new Error('sin datos')
        setVerso(d.verses[0])
        setTraduccion(d.translation_name)
      })
      .catch(() => setError('Ese versículo no existe.'))
  }, [libro, cap, num])
 
  const aviso = (t) => {
    setMensaje(t)
    setTimeout(() => setMensaje(''), 2000)
  }
 
  const datos = () => ({ id, libro, cap, num, texto: verso.text.trim() })
 
  const favorito = () => {
    const lista = leer('favoritos')
    if (esFavorito) guardar('favoritos', lista.filter((f) => f.id !== id))
    else guardar('favoritos', [...lista, datos()])
    refrescar((n) => n + 1)
  }
 
  const alDiario = () => {
    if (!enDiario) guardar('diario', [...leer('diario'), { ...datos(), nota: '' }])
    refrescar((n) => n + 1)
    aviso('Guardado en tu diario 📓')
  }
 
  const compartir = async () => {
    const texto = `"${verso.text.trim()}" — ${nombreLibro(libro)} ${cap}:${num}`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Biblia Viva', text: texto, url: window.location.href })
      } catch {
        /* cancelado */
      }
    } else {
      try {
        await navigator.clipboard.writeText(texto)
        aviso('Copiado para compartir ✅')
      } catch {
        aviso(texto)
      }
    }
  }
 
  if (error)
    return (
      <section>
        <button className="volver" onClick={() => navigate(-1)}>← Volver</button>
        <p className="aviso error">{error}</p>
      </section>
    )
  if (!verso) return <p className="aviso">Cargando…</p>
 
  return (
    <section className="detalle">
      <button className="volver" onClick={() => navigate(-1)}>← Volver</button>
      <p className="referencia">
        {nombreLibro(libro)} {cap}:{num}
      </p>
      <blockquote>{verso.text.trim()}</blockquote>
      <p className="traduccion">{traduccion}</p>
 
      <div className="acciones">
        <button className={esFavorito ? 'btn rojo' : 'btn'} onClick={favorito}>
          {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
        </button>
        <button className="btn dorado" onClick={alDiario}>📓 Guardar en mi diario</button>
        <button className="btn azul" onClick={compartir}>📤 Compartir</button>
      </div>
      {mensaje && <p className="aviso">{mensaje}</p>}
 
      <div className="siguiente">
        <button disabled={Number(num) <= 1} onClick={() => navigate(`/versiculo/${libro}/${cap}/${Number(num) - 1}`)}>
          ‹ Anterior
        </button>
        <button onClick={() => navigate(`/versiculo/${libro}/${cap}/${Number(num) + 1}`)}>Siguiente ›</button>
      </div>
    </section>
  )
}
