# Portfolio — Sergio Cajide Gómez

Portfolio personal en HTML, CSS y JavaScript sin dependencias ni proceso de compilación.
Publicado en GitHub Pages: https://sergiocajide04-lang.github.io/Portfolio-Sergio-Cajide_Gomez/

## Estructura

```
├── index.html                 → Página única con los 7 capítulos
├── style.css                  → Sistema de diseño (tokens en :root) y estilos
├── app.js                     → Interacciones (menú, tarjetas, visor, cinta, desplegables…)
├── i18n.js                    → Versión en inglés y selector ES/EN (el HTML está en español)
├── herramientas.html          → Redirige a index.html#herramientas
├── sobre-mi.html, experiencia.html, proyectos.html, contacto.html
│                              → Redirecciones de las URLs antiguas
├── assets/
│   ├── documents/
│   │   ├── CV_Sergio_Cajide_Gomez_ES.pdf / _EN.pdf   → CV por idioma (páginas del original)
│   │   ├── CV_Sergio_Cajide_Gomez_ES-EN.pdf          → CV original combinado (sin enlazar)
│   │   ├── TFG_Sergio_Cajide_Gomez.pdf               → Trabajo de Fin de Grado
│   │   └── certificados/                             → Diplomas originales en PDF
│   └── img/
│       ├── foto-sergio.webp / .jpg                   → Retrato optimizado
│       ├── cv-preview.webp                           → Miniatura del CV
│       └── certificados/                             → Vistas previas de los diplomas
├── img/                       → Logotipos (empresas, herramientas, entidades)
│   ├── tools/                 → Logotipos SVG de Pandas, R, Plotly y Java (Devicon, licencia MIT)
│   ├── certs/                 → Logotipos de IBM y Google extraídos de los diplomas originales
│   └── logo_fgp_transparente.png → Copia del emblema de la FGP sin el fondo negro exterior
├── _backup_pre-rediseno/      → Versión anterior completa y CV antiguo
└── _backup_original/          → Copia de seguridad previa
```

Las carpetas que empiezan por `_` no se publican en GitHub Pages (Jekyll las ignora).

## Ver en local

Desde la carpeta del proyecto:

```
python -m http.server 8000
```

y abre http://localhost:8000. También funciona abriendo `index.html` directamente,
aunque el portapapeles y algunas funciones del navegador requieren un servidor.

## Actualizar contenido

- **CV:** sustituye `CV_Sergio_Cajide_Gomez_ES.pdf` y `_EN.pdf` manteniendo los nombres;
  las rutas por idioma están en `i18n.js` (constante `CV`).
- **Textos:** edita el español en `index.html` y su traducción en `i18n.js` (la clave es el
  texto español exacto; los bloques con negritas usan `data-i18n`).
- **Diplomas:** guarda el PDF en `assets/documents/certificados/` y genera una vista previa
  (`.webp`) en `assets/img/certificados/`. La tarjeta lee la imagen, el PDF y el enlace
  de verificación de sus atributos `data-diploma-*`.
- **Herramientas:** la cinta animada (`#toolMarquee`) muestra las principales; el catálogo
  completo está en `#toolCatalog`, agrupado por área. Para añadir una, crea su `<li class="tool">`
  en el grupo adecuado (y en la cinta si es principal) y su traducción en `i18n.js`.
- **Colores, tipografía y espaciado:** variables en `:root`, al inicio de `style.css`.

## Publicar en GitHub Pages

Sube los cambios a la rama configurada en *Settings → Pages* (carpeta raíz). Todas las rutas
son relativas, así que funcionan dentro del subdirectorio del repositorio.
