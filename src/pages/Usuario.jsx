import { useState } from 'react'
import { guardar, leer } from '../api'
 
export default function Usuario() {
  const [nombre, setNombre] = useState(localStorage.getItem('nombre') || '')
  const [, refrescar] = useState(0)
  const favs = leer('favoritos').length
  const notas = leer('diario').filter((d) => d.nota && d.nota.trim()).length
  const diario = leer('diario').length
 
  const cambiar = (v) => {
    setNombre(v)
    try {
      localStorage.setItem('nombre', v)
    } catch {
      /* sin almacenamiento */
    }
  }
 
  const borrarTodo = () => {
    guardar('favoritos', [])
    guardar('diario', [])
    refrescar((n) => n + 1)
  }
 
  return (
    <section className="usuario">
      <div className="avatar">{(nombre || '?').charAt(0).toUpperCase()}</div>
      <input className="buscador" placeholder="Tu nombre" value={nombre} onChange={(e) => cambiar(e.target.value)} />
      <h2 className="titulo">{nombre ? `Hola, ${nombre} 👋` : 'Mi perfil'}</h2>
      <div className="stats">
        <div><b>{favs}</b><span>Favoritos</span></div>
        <div><b>{diario}</b><span>En el diario</span></div>
        <div><b>{notas}</b><span>Reflexiones</span></div>
      </div>
      <button className="btn rojo" onClick={borrarTodo}>🗑️ Borrar mis datos</button>
    </section>
  )
}
