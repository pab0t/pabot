/* components/fan.js — el pavo con la cola abierta.
   Cada pluma es un enlace a una sección (#id) y se abre con una animación. */
(function (P) {
  'use strict';

  var svgEl = P.dom.svg;

  /* Forma de la pluma según cuántas haya: pocas = anchas, muchas = delgadas. */
  var VARIANTS = {
    wide: { a: 48, b: 58, band1: [24, 137], band2: [30, 191], radius: 21, font: 22 },
    slim: { a: 42, b: 50, band1: [22, 138], band2: [28, 192], radius: 20, font: 21 }
  };

  /* Cuerpo, patas, cabeza y monedas (no cambian entre páginas). */
  var BODY =
    '<g fill="none" stroke="#E58A22" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M262 440 L260 486 M260 486 L238 497 M260 486 L260 503 M260 486 L282 497"/>' +
      '<path d="M338 440 L340 486 M340 486 L318 497 M340 486 L340 503 M340 486 L362 497"/>' +
    '</g>' +
    '<ellipse cx="300" cy="392" rx="94" ry="80" fill="#8A4B24" stroke="#2B1A11" stroke-width="5"/>' +
    '<path d="M214 366 C188 404 204 452 248 456 C236 424 232 394 240 370 Z" fill="#6B3A1C" stroke="#2B1A11" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M386 366 C412 404 396 452 352 456 C364 424 368 394 360 370 Z" fill="#6B3A1C" stroke="#2B1A11" stroke-width="5" stroke-linejoin="round"/>' +
    '<g fill="none" stroke="#C9772F" stroke-width="5" stroke-linecap="round">' +
      '<path d="M262 392 q12 14 24 0 q12 14 24 0 q12 14 24 0"/>' +
      '<path d="M250 418 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0"/>' +
      '<path d="M262 444 q12 12 24 0 q12 12 24 0 q12 12 24 0"/>' +
    '</g>' +
    '<circle cx="300" cy="305" r="45" fill="#9CC9DC" stroke="#2B1A11" stroke-width="5"/>' +
    '<path d="M300 336 C281 341 281 374 300 380 C319 374 319 341 300 336 Z" fill="#E5493A" stroke="#2B1A11" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M285 312 Q300 305 315 312 L300 338 Z" fill="#F29E2E" stroke="#2B1A11" stroke-width="5" stroke-linejoin="round"/>' +
    '<circle cx="282" cy="296" r="9" fill="#fff" stroke="#2B1A11" stroke-width="4"/>' +
    '<circle cx="318" cy="296" r="9" fill="#fff" stroke="#2B1A11" stroke-width="4"/>' +
    '<circle cx="284" cy="298" r="4" fill="#2B1A11"/>' +
    '<circle cx="316" cy="298" r="4" fill="#2B1A11"/>' +
    '<path d="M262 282 q8 -8 18 -4 M338 282 q-8 -8 -18 -4" fill="none" stroke="#2B1A11" stroke-width="4" stroke-linecap="round"/>' +
    '<g stroke="#2B1A11" stroke-width="4">' +
      '<g transform="translate(88 486)">' +
        '<ellipse cx="0" cy="0" rx="36" ry="12" fill="#C98F1E"/>' +
        '<ellipse cx="0" cy="-9" rx="36" ry="12" fill="#F6B93B"/>' +
        '<ellipse cx="0" cy="-18" rx="36" ry="12" fill="#F6B93B"/>' +
        '<ellipse cx="0" cy="-18" rx="22" ry="6.5" fill="none" stroke-width="3"/>' +
      '</g>' +
      '<g transform="translate(520 490)">' +
        '<ellipse cx="0" cy="0" rx="30" ry="10" fill="#C98F1E"/>' +
        '<ellipse cx="0" cy="-8" rx="30" ry="10" fill="#F6B93B"/>' +
        '<ellipse cx="0" cy="-8" rx="18" ry="5.5" fill="none" stroke-width="3"/>' +
      '</g>' +
    '</g>';

  /* Orden de dibujo: las plumas de afuera primero, las del centro encima. [0,3,1,2] o [0,5,1,4,2,3] */
  function drawOrder(n) {
    var order = [];
    for (var lo = 0, hi = n - 1; lo <= hi; lo++, hi--) {
      order.push(lo);
      if (hi !== lo) order.push(hi);
    }
    return order;
  }

  function petalPath(v) {
    return 'M300 340 C' + (300 - v.a) + ' 300 ' + (300 - v.b) + ' 160 300 70 ' +
           'C' + (300 + v.b) + ' 160 ' + (300 + v.a) + ' 300 300 340 Z';
  }
  function band(cfg, y) {
    return 'M' + (300 - cfg[0]) + ' ' + y + ' Q300 ' + cfg[1] + ' ' + (300 + cfg[0]) + ' ' + y;
  }

  var FAINT = { stroke: '#2B1A11', 'stroke-opacity': '.28', 'stroke-linecap': 'round', fill: 'none' };
  function faint(extra) {
    var o = {};
    for (var k in FAINT) o[k] = FAINT[k];
    for (var e in extra) o[e] = extra[e];
    return o;
  }

  /* opts:
       svg      <svg> donde se dibuja
       items    [{ id, label, icon, theme }]  una por pluma
       angles   ángulo de cada pluma al abrirse
       variant  'wide' | 'slim'
       step     retraso entre plumas al abrirse (ms)               */
  function mount(opts) {
    var svg = opts.svg;
    var items = opts.items;
    var v = VARIANTS[opts.variant || 'wide'];
    var layer = svgEl('g', {}, svg);

    if (!P.dom.reduceMotion) svg.classList.add('pre');
    svg.style.setProperty('--step', (opts.step || 90) + 'ms');

    drawOrder(items.length).forEach(function (i) {
      var item = items[i];
      var link = svgEl('a', { href: '#' + item.id, 'aria-label': item.label }, layer);
      var rot = svgEl('g', { 'class': 'rot' }, link);
      rot.style.setProperty('--a', opts.angles[i] + 'deg');
      rot.style.setProperty('--i', String(i));
      var lift = svgEl('g', { 'class': 'lift' }, rot);

      svgEl('title', {}, lift).textContent = item.label;

      var petal = svgEl('path', { 'class': 'petal', d: petalPath(v),
        'stroke': '#2B1A11', 'stroke-width': '5', 'stroke-linejoin': 'round' }, lift);
      petal.style.fill = 'var(--' + item.theme + ')';

      svgEl('path', faint({ d: 'M300 326 L300 108', 'stroke-width': '4' }), lift);
      svgEl('path', faint({ d: band(v.band1, 152), 'stroke-width': '6' }), lift);
      svgEl('path', faint({ d: band(v.band2, 207), 'stroke-width': '6' }), lift);

      svgEl('circle', { cx: '300', cy: '250', r: String(v.radius), fill: '#FBEBC8', stroke: '#2B1A11', 'stroke-width': '4' }, lift);
      svgEl('text', {
        x: '300', y: '250', 'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': String(v.font), transform: 'rotate(' + (-opts.angles[i]) + ' 300 250)', 'aria-hidden': 'true'
      }, lift).textContent = item.icon;
    });

    svg.insertAdjacentHTML('beforeend', BODY);

    /* Dos frames para que el navegador pinte primero la cola cerrada y luego la abra. */
    if (!P.dom.reduceMotion) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { svg.classList.remove('pre'); });
      });
    }
  }

  P.fan = { mount: mount };
})(window.Pavo = window.Pavo || {});
