const FERIADOS_2026 = [
  { d: 1,  m: 1,  n: 'Año Nuevo' },
  { d: 16, m: 2,  n: 'Carnaval' },
  { d: 17, m: 2,  n: 'Carnaval' },
  { d: 23, m: 3,  n: 'Feriado con fines turísticos' },
  { d: 24, m: 3,  n: 'Día Nacional de la Memoria por la Verdad y la Justicia' },
  { d: 2,  m: 4,  n: 'Día del Veterano y de los Caídos en Malvinas' },
  { d: 3,  m: 4,  n: 'Viernes Santo' },
  { d: 1,  m: 5,  n: 'Día del Trabajador' },
  { d: 25, m: 5,  n: 'Día de la Revolución de Mayo' },
  { d: 15, m: 6,  n: 'Paso a la Inmortalidad del Gral. Martín M. de Güemes' },
  { d: 20, m: 6,  n: 'Paso a la Inmortalidad del Gral. Manuel Belgrano' },
  { d: 9,  m: 7,  n: 'Día de la Independencia' },
  { d: 10, m: 7,  n: 'Feriado con fines turísticos' },
  { d: 17, m: 8,  n: 'Paso a la Inmortalidad del Gral. José de San Martín' },
  { d: 12, m: 10, n: 'Día del Respeto a la Diversidad Cultural' },
  { d: 23, m: 11, n: 'Día de la Soberanía Nacional' },
  { d: 7,  m: 12, n: 'Feriado con fines turísticos' },
  { d: 8,  m: 12, n: 'Inmaculada Concepción de María' },
  { d: 25, m: 12, n: 'Navidad' },
]

const MESES_ABREV = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
const MESES_FULL  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

export function getProximoFeriado(desde = new Date()) {
  const hoy = new Date(desde)
  hoy.setHours(0, 0, 0, 0)

  const anio = hoy.getFullYear()

  for (const f of FERIADOS_2026) {
    const fd = new Date(anio, f.m - 1, f.d)
    fd.setHours(0, 0, 0, 0)
    if (fd >= hoy) {
      const diff = Math.round((fd - hoy) / (1000 * 60 * 60 * 24))
      return {
        dia: f.d,
        mes: MESES_ABREV[f.m - 1],
        mesNombre: MESES_FULL[f.m - 1],
        nombre: f.n,
        fecha: fd,
        diff,
        countdown: diff === 0 ? '¡Es hoy!' : diff === 1 ? 'Mañana' : `Faltan ${diff} días`,
      }
    }
  }

  return null
}
