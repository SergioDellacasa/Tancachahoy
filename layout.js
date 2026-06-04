import './globals.css'

export const metadata = {
  title: 'MiTancacha — Tu pueblo, cada día',
  description: 'Noticias, comercios, farmacia de turno, quiniela, clima, deportes e historia de Tancacha, Córdoba. Actualizado todos los días.',
  keywords: 'Tancacha, Córdoba, Argentina, noticias, farmacia, quiniela, clima, deportes',
  authors: [{ name: 'MiTancacha' }],
  openGraph: {
    type: 'website',
    url: 'https://mitancacha.com.ar',
    title: 'MiTancacha — Tu pueblo, cada día',
    description: 'El portal de Tancacha, Córdoba. Noticias, comercios, farmacia de turno, quiniela y todo lo que pasa en el pueblo.',
    siteName: 'MiTancacha',
    images: [{ url: 'https://mitancacha.com.ar/og.jpg', width: 1200, height: 630 }],
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiTancacha — Tu pueblo, cada día',
    description: 'El portal de Tancacha, Córdoba.',
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
