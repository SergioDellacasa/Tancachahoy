/*
  ALGORITMO DE TURNOS - Tancacha
  ─────────────────────────────
  Farmacias: Boyochi · Frizzo · De Mozzi II · García · De Mozzi I
  
  Semana A (par desde ref):  D=Boyochi  L=Boyochi  M=Frizzo  X=DeMozziII  J=García  V=DeMozziI  S=Boyochi
  Semana B (impar desde ref): D=Frizzo  L=Frizzo   M=DeMozziII X=García  J=DeMozziI V=Boyochi   S=Frizzo
  
  Referencia: Lunes 27 de abril de 2026 = Semana A
*/

const FARMACIAS = ['Boyochi', 'Frizzo', 'De Mozzi II', 'García', 'De Mozzi I']

// Índices por día (0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb)
const SEM_A = [0, 0, 1, 2, 3, 4, 0]
const SEM_B = [1, 1, 2, 3, 4, 0, 1]

const REF = new Date(2026, 3, 27) // Lunes 27 abril 2026
REF.setHours(0, 0, 0, 0)

function getLunes(fecha) {
  const d = new Date(fecha)
  d.setHours(0, 0, 0, 0)
  const dow = d.getDay()
  d.setDate(d.getDate() + (dow === 0 ? -6 : 1 - dow))
  return d
}

function getSemana(fecha) {
  const lunes = getLunes(fecha)
  const diffSem = Math.round((lunes - REF) / (7 * 24 * 60 * 60 * 1000))
  return diffSem % 2 === 0 ? 'A' : 'B'
}

export function getFarmacia(fecha = new Date()) {
  const dow = fecha.getDay()
  const sem = getSemana(fecha)
  const idx = sem === 'A' ? SEM_A[dow] : SEM_B[dow]
  return FARMACIAS[idx]
}

export function getProximosDias(desde = new Date(), dias = 6) {
  const DN = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const DIAS_FULL = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  
  return Array.from({ length: dias }, (_, i) => {
    const f = new Date(desde)
    f.setDate(desde.getDate() + i + 1)
    return {
      abrev: DN[f.getDay()],
      nombre: DIAS_FULL[f.getDay()],
      fecha: f,
      farmacia: getFarmacia(f),
    }
  })
}
