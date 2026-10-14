# Empiric Labs

Sitio de **Empiric Labs** (by Empiric Photon): automatización documental B2B con Claude + Python.
React 19 · Vite · Tailwind CSS 3.

## Arranque rápido

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ en local
npm test           # tests unitarios (Node, sin dependencias extra)
```

Requiere Node 20.19+ (se recomienda 22, ver `.nvmrc`).

## Estructura

```
index.html                 Metadatos, SEO, datos estructurados y script de primer pintado
public/                    Archivos estáticos servidos en la raíz (/favicon.svg, /promo.mp4)
src/
  main.jsx                 Punto de entrada (monta <App />)
  App.jsx                  Componente principal: compone cabecera, páginas, footer y diálogos
  config.js                Correo de contacto, enlace de Gumroad, X y ruta del vídeo del héroe
  index.css                Estilos globales + directivas de Tailwind
  components/              Marcado en JSX (una pieza por región o página)
    pages/                 Home, HowItWorks, Kits, Documents, Playground, Roi, Blog
    HeroCard.jsx           Tarjeta del héroe con pestañas (Demo video | Live pipeline)
    PromoPlayer.jsx        Reproductor de vídeo (/promo.mp4)
    Wizard.jsx             Marcado del cuestionario de Custom Workflows
    DocTemplates.jsx       Monta el contenido de src/content como <template> inertes
  content/                 HTML editable: avisos legales, artículos y hojas A4 de ejemplo
  lib/
    roi-model.js           Modelo de la calculadora de ROI (función pura)
    wizard-brief.js        Opciones del cuestionario y generador del correo (función pura)
  legacy/                  Comportamiento interactivo en módulos ES sin framework
tests/                     roi, wizard-brief y coherencia de enlaces (contact)
```

### Cómo está organizado el código

El marcado vive en componentes React. El comportamiento interactivo (router por hash,
traducciones EN/ES/JA, espacio de documentación, calculadora de ROI, cuestionario,
playground y efectos de fondo) vive en `src/legacy/*.js` y se arranca una sola vez desde
`src/legacy/start.js` cuando React ha pintado. Esos componentes se renderizan una vez y no
tienen estado, de modo que los módulos pueden manejar el DOM que enriquecen.
`HeroCard` es la excepción: usa estado de React (pestañas y reproductor).

> Si editas un componente con el servidor de desarrollo abierto y ves un comportamiento
> raro, recarga la página: los módulos de `src/legacy` no se recargan en caliente.

## Contacto y enlaces comerciales

Todo sale de `src/config.js`:

| Constante | Valor | Dónde se usa |
| --- | --- | --- |
| `CONTACT_EMAIL` | `empiricphoton@gmail.com` | Enlaces `mailto:`, formulario de contacto, cuestionario de Custom Workflows, avisos legales, footer, barra lateral |
| `GUMROAD_URL` | `https://empiricphoton.gumroad.com/` | Botones "Get ClipScript AI™" / "Get Estate Dossier AI™", cabecera, footer, CTAs |
| `X_URL` | `https://x.com/Empiricphoton` | Redes |
| `PROMO_VIDEO_SRC` | `/promo.mp4` | Reproductor del héroe |

`npm test` incluye una prueba que falla si aparece cualquier otro correo, otro `mailto:` o un
enlace de Gumroad distinto en el proyecto.

El botón **Enquire about a custom workflow** no compra nada: abre el cuestionario y termina en
un `mailto:` a `CONTACT_EMAIL`.

## Vídeo del héroe

1. Copia tu vídeo en `public/promo.mp4` (se sirve en `/promo.mp4`).
2. Recomendado: MP4 con H.264 + AAC, relación 16:10 o 16:9, menos de 20 MB.
3. El reproductor muestra una portada con botón de reproducir, carga solo los metadatos y activa
   los controles al reproducir. Si el archivo no existe, muestra un aviso y un botón para ver el
   pipeline en directo.

Si publicas en un subdirectorio (GitHub Pages de proyecto, `usuario.github.io/repo/`), compila con
`VITE_BASE=/repo/ npm run build` y cambia `PROMO_VIDEO_SRC` a `'/repo/promo.mp4'`.

## Cuestionario de Custom Workflows

Cuatro pasos (proyecto, detalles, impacto, contacto) y una pantalla de revisión. El botón final
abre un `mailto:` a `CONTACT_EMAIL` con el asunto `Nueva Solicitud de Custom Workflow - <proyecto>`
y el cuerpo estructurado con todas las respuestas (en español, para el equipo). También se puede
copiar el resumen. Las respuestas se guardan en `localStorage` hasta que se envía el correo.
La lógica del correo está en `src/lib/wizard-brief.js` y tiene tests.

## Calculadora de ROI

`src/lib/roi-model.js` calcula, a partir de los valores introducidos:

- ingresos = visitas × tasa de conversión × ticket medio;
- mejora mensual = ingresos con la tasa optimizada − ingresos con la tasa actual (con rampa lineal);
- ahorro de tiempo = documentos al mes × horas manuales × 85 % × coste por hora;
- posición neta acumulada, ROI y punto de equilibrio (con extrapolación si queda fuera del período).

Es una proyección basada en tus propios supuestos, no una garantía de resultados.

## Despliegue

`.github/workflows/deploy.yml` compila y publica en GitHub Pages en cada push a `main`
(activa Pages con origen "GitHub Actions" en los ajustes del repositorio). Tras el primer
`npm install`, sube también `package-lock.json`.

## Idiomas

El sitio principal tiene traducciones EN/ES/JA (diccionario en `src/legacy/i18n.js`). La biblioteca
de documentos, el cuestionario y los textos de las muestras están en inglés.

## Iconos

El marcado estático usa `<i data-lucide="nombre">`; `src/legacy/lucide.js` incluye solo los iconos
necesarios (paquete `lucide` fijado en 0.263.1). Los componentes con estado usan `src/components/Icon.jsx`.
