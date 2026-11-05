/* pages/commands.js — arranque de index.html (lista de comandos) */
(function (P) {
  'use strict';

  var byId = P.dom.byId;
  var groups = P.data.groups;
  var commands = P.data.commands;

  P.toast.init();
  P.clipboard.init();

  /* Secciones con sus tarjetas */
  byId('groups').insertAdjacentHTML('beforeend',
    groups.map(function (g) { return P.commandCard.section(g, commands); }).join(''));

  /* Botones de salto */
  P.jumpNav.render(byId('jump'), groups.map(function (g) {
    return { id: g.id, icon: g.icon, theme: g.theme, text: g.title };
  }));

  /* Buscador y filtros */
  P.commandFilter.init({
    total: commands.length,
    input: byId('q'),
    chips: document.querySelectorAll('#perm-chips .chip'),
    count: byId('count'),
    empty: byId('empty'),
    reset: byId('reset')
  });

  /* Pavo: una pluma por grupo */
  P.fan.mount({
    svg: byId('fan'),
    items: groups.map(function (g) { return { id: g.id, label: g.title, icon: g.icon, theme: g.theme }; }),
    angles: [-52, -17, 17, 52],
    variant: 'wide',
    step: 90
  });
})(window.Pavo);
