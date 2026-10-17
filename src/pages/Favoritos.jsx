import { useState } from 'react'
import { Link } from 'react-router-dom'
import { guardar, leer, nombreLibro } from '../api'
 
export default function Favoritos() {
  const [favs, setFavs] = useState(leer('favoritos'))
 
  const quitar = (id) => {
    const nuevos = favs.filter((f) => f.id !== id)
    guardar('favoritos', nuevos)
    setFavs(nuevos)
  }
 
  return (
    <section>
      <h2 className="titulo">❤️ Favoritos</h2>
      {favs.length === 0 && <p className="aviso">Aún no tienes favoritos. Abre un versículo y toca 🤍.</p>}
      <div className="lista">
        {favs.map((f) => (
          <div key={f.id} className="tarjeta fija">
            <Link to={`/versiculo/${f.libro}/${f.cap}/${f.num}`}>
              <strong className="ref">
                {nombreLibro(f.libro)} {f.cap}:{f.num}
              </strong>
              <p>{f.texto}</p>
            </Link>
            <button className="quitar" onClick={() => quitar(f.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </section>
  )
}
