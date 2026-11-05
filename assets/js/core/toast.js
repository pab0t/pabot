/* core/toast.js — aviso flotante ("Copiado: $pavo") */
(function (P) {
  'use strict';

  var node = null;
  var timer = null;

  function ensure() {
    if (node) return node;
    node = document.createElement('div');
    node.id = 'toast';
    node.setAttribute('role', 'status');
    node.setAttribute('aria-live', 'polite');
    document.body.appendChild(node);
    return node;
  }

  P.toast = {
    init: ensure,

    show: function (msg) {
      var el = ensure();
      el.textContent = msg;
      el.classList.add('on');
      clearTimeout(timer);
      timer = setTimeout(function () { el.classList.remove('on'); }, 1400);
    }
  };
})(window.Pavo = window.Pavo || {});
