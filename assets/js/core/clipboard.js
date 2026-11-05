/* core/clipboard.js — copiar al portapapeles al tocar cualquier [data-copy] */
(function (P) {
  'use strict';

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    /* Respaldo para http:// o navegadores viejos */
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  P.clipboard = {
    copy: copy,

    /* Un solo listener en el documento sirve para todos los botones, incluso los creados por JS. */
    init: function () {
      document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-copy]');
        if (!el) return;
        var text = el.getAttribute('data-copy');
        copy(text).then(
          function () { P.toast.show('Copiado: ' + text); },
          function () { P.toast.show('No se pudo copiar'); }
        );
      });
    }
  };
})(window.Pavo = window.Pavo || {});
