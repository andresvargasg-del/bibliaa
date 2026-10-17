import { useState } from 'react'
import { guardar, leer, nombreLibro } from '../api'
 
// Pestaña original: diario personal. Cada versículo guardado lleva una nota propia.
export default function Diario() {
  const [entradas, setEntradas] = useState(leer('diario'))
 
  const cambiarNota = (id, nota) => {
    const nuevas = entradas.map((e) => (e.id === id ? { ...e, nota } : e))
    setEntradas(nuevas)
    guardar('diario', nuevas)
  }
 
  const borrar = (id) => {
    const nuevas = entradas.filter((e) => e.id !== id)
    setEntradas(nuevas)
    guardar('diario', nuevas)
  }
 
  return (
    <section>
      <h2 className="titulo">📓 Mi diario</h2>
      <p className="subtitulo">Escribe lo que cada versículo significa para ti.</p>
      {entradas.length === 0 && <p className="aviso">Tu diario está vacío. Abre un versículo y toca “Guardar en mi diario”.</p>}
      <div className="lista">
        {entradas.map((e) => (
          <div key={e.id} className="tarjeta fija diario">
            <strong className="ref">
              {nombreLibro(e.libro)} {e.cap}:{e.num}
            </strong>
            <p>{e.texto}</p>
            <textarea
              rows="3"
              placeholder="Mi reflexión…"
              value={e.nota}
              onChange={(ev) => cambiarNota(e.id, ev.target.value)}
            />
            <button className="quitar" onClick={() => borrar(e.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </section>
  )
}
