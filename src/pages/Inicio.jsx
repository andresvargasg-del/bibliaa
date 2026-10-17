import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LIBROS, nombreLibro, urlCapitulo } from '../api'
 
export default function Inicio() {
  const [libro, setLibro] = useState('Daniel')
  const [cap, setCap] = useState(1)
  const [versos, setVersos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
 
  useEffect(() => {
    setCargando(true)
    setError('')
    fetch(urlCapitulo(libro, cap))
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.verses) throw new Error('sin datos')
        setVersos(d.verses)
      })
      .catch(() => {
        setVersos([])
        setError('No se encontró ese capítulo.')
      })
      .finally(() => setCargando(false))
  }, [libro, cap])
 
  const cambiarLibro = (id) => {
    setLibro(id)
    setCap(1)
    setBusqueda('')
  }
 
  const texto = busqueda.trim().toLowerCase()
  const lista = texto.length >= 3 ? versos.filter((v) => v.text.toLowerCase().includes(texto)) : versos
 
  return (
    <section>
      <h2 className="titulo">Libros</h2>
      <div className="filtros">
        {LIBROS.map((l) => (
          <button key={l.id} className={libro === l.id ? 'chip activo' : 'chip'} onClick={() => cambiarLibro(l.id)}>
            {l.nombre}
          </button>
        ))}
      </div>
 
      <div className="capitulos">
        <button disabled={cap <= 1} onClick={() => setCap(cap - 1)}>‹</button>
        <strong>
          {nombreLibro(libro)} {cap}
        </strong>
        <button onClick={() => setCap(cap + 1)}>›</button>
      </div>
 
      <input
        className="buscador"
        placeholder="🔎 Buscar palabra (mín. 3 letras, en inglés)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
 
      {cargando && <p className="aviso">Cargando versículos…</p>}
      {error && <p className="aviso error">{error}</p>}
      {!cargando && !error && lista.length === 0 && <p className="aviso">No hay resultados.</p>}
 
      <div className="lista">
        {lista.map((v) => (
          <Link key={v.verse} to={`/versiculo/${v.book_name}/${v.chapter}/${v.verse}`} className="tarjeta">
            <span className="num">{v.verse}</span>
            <p>{v.text.trim()}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
