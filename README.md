# Pavowiki

Sitio estático con la lista de comandos del bot y la wiki de pavocoins.
Sin build, sin dependencias: HTML + CSS + JavaScript puro.

- **Comandos** → `index.html`
- **Pavowiki** → `pavowiki.html`

## Estructura

```
.
├── index.html                 Página de comandos
├── pavowiki.html              Wiki de pavocoins (contenido en HTML)
├── .nojekyll                  Evita que GitHub Pages procese el sitio con Jekyll
└── assets/
    ├── css/
    │   ├── base.css           Variables, reset, utilidades y temas de color (.theme-*)
    │   ├── layout.css         Barra de páginas, hero, secciones, footer
    │   ├── components.css     Tarjeta de comando, tablas, botones, píldoras, toast
    │   ├── fan.css            Estilos del pavo animado
    │   └── pages/
    │       ├── commands.css   Solo la página de comandos (buscador, filtros, CTAs)
    │       └── wiki.css       Solo la wiki (pasos, escalera, barras, tragamonedas)
    ├── js/
    │   ├── core/              Utilidades sin dependencias
    │   │   ├── dom.js         byId, crear SVG, detectar "menos movimiento"
    │   │   ├── text.js        escapar HTML y normalizar texto
    │   │   ├── toast.js       aviso flotante
    │   │   └── clipboard.js   copiar al tocar cualquier [data-copy]
    │   ├── components/        Piezas reutilizables
    │   │   ├── fan.js         El pavo con la cola abierta
    │   │   ├── jump-nav.js    Píldoras de salto a secciones
    │   │   ├── command-card.js    HTML de tarjetas y secciones de comandos
    │   │   ├── command-filter.js  Buscador + filtro por permiso
    │   │   └── slot-demo.js   Tragamonedas de prueba
    │   ├── data/              Contenido (lo que normalmente se edita)
    │   │   ├── groups.js      Grupos de comandos y permisos
    │   │   ├── commands.js    Lista de comandos
    │   │   └── wiki-sections.js   Secciones de la wiki (plumas del pavo)
    │   └── pages/             Arranque de cada página
    │       ├── commands.js
    │       └── wiki.js
    └── img/
        └── favicon.svg
```

Los scripts usan un único espacio de nombres (`window.Pavo`) y se cargan con
`defer` en orden, así que el sitio también funciona abriendo el HTML con doble
clic, sin servidor.

## Agregar un comando

Edita `assets/js/data/commands.js` y añade una línea en el grupo que corresponda:

```js
{ n: 'nombre', g: 'pavocoins', a: ['alias1', 'alias2'], d: 'Qué hace.', p: 'all', cg: 1, cu: 5, w: 'ganar' },
```

| Campo  | Significado                                              |
|--------|----------------------------------------------------------|
| `n`    | nombre sin `$`                                           |
| `g`    | id del grupo (`assets/js/data/groups.js`)                |
| `a`    | alias                                                    |
| `d`    | descripción                                              |
| `p`    | permiso: `all`, `mod` u `owner`                          |
| `cg`   | espera global en segundos                                |
| `cu`   | espera por usuario en segundos                           |
| `home` | `true` si solo funciona en el canal del owner            |
| `w`    | id de la sección de la pavowiki (opcional)               |
| `u`    | lista de usos (opcional)                                 |

## Agregar una sección a la wiki

1. Añade la `<section>` en `pavowiki.html` (con un `id` y una clase `theme-*`).
2. Añade su entrada en `assets/js/data/wiki-sections.js` con el mismo `id`.
   Aparece sola como botón de salto y como pluma del pavo.
   Si pasas de 6 secciones, ajusta `angles` en `assets/js/pages/wiki.js`.

## Publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta a la raíz del repositorio.
2. En **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En un minuto estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Probar en local

Basta con abrir `index.html` en el navegador. Si prefieres un servidor:

```bash
python3 -m http.server 8000
```
