/*
  Base de datos de efemérides.
  Clave: "DD-MM"
  Cada entrada tiene: argentina[] y mundo[]
  En producción esto puede venir de Supabase.
*/

const DB = {
  '3-6': {
    arg: [
      { y: 1770, t: 'Nacimiento del poeta Manuel José de Lavardén en Buenos Aires, considerado el primer poeta rioplatense.' },
      { y: 1865, t: 'Argentina, Brasil y Uruguay firman el Tratado de la Triple Alianza contra Paraguay, que daría inicio a la guerra más sangrienta de América del Sur.' },
      { y: 1987, t: 'Muere el escritor argentino Manuel Mujica Láinez en La Cumbre, Córdoba. Autor de Bomarzo y La casa.' },
    ],
    world: [
      { y: 1944, t: 'Día D: las fuerzas aliadas desembarcan en Normandía, Francia. La mayor operación anfibia de la historia y un punto de quiebre en la Segunda Guerra Mundial.' },
      { y: 1961, t: 'El astronauta soviético Yuri Gagarin regresa a la Tierra tras su histórico vuelo orbital, el primero de un ser humano en el espacio.' },
    ],
    dias: [
      { n: 'Día del Periodista (Argentina)', d: 'Conmemorado desde 1938 en honor a la publicación del primer periódico patrio, La Gazeta de Buenos Ayres, fundado por Mariano Moreno el 7 de junio de 1810.' },
    ],
  },
  // Agregar más fechas aquí...
}

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const MESES_ABR = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']

export function getEfemerides(fecha = new Date()) {
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1
  const key = `${dia}-${mes}`

  const data = DB[key] || {
    arg: [
      { y: 1816, t: 'Argentina proclama su independencia definitiva del Imperio español en el Congreso de Tucumán.' },
      { y: 1978, t: 'La selección argentina gana su primer Mundial de Fútbol en el estadio Monumental de Buenos Aires.' },
    ],
    world: [
      { y: 1969, t: 'El Apolo 11 lleva a los primeros seres humanos a la Luna. Neil Armstrong y Buzz Aldrin caminan sobre la superficie lunar.' },
    ],
    dias: [],
  }

  return {
    dia,
    mes: MESES[mes - 1],
    mesAbr: MESES_ABR[mes - 1],
    anio: fecha.getFullYear(),
    titulo: `${dia} de ${MESES[mes - 1]}`,
    argentina: data.arg,
    mundo: data.world,
    celebraciones: data.dias,
  }
}
