/* pages/wiki.js — arranque de pavowiki.html */
(function (P) {
  'use strict';

  var byId = P.dom.byId;
  var sections = P.data.wikiSections;

  P.toast.init();
  P.clipboard.init();

  /* Botones de salto */
  P.jumpNav.render(byId('jump'), sections.map(function (s) {
    return { id: s.id, icon: s.icon, theme: s.theme, text: s.short };
  }));

  /* Pavo: una pluma por sección */
  P.fan.mount({
    svg: byId('fan'),
    items: sections,
    angles: [-68, -41, -14, 14, 41, 68],
    variant: 'slim',
    step: 80
  });

  /* Demo de la tragamonedas */
  P.slotDemo.init();
})(window.Pavo);
