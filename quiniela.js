/*
  En producción: scraping de quinielasya.com.ar con Playwright/Puppeteer
  vía un cron job de Vercel que actualiza Supabase después de cada sorteo.
  
  Por ahora: datos de ejemplo actualizables manualmente.
*/

export const QUINIELA_PROVINCIAS = [
  'Ciudad de Buenos Aires',
  'Buenos Aires',
  'Córdoba',
  'Santa Fe',
  'Entre Ríos',
]

export const SORTEOS = ['Previa', 'Primera', 'Matutina', 'Vespertina', 'Nocturna']

// Esto se reemplazará con fetch desde Supabase
export async function getQuiniela() {
  return {
    fecha: new Date().toLocaleDateString('es-AR'),
    provincias: [
      {
        nombre: 'Ciudad de Buenos Aires',
        sorteos: [
          { nombre: 'Previa',      cabeza: '89', jugado: true },
          { nombre: 'Primera',     cabeza: '16', jugado: true },
          { nombre: 'Matutina',    cabeza: '65', jugado: true },
          { nombre: 'Vespertina',  cabeza: '37', jugado: true },
          { nombre: 'Nocturna',    cabeza: null, jugado: false },
        ],
      },
      {
        nombre: 'Buenos Aires',
        sorteos: [
          { nombre: 'Previa',      cabeza: '28', jugado: true },
          { nombre: 'Primera',     cabeza: '29', jugado: true },
          { nombre: 'Matutina',    cabeza: '48', jugado: true },
          { nombre: 'Vespertina',  cabeza: '61', jugado: true },
          { nombre: 'Nocturna',    cabeza: null, jugado: false },
        ],
      },
      {
        nombre: 'Córdoba',
        sorteos: [
          { nombre: 'Previa',      cabeza: '45', jugado: true },
          { nombre: 'Primera',     cabeza: '03', jugado: true },
          { nombre: 'Matutina',    cabeza: '53', jugado: true },
          { nombre: 'Vespertina',  cabeza: '79', jugado: true },
          { nombre: 'Nocturna',    cabeza: null, jugado: false },
        ],
      },
      {
        nombre: 'Santa Fe',
        sorteos: [
          { nombre: 'Previa',      cabeza: '96', jugado: true },
          { nombre: 'Primera',     cabeza: '45', jugado: true },
          { nombre: 'Matutina',    cabeza: '69', jugado: true },
          { nombre: 'Vespertina',  cabeza: '00', jugado: true },
          { nombre: 'Nocturna',    cabeza: null, jugado: false },
        ],
      },
      {
        nombre: 'Entre Ríos',
        sorteos: [
          { nombre: 'Previa',      cabeza: '17', jugado: true },
          { nombre: 'Primera',     cabeza: '78', jugado: true },
          { nombre: 'Matutina',    cabeza: '20', jugado: true },
          { nombre: 'Vespertina',  cabeza: '35', jugado: true },
          { nombre: 'Nocturna',    cabeza: null, jugado: false },
        ],
      },
    ],
    ok: true,
  }
}
