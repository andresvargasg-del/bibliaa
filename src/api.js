// Endpoints de la API https://bible-api.com
const BASE = 'https://bible-api.com'
const OPC = '?single_chapter_book_matching=indifferent'
 
// Libros disponibles en el filtro (id = nombre en inglés que entiende la API)
export const LIBROS = [
  { id: 'Daniel', nombre: 'Daniel' },
  { id: 'John', nombre: 'Juan' },
  { id: 'Psalms', nombre: 'Salmos' },
  { id: 'Proverbs', nombre: 'Proverbios' },
  { id: 'Genesis', nombre: 'Génesis' },
  { id: 'Romans', nombre: 'Romanos' },
]
 
export const nombreLibro = (id) =>
  (LIBROS.find((l) => l.id.toLowerCase() === String(id).toLowerCase()) || { nombre: id }).nombre
 
// Lista: todos los versículos de un capítulo  ->  /daniel%201
export const urlCapitulo = (libro, cap) => `${BASE}/${encodeURIComponent(libro + ' ' + cap)}${OPC}`
 
// Detalle: un solo versículo  ->  /john%203:16
export const urlVersiculo = (libro, cap, num) =>
  `${BASE}/${encodeURIComponent(libro + ' ' + cap + ':' + num)}${OPC}`
 
export const idVerso = (libro, cap, num) => `${libro}-${cap}-${num}`
 
// Guardado local (favoritos y diario)
export const leer = (clave) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) || []
  } catch {
    return []
  }
}
export const guardar = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    /* sin almacenamiento */
  }
}
