/* components/jump-nav.js — píldoras de colores que saltan a cada sección */
(function (P) {
  'use strict';

  var esc = P.text.esc;

  /* items: [{ id, icon, theme, text }] */
  P.jumpNav = {
    render: function (ul, items) {
      ul.innerHTML = items.map(function (it) {
        return '<li><a class="theme-' + esc(it.theme) + '" href="#' + esc(it.id) + '">' +
          '<span aria-hidden="true">' + it.icon + '</span>' + esc(it.text) + '</a></li>';
      }).join('');
    }
  };
})(window.Pavo = window.Pavo || {});
