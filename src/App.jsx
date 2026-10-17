import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Detalle from './pages/Detalle.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Diario from './pages/Diario.jsx'
import Info from './pages/Info.jsx'
import Usuario from './pages/Usuario.jsx'
 
const MENU = [
  ['/', '🏠', 'Inicio'],
  ['/favoritos', '❤️', 'Favoritos'],
  ['/diario', '📓', 'Diario'],
  ['/info', '📊', 'Info'],
  ['/usuario', '👤', 'Usuario'],
]
 
export default function App() {
  return (
    <BrowserRouter>
      <header className="cabecera">
        <span className="logo">📖</span>
        <div>
          <h1>Biblia Viva</h1>
          <p>Lee, guarda y comparte versículos</p>
        </div>
      </header>
 
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/versiculo/:libro/:cap/:num" element={<Detalle />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/info" element={<Info />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </main>
 
      <nav className="menu">
        {MENU.map(([ruta, icono, texto]) => (
          <NavLink key={ruta} to={ruta} end={ruta === '/'} className={({ isActive }) => (isActive ? 'activo' : '')}>
            <span>{icono}</span>
            {texto}
          </NavLink>
        ))}
      </nav>
    </BrowserRouter>
  )
}
