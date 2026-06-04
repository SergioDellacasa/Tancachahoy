// Coordenadas de Tancacha, Córdoba
const LAT = -33.07
const LON = -63.98

export async function getClima() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m,apparent_temperature` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,precipitation_sum,sunrise,sunset` +
      `&timezone=America%2FArgentina%2FBuenos_Aires` +
      `&forecast_days=7`

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // revalidar cada hora
    })

    if (!res.ok) throw new Error('Error clima')
    const data = await res.json()

    const wDesc = (c) => {
      if (c === 0) return 'Despejado'
      if (c <= 3) return 'Parcialmente nublado'
      if (c <= 48) return 'Niebla'
      if (c <= 67) return 'Lluvia'
      if (c <= 77) return 'Nevada'
      return 'Tormenta'
    }

    const wIcon = (c) => {
      if (c === 0) return '☀️'
      if (c <= 3) return '⛅'
      if (c <= 48) return '🌫'
      if (c <= 67) return '🌧'
      if (c <= 77) return '🌨'
      return '⛈'
    }

    const lluvia7 = (data.daily.precipitation_sum || [])
      .slice(0, 7)
      .reduce((a, b) => a + (b || 0), 0)
      .toFixed(1)

    return {
      temp: Math.round(data.current.temperature_2m),
      sensacion: Math.round(data.current.apparent_temperature),
      desc: wDesc(data.current.weathercode),
      icon: wIcon(data.current.weathercode),
      viento: Math.round(data.current.windspeed_10m),
      humedad: Math.round(data.current.relative_humidity_2m),
      lluvia7,
      pronostico: data.daily.time.slice(1, 4).map((_, i) => ({
        maxima: Math.round(data.daily.temperature_2m_max[i + 1]),
        minima: Math.round(data.daily.temperature_2m_min[i + 1]),
        icon: wIcon(data.daily.weathercode[i + 1]),
        desc: wDesc(data.daily.weathercode[i + 1]),
        lluvia: data.daily.precipitation_probability_max[i + 1] || 0,
      })),
      ok: true,
    }
  } catch {
    return {
      temp: null, desc: 'Sin datos', icon: '—',
      viento: null, humedad: null, lluvia7: null,
      pronostico: [], ok: false,
    }
  }
}
