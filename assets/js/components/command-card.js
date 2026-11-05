/* components/command-card.js — HTML de una tarjeta de comando y de una sección completa */
(function (P) {
  'use strict';

  var esc = P.text.esc;
  var norm = P.text.norm;

  function waitText(c) {
    var parts = [];
    if (c.cg) parts.push(c.cg + ' s en todo el canal');
    if (c.cu) parts.push(c.cu + ' s por persona');
    return parts.length ? 'Espera entre usos: ' + parts.join(' y ') + '.' : 'Sin espera entre usos.';
  }

  function card(c) {
    var perm = P.data.permissions[c.p];
    var h = '<article class="cmd" data-p="' + c.p + '" data-s="' +
      esc(norm(c.n + ' ' + c.a.join(' ') + ' ' + c.d)) + '">';

    h += '<header class="cmd-head">' +
      '<button class="syn" type="button" data-copy="$' + esc(c.n) + '" title="Toca para copiar">$' + esc(c.n) + '</button>' +
      '<span class="badge ' + perm.cls + '">' + (perm.lock ? '🔒 ' : '') + perm.label + '</span></header>';

    h += '<p class="what">' + esc(c.d) + '</p>';

    if (c.u) {
      h += '<p class="meta">' + c.u.map(function (u) { return '<span class="k">' + esc(u) + '</span>'; }).join('') + '</p>';
    }
    if (c.a.length) {
      h += '<p class="meta">También: ' + c.a.map(function (a) { return '$' + esc(a); }).join(', ') + '</p>';
    }
    h += '<p class="meta">' + waitText(c) + '</p>';

    if (c.home) h += '<p class="note">Solo funciona en el canal del owner.</p>';
    if (c.w) h += '<a class="more" href="pavowiki.html#' + esc(c.w) + '">Cómo se usa, en la pavowiki</a>';

    return h + '</article>';
  }

  function section(group, commands) {
    var list = commands.filter(function (c) { return c.g === group.id; });
    return '<section class="sec theme-' + esc(group.theme) + '" id="' + esc(group.id) + '" data-group="' + esc(group.id) + '"><div class="wrap">' +
      '<div class="sec-head"><span class="ico" aria-hidden="true">' + group.icon + '</span>' +
      '<h2>' + esc(group.title) + '</h2><small>' + list.length + '</small></div>' +
      '<p class="sec-intro">' + esc(group.intro) + '</p>' +
      '<div class="cards">' + list.map(card).join('') + '</div></div></section>';
  }

  P.commandCard = { card: card, section: section };
})(window.Pavo = window.Pavo || {});
