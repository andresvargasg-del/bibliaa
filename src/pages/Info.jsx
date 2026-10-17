import { useEffect, useState } from 'react'
import { LIBROS, urlCapitulo } from '../api'
 
export default function Info() {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
 
  useEffect(() => {
    Promise.all(
      LIBROS.map((l) =>
        fetch(urlCapitulo(l.id, 1))
          .then((r) => r.json())
          .then((d) => {
            const palabras = d.verses.map((v) => v.text.trim().split(/\s+/).length)
            return {
              nombre: l.nombre,
              versiculos: d.verses.length,
              palabras: palabras.reduce((a, b) => a + b, 0),
              masLargo: Math.max(...palabras),
            }
          })
          .catch(() => null)
      )
    ).then((r) => {
      setDatos(r.filter(Boolean))
      setCargando(false)
    })
  }, [])
 
  const totalVersos = datos.reduce((a, d) => a + d.versiculos, 0)
  const totalPalabras = datos.reduce((a, d) => a + d.palabras, 0)
  const maxVersos = Math.max(1, ...datos.map((d) => d.versiculos))
 
  return (
    <section>
      <h2 className="titulo">📊 Información</h2>
      <p className="subtitulo">Estadísticas del capítulo 1 de cada libro, calculadas en vivo con la API.</p>
 
      {cargando ? (
        <p className="aviso">Calculando…</p>
      ) : (
        <>
          <div className="stats">
            <div><b>{datos.length}</b><span>Libros</span></div>
            <div><b>{totalVersos}</b><span>Versículos</span></div>
            <div><b>{totalPalabras}</b><span>Palabras</span></div>
            <div><b>{totalVersos ? Math.round(totalPalabras / totalVersos) : 0}</b><span>Palabras/verso</span></div>
          </div>
 
          <h3 className="sub">Versículos por libro</h3>
          {datos.map((d) => (
            <div key={d.nombre} className="barra">
              <span>{d.nombre}</span>
              <div><i style={{ width: `${(d.versiculos / maxVersos) * 100}%` }} /></div>
              <b>{d.versiculos}</b>
            </div>
          ))}
        </>
      )}
 
      <h3 className="sub">Endpoints que usa la app</h3>
      <div className="codigo">
        <p>Lista (capítulo):</p>
        <code>GET bible-api.com/daniel%201</code>
        <p>Detalle (versículo):</p>
        <code>GET bible-api.com/john%203:16</code>
        <p>Parámetro:</p>
        <code>?single_chapter_book_matching=indifferent</code>
      </div>
    </section>
  )
}
