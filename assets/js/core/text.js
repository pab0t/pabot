/* core/text.js — utilidades de texto */
(function (P) {
  'use strict';

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  P.text = {
    /* Escapa texto para meterlo en HTML. */
    esc: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) { return ESCAPES[c]; });
    },

    /* Minúsculas y sin tildes, para buscar sin importar acentos. */
    norm: function (s) {
      return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
  };
})(window.Pavo = window.Pavo || {});
