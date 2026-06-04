# MiTancacha — Portal local de Tancacha, Córdoba

Portal web editorial para Tancacha. Noticias, clima, farmacia de turno,
quiniela, deportes, historia y directorio de comercios.

## Stack

- **Frontend**: Next.js 14 (App Router) + CSS Modules
- **Hosting**: Vercel (gratis)
- **Base de datos** (futuro): Supabase (gratis)
- **APIs**: Open-Meteo (clima), dolarapi.com (dólar), nolaborables.com.ar (feriados)

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Abrir en el browser
# http://localhost:3000
```

## Deploy en Vercel (gratis, 0 costo)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Seguir las instrucciones en pantalla
# La URL pública se genera automáticamente
```

## Variables de entorno (futuro)

Cuando se integre Supabase, crear `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key-de-supabase
NEWS_API_KEY=tu-key-de-newsapi
```

## Estructura del proyecto

```
mitancacha/
├── app/
│   ├── layout.js      ← HTML shell, fonts, metadata Open Graph
│   ├── page.js        ← Home: server component, fetches data
│   └── globals.css    ← Design tokens, tipografía, helpers
├── components/
│   ├── Topbar.js/css  ← Barra de datos en vivo
│   ├── Nav.js/css     ← Navegación sticky + mobile
│   ├── Hero.js/css    ← Hero cinematográfico
│   ├── Noticias.js    ← Grid editorial + modal de carga con IA
│   ├── Clima.js/css   ← Sección clima inmersiva
│   ├── Efemerides.js  ← Preview + sección completa
│   ├── Farmacia.js    ← Turno rotativo automático
│   ├── DatosRapidos   ← Quiniela + feriado
│   ├── Historia.js    ← Sección emocional de historia
│   ├── SectionRule.js ← Separador editorial
│   └── Footer.js      ← Footer con redes sociales
└── lib/
    ├── clima.js       ← Open-Meteo API
    ├── dolar.js       ← dolarapi.com
    ├── farmacia.js    ← Algoritmo de turnos rotativo
    ├── feriados.js    ← Feriados 2026
    ├── efemerides.js  ← Base de datos de efemérides
    └── quiniela.js    ← Resultados (manual por ahora)
```

## Cómo agregar una noticia

1. Entrar a la web
2. Ir a la sección "Noticias de Tancacha"
3. Hacer clic en "+ Cargar con IA"
4. Pegar el enlace o el texto de la noticia
5. Hacer clic en "Transformar con IA"
6. Editar si es necesario
7. Subir una foto (opcional)
8. Publicar

## Próximos pasos (Fase 2)

- [ ] Conectar Supabase para persistir noticias
- [ ] Dashboard de administrador
- [ ] Dashboard de comercios
- [ ] Sección de Ofertas y Deportes como componentes completos
- [ ] Quiniela via scraping automático
- [ ] Noticias nacionales via NewsAPI
- [ ] PWA (instalable en móvil)

---

**MiTancacha** · Tancacha, Córdoba, Argentina · Fundada el 15 de octubre de 1913
