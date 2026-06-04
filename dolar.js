export async function getDolar() {
  try {
    const res = await fetch('https://dolarapi.com/v1/dolares', {
      next: { revalidate: 86400 }, // revalidar una vez por día
    })
    if (!res.ok) throw new Error('Error dólar')
    const data = await res.json()

    const blue    = data.find(d => d.casa === 'blue')
    const oficial = data.find(d => d.casa === 'oficial')
    const mep     = data.find(d => d.casa === 'mep')
    const ccl     = data.find(d => d.casa === 'contadoconliqui')

    return {
      blue:    blue    ? { compra: blue.compra,    venta: blue.venta }    : null,
      oficial: oficial ? { compra: oficial.compra, venta: oficial.venta } : null,
      mep:     mep     ? { compra: mep.compra,     venta: mep.venta }     : null,
      ccl:     ccl     ? { compra: ccl.compra,     venta: ccl.venta }     : null,
      ok: true,
    }
  } catch {
    return { blue: null, oficial: null, mep: null, ccl: null, ok: false }
  }
}
